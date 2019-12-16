import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  pwd: string;

  constructor(public afAuth: AngularFireAuth) {
    this.email = "";
    this.pwd = "";
  }
  login(email,password) {
    this.afAuth.auth.signInWithEmailAndPassword(email,password).catch(error => console.log(error));
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  ngOnInit() {
  }

}
