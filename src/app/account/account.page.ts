import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserInfoService } from '../_services/user-info.service';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../_interfaces/personal-info';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user = this._authentication.afAuth.auth.currentUser;
  personalInfo: PersonalInfo;
  email: string;
  displayName: string;
  
  constructor(public _authentication: AuthenticationService, public _userInfo: UserInfoService) {
      this.personalInfo = {
        favStores: [''],
        discoveredStores: [''],
        history: ['']
      }
      this.email = '';
      this.displayName = '';
      if (false) { // TODO: Set to true when needed for testing
        this._userInfo.getPersonalDataFromFirestore('XAbffjv83Qca96mro0RXRYSlnys1'); // TODO: durch User.Uid ersetzen
        this._userInfo.userInfo.subscribe(data => {
        this.personalInfo = data;
        console.log(data);
      });
      }
  }

  ngOnInit() {
  }

  saveEmail(email) {
    if (this.email !== '') {
      this._userInfo.updateEmail(email);
      this.email = '';
    }
  }

  saveNameAndPhoto() {
    if (this.displayName !== '') {
      this._userInfo.updateNameAndPhoto(this.displayName, this.user.photoURL);
    }
  }


}
