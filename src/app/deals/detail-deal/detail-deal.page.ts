import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DealService } from '../../_services/deal.service';
import { Deal } from '../../_interfaces/deal';

@Component({
  selector: 'app-detail-deal',
  templateUrl: './detail-deal.page.html',
  styleUrls: ['./detail-deal.page.scss'],
})
export class DetailDealPage implements OnInit {

  deal: Deal = {
    userId: '',
    title: '',
    description: '',
    active: true,
    location: '',
    price: 0
  };

  constructor(private router: Router, public dealService: DealService) {}

  ngOnInit() {
    const pathArray = this.router.url.split('/');
    const pathId = pathArray[pathArray.length - 1];

    this.dealService.getDeal(pathId).then((data) => {
      this.deal = data;
    });
  }

}
