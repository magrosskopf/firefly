import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  pwd: string;
  email: string;

  constructor(public afAuth: AngularFireAuth, public authentication: AuthenticationService, public router: Router) {
    this.pwd = '123456';
    this.email = 'magrosskopf@web.de';
  }

  ngOnInit() {
  }

  navigate() {
    this.authentication.login(this.email, this.pwd);
    setTimeout(() => {
      this.router.navigateByUrl('/tabs/tab1');
    }, 1000);
  }

}
