import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserInfoService } from './user-info.service';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Deal } from '../_interfaces/deal';
import { User } from 'firebase';
import { Seller } from '../_interfaces/seller';

@Injectable({
  providedIn: 'root'
})
export class ImguploaderService {

  uploadPercentage: Observable<number>;
  downloadURL: Observable<string>;
  user: User;
  sellerData: Seller;

  constructor(
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private userinfo: UserInfoService,
    private afDB: AngularFirestore) {
      this.user = this.afAuth.auth.currentUser;
      this.userinfo.getRoleFromFirestore(this.user.uid).subscribe(role => {
        if (role.role === 'salesperson') {
          this.userinfo.getSellerDataFromFirestore(this.user.uid).subscribe(sellerData => {
            this.sellerData = sellerData;
          });
        }
      });
   }

  uploadFile(event, path: string, name: string) {
    const file = event.target.files[0];
    const filePath = path + '/' + name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercentage = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(data => {
          if (path === 'profilimg') {
            this.userinfo.updateNameAndPhoto(this.user.displayName, data);
            this.userinfo.getRoleFromFirestore(this.user.uid).subscribe(role => {
              if (role.role === 'salesperson') {
                this.sellerData.imgUrl = data;
                this.userinfo.updateSellerDataFromFirestore(this.user.uid, this.sellerData);
              }
            });
          }
        });
      })
    )
    .subscribe(data => console.log(data));
  }
}
