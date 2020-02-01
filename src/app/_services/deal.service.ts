import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Deal } from '../_interfaces/deal';
import { Seller } from '../_interfaces/seller';
import { Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';
import { ImguploaderService } from './imguploader.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  user = this.afAuth.auth.currentUser;

  constructor(
    public afAuth: AngularFireAuth,
    public afDB: AngularFirestore,
    public userService: UserInfoService,
    private imgupload: ImguploaderService
  ) { }

  addDealtoFirestore(deal: Deal) {
    console.log(deal);

    this.afDB.collection<Deal>('deals').add({
      uid: deal.uid,
      title: deal.title,
      description: deal.description,
      active: deal.active,
      location: deal.location,
      afterPrice: deal.afterPrice,
      beforePrice: deal.beforePrice,
      storeName: deal.storeName,
      imgUrl: deal.imgUrl
    })
    .then((docRef) => {

      this.afDB.collection('deals').doc(docRef.id).update({
        id: docRef.id
      });
      this.afDB.collection('salesperson').doc(this.user.uid).update({
        adId: firebase.firestore.FieldValue.arrayUnion(docRef.id)
      });
    });
  }

  deleteDealFromFirestore(dealId: string) {
    this.afDB.doc<Deal>('deals/' + dealId ).delete();
  }

  getAllDealsFromFirestore(): Observable<Deal[]> {
    return this.afDB.collection<Deal>('deals/').valueChanges();
  }

  getDealFromFirestore(dealId: string): Observable<Deal> {
    return this.afDB.doc<Deal>('deals/' + dealId ).valueChanges();
  }

  getUserDealsFromFirestore() {
    return this.afDB.collection('deals', ref => ref.where('uid', '==', this.user.uid)).valueChanges();
  }

  getDealsFromKategory(kategory: string, userId: string) {
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

  editDeal(dealId: string, deal: Deal) {
    const userId = this.afAuth.auth.currentUser.uid;
    const dealRef = this.afDB.collection('deals').doc(dealId).ref;

    dealRef.get().then((doc) => {
      if (doc.exists) {
          console.log('Document data:', doc.data());
          if (doc.data().userId === userId) {
            dealRef.update({
              title: deal.title,
              description: deal.description,
              afterPrice: deal.afterPrice,
              beforePrice: deal.beforePrice
            })
            .then(() => {
              console.log('Deal successfully updated!');
            })
            .catch((error) => {
              console.error('Error writing deal document: ', error);
            });
          }
      } else {
          console.log('No such document!');
      }
    }).catch((error) => {
        console.log('Error getting document:', error);
    });
  }
}
