import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
      public afAuth: AngularFireAuth,
      public afDB: AngularFirestore
  ) {
  }

  getStoreData(pathId) {
      const shopId = this.afAuth.auth.shopId;
      this.afDB.collection('customer').doc(shopId).get({
        // getStoreData
      });
    }
}

