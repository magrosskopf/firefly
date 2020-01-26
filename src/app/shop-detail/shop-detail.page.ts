import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../_services/user-info.service';
import { Seller } from '../_interfaces/seller';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.page.html',
  styleUrls: ['./shop-detail.page.scss'],
})
export class ShopDetailPage implements OnInit {

  seller: Seller;

  constructor(private router: Router,
              private userinfo: UserInfoService) {
    const pathArray = this.router.url.split('/');
    const pathId = pathArray[pathArray.length - 1];
    console.log(pathId);
    this.userinfo.getSellerDataFromFirestore(pathId).subscribe(data => {
      this.seller = data;
      console.log(data);
    });
   }

  ngOnInit() {
  }


}
