import { Component, OnInit } from '@angular/core';
import { DealService } from '../_services/deal.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../_services/authentication.service';
import { UserInfoService } from '../_services/user-info.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {

  user = this.authentication.afAuth.auth.currentUser;
  role = '';
  allDeals = [];
  allStores = [];
  dealsLoaded = false;
  storesLoaded = false;

  constructor(
    public afAuth: AngularFireAuth,
    public afDB: AngularFirestore,
    public authentication: AuthenticationService,
    public userService: UserInfoService,
    public dealService: DealService,
  ) {
    this.userService.getRoleFromFirestore(this.user.uid)
    .subscribe(data => {
      this.role = data.role;
    });

    this.dealService.getAllDealsFromFirestore()
    .subscribe(data => {
      this.allDeals = data;
      this.dealsLoaded = true;
    });

    this.userService.getAllSellerFromFirestore()
    .subscribe(data => {
      this.allStores = data;
      this.storesLoaded = true;
    });
  }

  ngOnInit() {
  }
}
