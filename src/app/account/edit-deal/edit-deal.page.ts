import { Component, OnInit } from '@angular/core';
import { Deal } from '../../_interfaces/deal';
import { DealService } from '../../_services/deal.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from '../../_services/user-info.service';

@Component({
  selector: 'app-edit-deal',
  templateUrl: './edit-deal.page.html',
  styleUrls: ['./edit-deal.page.scss'],
})
export class EditDealPage implements OnInit {

  deal: Deal = {
    userId: '',
    title: '',
    description: '',
    active: true,
    location: '',
    afterPrice: 0,
    beforePrice: 0,
    storeName: ''
  };

  pathId: string;
  userId: string;

  constructor(
    private router: Router,
    public dealService: DealService,
    public authentication: AuthenticationService,
    public userService: UserInfoService
  ) {

    const pathArray = this.router.url.split('/');
    this.pathId = pathArray[pathArray.length - 1];
    this.userId = this.authentication.afAuth.auth.currentUser.uid;

    this.dealService.getDealFromFirestore(this.pathId)
    .subscribe(data => {
      this.deal = data;
    });

    this.userService.getSellerDataFromFirestore(this.userId).subscribe((data) => {
      this.deal.storeName = data.storeName;
    });
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const infos = form.value;

    this.deal.userId = this.userId;
    this.deal.title = infos.title;
    this.deal.description = infos.description;
    this.deal.afterPrice = infos.afterPrice;
    this.deal.beforePrice = infos.beforePrice;

    this.dealService.editDeal(this.pathId, this.deal);
  }

}
