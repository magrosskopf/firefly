import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserInfoService } from '../_services/user-info.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  displayName: string;
  user = this._authentication.afAuth.auth.currentUser;
  personalInfo = {}

  constructor(public _authentication: AuthenticationService, public _userInfo: UserInfoService) {
      this.displayName = this.user.displayName;
      this._userInfo.getPersonalDataFromFirestore('3JBIpV8YJPQa1vxiHvd8'); // TODO: durch User.Uid ersetzen
      this._userInfo.userInfo.subscribe(data => {
        this.personalInfo = data[0];
        console.log(this.personalInfo);
        
      })
      
  }

  ngOnInit() {
  }

  

}
