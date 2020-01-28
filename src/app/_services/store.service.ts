import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '../_interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public afAuth: AngularFireAuth, public afDB: AngularFirestore) {}

  getAllStores() {
    return this.afDB.collection('salesperson').ref.get().then((querySnapshot) => {
      const stores = [];
      querySnapshot.forEach((doc) => {
        stores.push(doc.data());
      });
      return stores;
    });
  }

  getStore(storeId: string): Promise<any>  {
    const storeRef = this.afDB.collection('salesperson').doc(storeId).ref;

    return storeRef.get().then((doc) => {
      if (doc.exists) {
          console.log('Document data:', doc.data());
          return doc.data();
      } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
      }
    }).catch((error) => {
        console.log('Error getting document:', error);
    });
  }
}

