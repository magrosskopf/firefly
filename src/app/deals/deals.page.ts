import { Component, OnInit } from '@angular/core';
import { DealService } from '../_services/deal.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {

  allDeals = [];

  constructor(public dealService: DealService) { }

  ngOnInit() {
    this.dealService.getAllDeals().then((deals) => {
      this.allDeals = deals;
      console.log(this.allDeals);
    });
  }

}
