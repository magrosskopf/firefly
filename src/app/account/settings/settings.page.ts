import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { ImguploaderService } from 'src/app/_services/imguploader.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public authentication: AuthenticationService,
              private imguploader: ImguploaderService,
              public afAuth: AngularFireAuth) {}

  ngOnInit() {
  }

  uploadFile(event, path, name) {
    this.imguploader.uploadFile(event, path, name);
  }
}
