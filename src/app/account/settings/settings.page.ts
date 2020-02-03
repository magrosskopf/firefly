import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { ImguploaderService } from 'src/app/_services/imguploader.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfoService } from 'src/app/_services/user-info.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  role;
  user = this.authentication.afAuth.auth.currentUser;
  constructor(public authentication: AuthenticationService,
              private imguploader: ImguploaderService,
              public afAuth: AngularFireAuth,
              public userService: UserInfoService) {
                this.userService.getRoleFromFirestore(this.user.uid)
                  .subscribe(data => {
                  this.role = data.role;
                  });
              }

  ngOnInit() {
  }

  uploadFile(event, path, name) {
    this.imguploader.uploadFile(event, path, name);
  }
}
