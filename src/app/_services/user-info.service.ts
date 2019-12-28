import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../_interfaces/personal-info';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  user = this.authentication.afAuth.auth.currentUser;
  userInfo: Observable<PersonalInfo>;
  private itemDoc: AngularFirestoreDocument<any>;


  constructor(public authentication: AuthenticationService, public db: AngularFirestore, public toastController: ToastController) {

  }

  updateNameAndPhoto(name, url) {
    if (this.user) {
      this.user.updateProfile({
        displayName: name,
        photoURL: url
      }).then(() => {
        console.log('Update Successful');
        this.presentToast('Name wurde aktualisiert');
      }).catch(error => {
        console.log('Update failed');
        this.presentToast(error);

      });
    }
   }

  updateEmail(email) {
    this.user.updateEmail(email).then(success => {
      console.log('Hurray' + success);
      this.presentToast('Emailadresse wurde geändert!');
    }).catch(error => {
      console.log(error);
      this.presentToast(error);
    });
  }

  deleteUser() {
    this.user.delete().then(success => console.log(success))
    .catch(error => console.log(error));
  }

  getPersonalDataFromFirestore(uid: string) {
    // tslint:disable-next-line:max-line-length
    this.userInfo = this.db.doc<PersonalInfo>('customer/' + uid ).valueChanges(); //  TODO: Auskommentieren wenn gebraucht wird
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
