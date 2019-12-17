import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  user = this._authentication.afAuth.auth.currentUser;
  u: Observable<any>;
  uList: Observable<any>[];
  constructor(public _authentication: AuthenticationService, public db: AngularFirestore) { 

  }

  upadateUserInfo(name, url) {
    this.user.updateProfile({
      displayName: name,
      photoURL: url
    }).then(function() {
      console.log("Update Successful")
    }).catch(function(error) {
      console.log("Update failed")
    });
   }

  getUserInfoFromFirestore(){
    /* this.u = this.db.collection('customer').valueChanges(); //  TODO: Auskommentieren wenn gebraucht wird
    this.u.subscribe(data => {
      console.log(data);
      data.forEach(el => {
        this.uList.push(el)
      });
    })  */
  }
}
