import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  items: Observable<any[]>;
  names = [];
  constructor(db: AngularFirestore, private fns: AngularFireFunctions, public http: HttpClient) {
    /* this.items = db.collection('items').valueChanges();
    this.items.subscribe(data => {
      data.forEach(el => {
        this.names.push(el)
      });
    }) */
    
   
  }
}
