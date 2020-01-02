import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  items: Observable<any[]>;
  names = [];
  data$: any;
  constructor(db: AngularFirestore, private fns: AngularFireFunctions, public http: HttpClient) {
    /* this.items = db.collection('items').valueChanges();
    this.items.subscribe(data => {
      data.forEach(el => {
        this.names.push(el)
      });
    }) */
    // const callable = fns.httpsCallable('helloWorld');
    // this.data$ = callable({name: 'some-data'});
    // console.log(this.data$);
    this.http.get('https://us-central1-firefly-5af90.cloudfunctions.net/helloWorld').subscribe(data => {
      console.log(data);
      
    })
  }

}
