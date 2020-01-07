import { Component, OnInit } from '@angular/core';
import { Deal } from '../../_interfaces/deal';
import { DealService } from '../../_services/deal.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgForm } from '@angular/forms';

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
    price: 0
  };

  constructor(public dealService: DealService, public authentication: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const infos = form.value;

    this.deal.userId = this.authentication.getUserId();
    this.deal.title = infos.title;
    this.deal.description = infos.description;
    this.deal.price = infos.price;

    this.dealService.addDeal(this.deal);
  }

}
