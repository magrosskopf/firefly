import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  user = this._authentication.afAuth.auth.currentUser;
  userInfo: Observable<any>;

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

  getPersonalDataFromFirestore(uid: string){
    this.userInfo = this.db.collection('customer/' + uid + '/personalData').valueChanges(); //  TODO: Auskommentieren wenn gebraucht wird
  }
}
