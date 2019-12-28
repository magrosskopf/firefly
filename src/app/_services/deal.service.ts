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

      const user = this.afAuth.auth.currentUser;
      const kategory = 'salesperson';

      this.getUserDeals(kategory, user.uid)
      .then((userDeals) => {
        this.afDB.collection('salesperson').doc(user.uid).update({
        adId: [...userDeals, docRef.id]
        })
        .then(() => {
          console.log('Salesperson successfully updated!');
        })
        .catch((error) => {
          console.error('Error writing salesperson document: ', error);
        });
      });

    })
    .catch((error) => {
        console.error('Error adding document: ', error);
    });
  }

  getUserDeals(kategory: string, userId: string) {
    const userRef = this.afDB.collection(kategory).doc(userId).ref;

    return userRef.get().then((userDoc) => {
      if (userDoc.exists) {
          console.log('Document data:', userDoc.data().adId);
          return userDoc.data().adId;
      } else {
          console.log('No such document!');
      }
    }).catch((error) => {
        console.log('Error getting document:', error);
    });
  }

  getDeals() {
    const user = this.afAuth.auth.currentUser;

    return this.afDB.collection('deals').ref.where('userId', '==', user.uid)
    .get()
    .then((querySnapshot) => {
      const dealsUser = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>' , doc.data());
        dealsUser.push(doc.data());
      });
      console.log(dealsUser);
      return dealsUser;
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
  }
}
