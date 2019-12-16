import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  items: Observable<any[]>;
  names = [];
  constructor(db: AngularFirestore) {
    /* this.items = db.collection('items').valueChanges();
    this.items.subscribe(data => {
      data.forEach(el => {
        this.names.push(el)
      });
    }) */
  }

}
