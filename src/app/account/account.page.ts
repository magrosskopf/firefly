import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserInfoService } from '../_services/user-info.service';
import { PersonalInfo } from '../_interfaces/personal-info';
import { NotificationService } from '../_services/notification.service';
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
  seller = [];
  favStores = false;
  role = '';

  constructor(
    private authentication: AuthenticationService,
    private userService: UserInfoService,
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

    this.userService.getRoleFromFirestore(this.user.uid)
    .subscribe(data => {
      this.role = data.role;
    });

    this.email = '';
    this.displayName = '';

    this.userService.getPersonalDataFromFirestore(this.user.uid, 'customer')
    .subscribe(data => {
      this.personalInfo = data;
      this.seller = [];
      this.favStores = false;
      this.personalInfo.favStores.forEach(element => {
        this.userService.getSellerDataFromFirestore(element)
        .subscribe( sellerData => {
          this.seller.push(sellerData);
          this.favStores = true;
        });
      });
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

  usePoints() {
    const num: number = Math.floor(this.personalInfo.points / 10);
    
    this.personalInfo.points = this.personalInfo.points - (num * 10);
    this.userService.updatePersonalDataFromFirestore(this.afAuth.auth.currentUser.uid, this.personalInfo);
    this.userService.presentToast('Punkte wurden eingelöst');
  }
}
