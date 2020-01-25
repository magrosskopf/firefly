import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../_services/user-info.service';
import { Seller } from '../../_interfaces/seller';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.page.html',
  styleUrls: ['./shop-detail.page.scss'],
})
export class ShopDetailPage implements OnInit {

  store: Seller = {
    adId: '',
    adress: '',
    buyingUsers24: [],
    categoryId: '',
    city: 'string',
    givenPoints: 0,
    storeName: 'Annas Laden',
    owner: 'Anna',
    zip: '',
    description: 'Unverpackt, regional und nachhaltig Das sind die Ziele von annas, einem kleinen Laden mit Café in der Mosbacher Altstadt.'
  };

  constructor(private router: Router,
              private userInfo: UserInfoService) {
  }

  ngOnInit() {
    const pathArray = this.router.url.split('/');
    const pathId = pathArray[pathArray.length - 1];
    console.log(pathId);
    this.userInfo.getSellerDataFromFirestore(pathId)
    .subscribe(data => {
      this.store = data;
      console.log(data);
    });
    // this.storeService.getStoreData(pathId);
  }
}
