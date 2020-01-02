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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        
      })
    };
    this.http.post('https://us-central1-firefly-5af90.cloudfunctions.net/enterFence', 
    {'reqToken': 'fzEIfe6NFC-hGSRzPqUB3l:APA91bFoVo-NGduxxL4aVCpF-tXT9cgiIVAVHvfKjvVtSmI7x8KbABe_fD6QH2l3Ci-W8wGx8V6S2tnyx90zQZ1RUzwSq17QR3iLxS9TZfr2JlovYA-222CmjXbJFnE6wT9afiWhnXxM'},
    httpOptions ).subscribe(data => {
      console.log(data);
      
    })
  }

}
