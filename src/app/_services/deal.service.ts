import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Deal } from '../_interfaces/deal';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  constructor(public afAuth: AngularFireAuth, public afDB: AngularFirestore) { }

  addDeal(deal: Deal) {
    this.afDB.collection('deals').add({
      userId: deal.userId,
      title: deal.title,
      discription: deal.discription,
      active: deal.active,
      location: deal.location,
      price: deal.price,
      date: new Date().getTime()
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
        console.error('Error adding document: ', error);
    });
  }
}
