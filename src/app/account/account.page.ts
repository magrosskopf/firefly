import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserInfoService } from '../_services/user-info.service';
import { PersonalInfo } from '../_interfaces/personal-info';
import { NotificationService } from '../_services/notification.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImguploaderService } from '../_services/imguploader.service';
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
  favStores = [];
  sellerDeals = [];
  favLoaded = false;
  dealsLoaded = false;
  role = '';

  constructor(
    private authentication: AuthenticationService,
    private userService: UserInfoService,
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private notification: NotificationService,
    private dealService: DealService,
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

    this.userService.getRoleFromFirestore(this.user.uid)
      .subscribe(data => {
        this.role = data.role;
        console.log('Role', this.role);
      });

    this.userService.getPersonalDataFromFirestore(this.user.uid, 'customer')
      .subscribe( data => {
        this.personalInfo = data;
        this.favStores = [];
        this.favLoaded = false;
        this.personalInfo.favStores.forEach(element => {
          this.userService.getSellerDataFromFirestore(element)
          .subscribe( sellerData => {
            this.favStores.push(sellerData);
            this.favLoaded = true;
          });
        });
      });

    this.dealService.getUserDealsFromFirestore().subscribe( data => {
      this.sellerDeals = data;
      this.dealsLoaded = true;
    });
  }

  async ngOnInit() {
  }

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

  // getUserDeals() {
  //   const user = this.afAuth.auth.currentUser;

  //   this.afDB.collection('deals').ref.where('userId', '==', user.uid)
  //   .onSnapshot((querySnapshot) => {
  //     this.activeDeals = [];
  //     querySnapshot.forEach((doc) => {
  //       this.activeDeals.push(doc.data());
  //     });
  //   });
  // }

  sendNotification() {
    this.notification.enterFence();
  }
}
