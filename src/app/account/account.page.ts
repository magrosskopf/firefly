import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserInfoService } from '../_services/user-info.service';
import { PersonalInfo } from '../_interfaces/personal-info';
import { NotificationService } from '../_services/notification.service';
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
  role = '';

  constructor(
    public authentication: AuthenticationService,
    public userService: UserInfoService,
    public afAuth: AngularFireAuth,
    public afDB: AngularFirestore,
    public notification: NotificationService
  ) {
    this.personalInfo = {
      favStores: [''],
      discoveredStores: [''],
      history: [''],
      points: 0
    };

    this.userService.getRoleFromFirestore(this.user.uid)
    .subscribe(data => {
      this.role = data.role;
    });

    this.email = '';
    this.displayName = '';
    if (false) { // TODO: Set to true when needed for testing
      this.userService.getPersonalDataFromFirestore('XAbffjv83Qca96mro0RXRYSlnys1', 'customer'); // TODO: durch User.Uid ersetzen
      this.userService.userInfo.subscribe(data => {
      this.personalInfo = data;
      console.log(data);
    });
    }

    this.getUserDeals();

  }

  ngOnInit() {}

  saveEmail(email) {
    if (this.email !== '') {
      this.userService.updateEmail(email);
      this.email = '';
    }
  }

  saveNameAndPhoto() {
    if (this.displayName !== '') {
      this.userService.updateNameAndPhoto(this.displayName, this.user.photoURL);
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
