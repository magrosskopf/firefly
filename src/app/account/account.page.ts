import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserInfoService } from '../_services/user-info.service';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../_interfaces/personal-info';
import { ToastController } from '@ionic/angular';
import { DealService } from '../_services/deal.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

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

  constructor(
    public authentication: AuthenticationService,
    public userInfo: UserInfoService,
    public dealService: DealService,
    public afAuth: AngularFireAuth,
    public afDB: AngularFirestore
  ) {
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

    this.getUserDeals();
  }

  ngOnInit() {}

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

  getUserDeals() {
    const user = this.afAuth.auth.currentUser;

    this.afDB.collection('deals').ref.where('userId', '==', user.uid)
    .onSnapshot((querySnapshot) => {
      this.activeDeals = [];
      querySnapshot.forEach((doc) => {
        this.activeDeals.push(doc.data());
      });
    });
  }

}
