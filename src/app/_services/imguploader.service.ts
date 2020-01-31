import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserInfoService } from './user-info.service';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';

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
    private filePicker: IOSFilePicker) {
   }

  pick() {
    this.filePicker.pickFile()
      .then(uri => {
        this.uploadFile(uri)
      })
      .catch(err => console.log('Error', err));
  }

  uploadFile(file) {
    const filePath = 'profilimg/' + this.afAuth.auth.currentUser.uid;
    const task = this.storage.upload(file, filePath);
    const fileRef = this.storage.ref(filePath);
    this.uploadPercentage = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.userinfo.updateNameAndPhoto(this.afAuth.auth.currentUser.displayName, this.downloadURL)
      })
    )
  }



}
