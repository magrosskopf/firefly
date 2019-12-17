import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public afAuth: AngularFireAuth, public alertController: AlertController) { 

   }

   login(email,password) {
    this.afAuth.auth.signInWithEmailAndPassword(email,password).catch(error => {
      this.presentAlert();
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  resetPassword() {
    window.open('https://firefly-5af90.firebaseapp.com/__/auth/action');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login fehlgeschlagen',
      subHeader: 'Bitte erneut versuchen',
      message: 'Entweder war deine E-Mail in Plastik verpackt oder dein Passwort nicht vegan.',
      buttons: ['ERNEUT VERSUCHEN']
    });

    await alert.present();
  }
}
