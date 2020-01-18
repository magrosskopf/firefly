import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../_interfaces/personal-info';
import { map } from 'rxjs/operators'; 
import { ToastController } from '@ionic/angular';
import { Seller } from '../_interfaces/seller';


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {


  constructor(public _authentication: AuthenticationService, public db: AngularFirestore, public toastController: ToastController) { 

  }

  user = this._authentication.afAuth.auth.currentUser;
  userInfo: Observable<PersonalInfo>;
  sellerInfo: any;

  private itemDoc: AngularFirestoreDocument<any>;
  nfToken: string;

  updateNameAndPhoto(name, url) {
    if(this.user) {
      this.user.updateProfile({
        displayName: name,
        photoURL: url
      }).then(() => {
        console.log('Update Successful');
        this.presentToast("Name wurde aktualisiert");
      }).catch(error => {
        console.log('Update failed');
        this.presentToast(error);

      });
    }
   }

  updateEmail(email){
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
    .catch(error => console.log(error))
  }

  getPersonalDataFromFirestore(uid: string, type: string): Observable<PersonalInfo>{
    // tslint:disable-next-line:max-line-length
    console.log(uid, type);
    
    return this.db.doc<PersonalInfo>(type + '/' + uid ).valueChanges(); //  TODO: Auskommentieren wenn gebraucht wird
  }

  updatePersonalDataFromFirestore(uid: string, item: PersonalInfo) {
    this.db.doc<PersonalInfo>('customer/' + uid).update(item);
  }

  getSellerDataFromFirestore(uid: string): Observable<Seller>{
    // tslint:disable-next-line:max-line-length
   return this.db.doc<any>('salesperson/' + uid ).valueChanges();
  }

  updateSellerDataFromFirestore(uid: string, seller: Seller){
    // tslint:disable-next-line:max-line-length
   this.db.doc<any>('salesperson/' + uid ).update(seller);
  }

  updatePermissonTokenFirestore(token: string, uid: string) {
    const itemRef = this.db.doc('customer/' + uid);
    itemRef.update({ notificationsToken: token});
  }

  deletePermissonTokenFirestore(uid: string) {
    const itemRef = this.db.doc('customer/' + uid);
    itemRef.update({ notificationsToken: null});
  }

  getPermissonTokenFirestore(uid: string): any {
    const item = this.db.doc<any>('customer/' + uid);
    item.valueChanges().subscribe(data => {
       this.nfToken = data.notificationsToken;
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
