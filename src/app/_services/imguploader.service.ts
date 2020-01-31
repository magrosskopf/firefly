import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserInfoService } from './user-info.service';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImguploaderService {

  uploadPercentage: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private userinfo: UserInfoService,
    private filePicker: IOSFilePicker,
    private imagePicker: ImagePicker) {
   }

  pick() {
    // this.filePicker.pickFile()
    //   .then(uri => {
    //     this.uploadFile(uri)
    //   })
    //   .catch(err => console.log('Error', err));
  }

  uploadFile(event, path: string, name: string) {
    const file = event.target.files[0];
    const filePath = path + '/' + name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    console.log(file);
    // observe percentage changes
    this.uploadPercentage = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(data => {
          this.userinfo.updateNameAndPhoto(this.afAuth.auth.currentUser.displayName, data);
        });
      })
    )
    .subscribe(data => console.log(data));

    // task.snapshotChanges().pipe(
    //   finalize(() => {
    //     this.downloadURL = fileRef.getDownloadURL();
    //     this.userinfo.updateNameAndPhoto(this.afAuth.auth.currentUser.displayName, this.downloadURL);
    //   })
    // ).subscribe(data => { console.log(data);
    // })
  }
}
