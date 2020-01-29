import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../_interfaces/user';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: User;

  uid: string;

  constructor(
    public afAuth: AngularFireAuth,
    public afDB: AngularFirestore,
    public router: Router,
    public toastController: ToastController
  ) {
    this.user  = {
      uid: '',
      displayName: '',
      email: '',
      password: '',
      confirm: '',
      storeName: '',
      adress: '',
      zip: '',
      city: '',
      photoURL: '',
      lat: null,
      lng: null
    };
    this.setUser();
  }

  setUser() {
    this.afAuth.user.subscribe(data => {
      // this.user = data;
      this.uid = data.uid;
    });
  }

   login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error => {
      this.presentToast(error);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  resetPassword() {
    window.open('https://firefly-5af90.firebaseapp.com/__/auth/action');
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  getUserId() {
    return this.afAuth.auth.currentUser.uid;
  }

  // Registrierung

  register() {
    if (this.user.password !== this.user.confirm) {
      console.error('Passwörter stimmen nicht überein.');
    } else {
      this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).catch(error => console.log(error));
      setTimeout(() => {
        this.login(this.user.email, this.user.password);
        this.router.navigateByUrl('/tabs/map');
      }, 2000);
    }
  }

  setLocalUser(user: User) {

    console.log(user.displayName);
    
    this.user.displayName = user.displayName === undefined ? this.user.displayName : user.displayName;
    this.user.email = user.email === undefined ? this.user.email : user.email;
    this.user.password = user.password === undefined ? this.user.password : user.password;
    this.user.confirm = user.confirm === undefined ? this.user.confirm : user.confirm;
    this.user.storeName = user.storeName === undefined ? this.user.storeName : user.storeName;
    this.user.adress = user.adress === undefined ? this.user.adress : user.adress;
    this.user.zip = user.zip === undefined ? this.user.zip : user.zip;
    this.user.city = user.city === undefined ? this.user.city : user.city;
    this.user.lat = user.lat === undefined ? this.user.lat : user.lat;
    this.user.lng = user.lng === undefined ? this.user.lng : user.lng;
    console.log(user);
    console.log(this.user);
  }

  initUserData(kategory) {
    const user = this.afAuth.auth.currentUser;
    this.user.uid = this.user.uid === '' ? user.uid : null;

    if (kategory === 'customer' || kategory === 'salesperson') {

      user.updateProfile({
        displayName: this.user.displayName
      }).then(() => {
        console.log(user);
      }).catch((error) => {
        console.log('Update des Profiles nicht erfolgreich.');
      });

      if (kategory === 'customer') {

        this.afDB.collection('customer').doc(user.uid).set({
            discoveredStores: [''],
            favStores: [''],
            history: ['']
          })
          .then(() => {
            console.log('Document successfully written!');
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });

      } else if (kategory === 'salesperson') {

        this.afDB.collection('salesperson').doc(user.uid).set({
            storeName: this.user.storeName,
            adress: this.user.adress,
            zip: this.user.zip,
            city: this.user.city,
            owner: '',
            verified: false,
            categoryId: '',
            adId: [''],
            buyingUsers24: [''],
            walkbyUsers24: [''],
            givenPoints: 0,
            imgUrl: '',
            qrCode: '',
            toGoodToGoActive: [''],
            toGoodToGoHistory: [''],
            lat: this.user.lat,
            lng: this.user.lng,
            uid: this.afAuth.auth.currentUser.uid
          })
          .then(() => {
            console.log('Document successfully written!');
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });

      } else {
        console.log('Die Kategory hat nicht überein gestimmt.');
      }
    }
  }
}
