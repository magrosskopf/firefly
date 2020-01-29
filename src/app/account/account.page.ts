import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserInfoService } from '../_services/user-info.service';
import { PersonalInfo } from '../_interfaces/personal-info';
import { NotificationService } from '../_services/notification.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Seller } from '../_interfaces/seller';

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
  seller = [];

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

    this.email = '';
    this.displayName = '';

    this.userService.getPersonalDataFromFirestore(this.user.uid, 'customer')
    .subscribe(data => {
      this.personalInfo = data;
      this.personalInfo.favStores.forEach(element => {
        this.userService.getSellerDataFromFirestore(element)
        .subscribe( sellerData => {
          this.seller.push(sellerData);
        });
      });
      console.log('personalInfo', this.personalInfo);
      console.log('seller', this.seller);
    });

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
