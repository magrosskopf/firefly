import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserInfoService } from '../_services/user-info.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.page.html',
  styleUrls: ['./shop-detail.page.scss'],
})
export class ShopDetailPage implements OnInit {

  seller;

  constructor(private router: Router, private userinfo: UserInfoService) { }

  ngOnInit() {
    const pathArray = this.router.url.split('/');
    const pathId = pathArray[pathArray.length - 1];
    console.log(pathId);
    this.userinfo.getSellerDataFromFirestore(pathId).subscribe(data => {
      this.seller = data;
      console.log(data);
      
    })
    
  }


}
