import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class ImguploaderService {

  uploadPercentage: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage, private afAuth: AngularFireAuth, private userinfo: UserInfoService) {
   }

  uploadFile(file) {
    const filePath = 'profilimg/' + this.afAuth.auth.currentUser.uid
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
