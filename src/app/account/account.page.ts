import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserInfoService } from '../_services/user-info.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  displayName: string;
  user = this._authentication.afAuth.auth.currentUser;

  constructor(public _authentication: AuthenticationService, public _userInfo: UserInfoService) {
      this.displayName = this.user.displayName;
      this._userInfo.getUserInfoFromFirestore();

  }

  ngOnInit() {
  }

}
