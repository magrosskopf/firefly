import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DealService } from '../../_services/deal.service';
import { Deal } from '../../_interfaces/deal';
import { AuthenticationService } from '../../_services/authentication.service';

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
    storeName: '',
    id: ''
  };

  user = this.authentication.afAuth.auth.currentUser;

  constructor(private router: Router, private dealService: DealService, private authentication: AuthenticationService) {

    const pathArray = this.router.url.split('/');
    const pathId = pathArray[pathArray.length - 1];

    this.dealService.getDealFromFirestore(pathId)
      .subscribe(data => {
        this.deal = data;
      });
  }

  ngOnInit() {
  }

  deleteDeal() {
    this.dealService.deleteDealFromFirestore(this.deal.id);
  }
}
