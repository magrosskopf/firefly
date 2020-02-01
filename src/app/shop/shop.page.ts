import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfoService } from '../_services/user-info.service';
import { Seller } from '../_interfaces/seller';
import { DealService } from '../_services/deal.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  store: Seller = {
    uid: '',
    adId: [],
    adress: '',
    buyingUsers24: [],
    categoryId: '',
    city: '',
    givenPoints: 0,
    storeName: '',
    owner: '',
    zip: '',
    description: ''
  };

  allDeals = [];
  dealsLoaded = false;

  favStore = false;
  storeId: string;
  role = '';
  user = this.afAuth.auth.currentUser;

  constructor(
    private router: Router,
    public userService: UserInfoService,
    public afAuth: AngularFireAuth,
    public dealService: DealService
  ) {
    const pathArray = this.router.url.split('/');
    const pathId = pathArray[pathArray.length - 1];

    this.userService.getSellerDataFromFirestore(pathId)
    .subscribe(data => {
      this.store = data;
      this.store.adId.forEach(element => {
        this.dealService.getDealFromFirestore(element)
        .subscribe(deal => {
          this.allDeals.push(deal);
          this.dealsLoaded = true;
        });
      });
    });

    this.userService.getRoleFromFirestore(this.user.uid)
      .subscribe(user => {
        this.role = user.role;
        if (this.role === 'customer') {
          this.userService.getPersonalDataFromFirestore(this.user.uid, 'customer')
            .subscribe(data => {
              data.favStores.forEach(element => {
                if (pathId === element) {
                  this.favStore = true;
                }
              });
            });
        }
      });
}

  ngOnInit() {
  }

  changeFavStore() {
    this.favStore = !this.favStore;
    this.userService.changePersonalFavStore(this.user.uid, this.store.uid, this.favStore);
  }

}
