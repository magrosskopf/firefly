import { Component, OnInit } from '@angular/core';
import { DealService } from '../_services/deal.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserInfoService } from '../_services/user-info.service';
import { Seller } from '../_interfaces/seller';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {

  allDeals = [];
  allStores = [];
  dealsLoaded = false;
  storesLoaded = false;

  constructor(
    public afAuth: AngularFireAuth,
    public afDB: AngularFirestore,
    public dealService: DealService,
    public userService: UserInfoService
  ) {

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
