import { Component, OnInit } from '@angular/core';
import { Deal } from '../../_interfaces/deal';
import { NgForm } from '@angular/forms';
import { DealService } from '../../_services/deal.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserInfoService } from '../../_services/user-info.service';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.page.html',
  styleUrls: ['./create-deal.page.scss'],
})
export class CreateDealPage implements OnInit {

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

  userId: string;

  constructor(public dealService: DealService, public authentication: AuthenticationService, public userService: UserInfoService) {

    this.userId = this.authentication.afAuth.auth.currentUser.uid;
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

    this.dealService.addDealtoFirestore(this.deal);
  }

}
