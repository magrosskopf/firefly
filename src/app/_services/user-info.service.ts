import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../_interfaces/personal-info';
import { ToastController } from '@ionic/angular';
import { Seller } from '../_interfaces/seller';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  user = this.authentication.afAuth.auth.currentUser;
  userInfo: Observable<PersonalInfo>;
  nfToken: string;

  constructor(public authentication: AuthenticationService,
              public afDB: AngularFirestore,
              public afAuth: AngularFireAuth,
              public toastController: ToastController) {
  }

  updateNameAndPhoto(name, url) {
      this.user = this.authentication.afAuth.auth.currentUser;

    if (this.user) {
      this.user.updateProfile({
        displayName: name,
        photoURL: url
      }).then(() => {
        console.log('Update Successful');
        this.presentToast('Erfolgreich aktualisiert');
      }).catch(error => {
        console.log('Update failed');
        this.presentToast(error);
      });
    } else {
      console.log('no user');
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

  getPersonalDataFromFirestore(uid: string, type: string): Observable<PersonalInfo> {
    return this.afDB.doc<PersonalInfo>(type + '/' + uid ).valueChanges();
  }

  changePersonalFavStore(uid: string, storeId: string, favStore: boolean) {
    const userRef = this.afDB.collection('customer').doc(uid);

    if (favStore) {
      userRef.update({
        favStores: firebase.firestore.FieldValue.arrayUnion(storeId)
      });
    } else {
      userRef.update({
        favStores: firebase.firestore.FieldValue.arrayRemove(storeId)
      });
    }
  }

  updatePersonalDataFromFirestore(uid: string, item: PersonalInfo) {
    this.afDB.doc<PersonalInfo>('customer/' + uid).update(item);
  }

  getSellerDataFromFirestore(uid: string): Observable<Seller> {
   return this.afDB.doc<any>('salesperson/' + uid ).valueChanges();
  }

  getAllSellerFromFirestore(): Observable<Seller[]> {
    return this.afDB.collection<Seller>('salesperson/').valueChanges();
  }

  updateSellerDataFromFirestore(uid: string, seller: Seller) {
    this.afDB.doc<any>('salesperson/' + uid ).update(seller);
  }

  updatePermissonTokenFirestore(token: string, uid: string) {
    const itemRef = this.afDB.doc('customer/' + uid);
    itemRef.update({ notificationsToken: token});
  }

  deletePermissonTokenFirestore(uid: string) {
    const itemRef = this.afDB.doc('customer/' + uid);
    itemRef.update({ notificationsToken: null});
  }

  getPermissonTokenFirestore(uid: string): any {
    const item = this.afDB.doc<any>('customer/' + uid);
    item.valueChanges().subscribe(data => {
       this.nfToken = data.notificationsToken;
    });
  }

  getRoleFromFirestore(uid: string) {
    return this.afDB.doc<any>('roles/' + uid).valueChanges();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
