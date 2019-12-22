import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public afAuth: AngularFireAuth, public toastController: ToastController) { 

   }

   login(email,password) {
    this.afAuth.auth.signInWithEmailAndPassword(email,password).catch(error => {
      this.presentToast(error)
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
}
