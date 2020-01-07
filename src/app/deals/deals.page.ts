import { Component, OnInit } from '@angular/core';
import { DealService } from '../_services/deal.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {

  allDeals = [];

  constructor(
    public dealService: DealService,
    public afAuth: AngularFireAuth,
    public afDB: AngularFirestore
  ) { }

  ngOnInit() {
    this.getUserDeals();
  }

  getUserDeals() {
    this.afDB.collection('deals').ref
    .onSnapshot((querySnapshot) => {
      this.allDeals = [];
      querySnapshot.forEach((doc) => {
        this.allDeals.push(doc.data());
      });
    });
  }

}
