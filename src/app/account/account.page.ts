import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  displayName: string;
  user = this._authentication.afAuth.auth.currentUser;

  constructor(public _authentication: AuthenticationService) {
    this._authentication.afAuth.user.subscribe(data => {
      this.displayName = data.displayName;
    });


    this.user.updateProfile({
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      console.log("Update Successful")
    }).catch(function(error) {
      console.log("Update failed")
    });
  }

  ngOnInit() {
  }

}
