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
    uid: '',
    title: '',
    description: '',
    active: true,
    location: '',
    afterPrice: 0,
    beforePrice: 0,
    storeName: ''
  };

  constructor(private router: Router, public dealService: DealService) {

    const pathArray = this.router.url.split('/');
    const pathId = pathArray[pathArray.length - 1];

    this.dealService.getDealFromFirestore(pathId)
    .subscribe((data) => {
      this.deal = data;
    });

  }

  ngOnInit() {
  }

}
