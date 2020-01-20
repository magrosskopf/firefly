import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../_services/user-info.service';
import { StoreService } from '../_services/store.service';
import { Store } from '../_interfaces/store';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.page.html',
  styleUrls: ['./shop-detail.page.scss'],
})
export class ShopDetailPage implements OnInit {

  store: Store = {
    title: '',
    description: '',
    address: '',
    zip: '',
    city: ''
  };

  constructor(private router: Router,
              private userinfo: UserInfoService,
              private storeService: StoreService) {
  }

  ngOnInit() {
    const pathArray = this.router.url.split('/');
    const pathId = pathArray[pathArray.length - 1];
    console.log(pathId);
    this.userinfo.getSellerDataFromFirestore(pathId)
    .subscribe(data => {
      this.store = data;
      console.log(data);
    });
    this.storeService.getStoreData(pathId);
  }
}
