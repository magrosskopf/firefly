import { Component, OnInit } from '@angular/core';
import { Deal } from '../../_interfaces/deal';
import { NgForm } from '@angular/forms';
import { DealService } from '../../_services/deal.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.page.html',
  styleUrls: ['./create-deal.page.scss'],
})
export class CreateDealPage implements OnInit {

  deal: Deal = {
    userId: '',
    title: '',
    discription: '',
    active: true,
    location: '',
    price: 0
  };

  constructor(public dealService: DealService, public authentication: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const infos = form.value;

    this.deal.userId = this.authentication.getUserId();
    this.deal.title = infos.title;
    this.deal.discription = infos.discription;
    this.deal.price = infos.price;

    this.dealService.addDeal(this.deal);
  }

}
