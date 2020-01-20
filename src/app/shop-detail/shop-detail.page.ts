import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.page.html',
  styleUrls: ['./shop-detail.page.scss'],
})
export class ShopDetailPage implements OnInit {

  constructor(private route: ActivatedRouteSnapshot) { }

  ngOnInit() {
    let id = this.route.paramMap.get('id');
    console.log(id);
  }


}
