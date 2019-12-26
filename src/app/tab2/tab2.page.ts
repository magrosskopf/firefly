import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  email: string;
  pwd: string;

  constructor(public afAuth: AngularFireAuth) {
    this.email = '';
    this.pwd = '';
  }
  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error => console.log(error));
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
