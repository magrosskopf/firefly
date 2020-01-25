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
      description: deal.description,
      active: deal.active,
      location: deal.location,
      price: deal.price,
      date: new Date().getTime()
    })
    .then((docRef) => {

      console.log('Document written with ID: ', docRef.id);

      this.afDB.collection('deals').doc(docRef.id).update({
        id: docRef.id
      }).then(() => {
        console.log('ID successfully updated!');
      });

      const user = this.afAuth.auth.currentUser;
      const kategory = 'salesperson';

      this.getDealsFromKategory(kategory, user.uid)
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

  getDeal(dealId: string): Promise<any> {

    const dealRef = this.afDB.collection('deals').doc(dealId).ref;

    return dealRef.get().then((doc) => {
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

  getUserDeals() {
    const user = this.afAuth.auth.currentUser;
    const deals = [];

    this.afDB.collection('deals').ref.where('userId', '==', user.uid)
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          deals.push(doc.data());
      });
      console.log('UserDeals', deals);
      return deals;
    });

    return deals;

    // return this.afDB.collection('deals').ref.where('userId', '==', user.uid)
    // .get()
    // .then((querySnapshot) => {
    //   const dealsUser = [];
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, '=>' , doc.data());
    //     dealsUser.push(doc.data());
    //   });
    //   return dealsUser;
    // })
    // .catch((error) => {
    //   console.log('Error getting documents: ', error);
    // });
  }

  getAllDeals(): Promise<any> {
    return this.afDB.collection('deals').ref.get().then((querySnapshot) => {
      const deals = [];
      querySnapshot.forEach((doc) => {
        deals.push(doc.data());
      });
      return deals;
    });
  }

  deleteDeal(dealId) {
    const userId = this.afAuth.auth.currentUser.uid;
    const dealRef = this.afDB.collection('deals').doc(dealId).ref;

    dealRef.get().then((doc) => {
      if (doc.exists) {
          console.log('Document data:', doc.data());
          if (doc.data().userId === userId) {
            dealRef.delete().then(() => {
              console.log('Document successfully deleted!');
            }).catch((error) => {
                console.error('Error removing document: ', error);
            });
          }
      } else {
          // doc.data() will be undefined in this case
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
              price: deal.price
            })
            .then(() => {
              console.log('Deal successfully updated!');
            })
            .catch((error) => {
              console.error('Error writing deal document: ', error);
            });
          }
      } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
      }
    }).catch((error) => {
        console.log('Error getting document:', error);
    });
  }
}
