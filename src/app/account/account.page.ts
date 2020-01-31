import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserInfoService } from '../_services/user-info.service';
import { PersonalInfo } from '../_interfaces/personal-info';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { NotificationService } from '../_services/notification.service';
import { DealService } from '../_services/deal.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImguploaderService } from '../_services/imguploader.service';

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
    private authentication: AuthenticationService,
    private userInfo: UserInfoService,
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private notification: NotificationService,
    private imguploader: ImguploaderService
  ) {
    this.personalInfo = {
      favStores: [''],
      discoveredStores: [''],
      history: [''],
      points: 0
    };

    this.email = '';
    this.displayName = '';
    if (false) { // TODO: Set to true when needed for testing
      this.userInfo.getPersonalDataFromFirestore('XAbffjv83Qca96mro0RXRYSlnys1', 'customer'); // TODO: durch User.Uid ersetzen
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

  uploadFile() {
    this.imguploader.pick();
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


  sendNotification() {
    this.notification.enterFence();
  }
}
