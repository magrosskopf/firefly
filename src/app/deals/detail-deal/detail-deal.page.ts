import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DealService } from '../../_services/deal.service';
import { Deal } from '../../_interfaces/deal';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-deal',
  templateUrl: './detail-deal.page.html',
  styleUrls: ['./detail-deal.page.scss'],
})
export class DetailDealPage implements OnInit {

  deal;

  constructor(private router: Router, public dealService: DealService) {
    this.deal = {
      title: '',
      price: 0,
      description: ''
    };
  }

  ngOnInit() {
    const pathArray = this.router.url.split('/');
    const pathId = pathArray[pathArray.length - 1];

    console.log('pathId: ' + pathId);

    this.dealService.getDeal(pathId).then((data) => {
      this.deal = data;
      console.log(this.deal);
    });
  }

}
