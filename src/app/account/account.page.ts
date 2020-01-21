import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthenticationService
} from '../_services/authentication.service';
import {
  UserInfoService
} from '../_services/user-info.service';
import {
  PersonalInfo
} from '../_interfaces/personal-info';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user = this.authentication.afAuth.auth.currentUser;
  personalInfo: PersonalInfo;
  email: string;
  displayName: string;

  constructor(
    public authentication: AuthenticationService,
    public userInfo: UserInfoService,
    public notification: NotificationService
  ) {

    // this.notification.requestPermission();

    this.email = '';
    this.displayName = '';
    if (false) { // TODO: Set to true when needed for testing
      this.userInfo.getPersonalDataFromFirestore('XAbffjv83Qca96mro0RXRYSlnys1', 'customer'); // TODO: durch User.Uid ersetzen
      this.userInfo.userInfo.subscribe(data => {
        this.personalInfo = data;
        console.log(data);
      });
    }
  }

  ngOnInit() {}

  saveEmail(email) {
    if (this.email !== '') {
      this.userInfo.updateEmail(email);
      this.email = '';
    }
  }

  saveNameAndPhoto() {
    if (this.displayName !== '') {
      this.userInfo.updateNameAndPhoto(this.displayName, this.user.photoURL);
      this.displayName = '';
    }
  }



  sendNotification() {
    this.notification.enterFence();
  }
}
