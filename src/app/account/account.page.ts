import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserInfoService } from '../_services/user-info.service';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../_interfaces/personal-info';
import { ToastController } from '@ionic/angular';
import { DealService } from '../_services/deal.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user = this.authentication.afAuth.auth.currentUser;
  personalInfo: PersonalInfo;
  email: string;
  displayName: string;
  activeDeals = [];

  constructor(public authentication: AuthenticationService, public userInfo: UserInfoService, public dealService: DealService) {
    this.personalInfo = {
      favStores: [''],
      discoveredStores: [''],
      history: ['']
    };

    this.email = '';
    this.displayName = '';
    if (false) { // TODO: Set to true when needed for testing
      this.userInfo.getPersonalDataFromFirestore('XAbffjv83Qca96mro0RXRYSlnys1'); // TODO: durch User.Uid ersetzen
      this.userInfo.userInfo.subscribe(data => {
      this.personalInfo = data;
      console.log(data);
    });
    }
  }

  ngOnInit() {
    this.dealService.getUserDeals().then((deals) => {
      this.activeDeals = deals;
      console.log(this.activeDeals);
    });
  }

  saveEmail(email) {
    if (this.email !== '') {
      this.userInfo.updateEmail(email);
      this.email = '';
    }
  }

  saveNameAndPhoto() {
    if (this.displayName !== '') {
      this.userInfo.updateNameAndPhoto(this.displayName, this.user.photoURL);
      this.displayName = '';
    }
  }

}
