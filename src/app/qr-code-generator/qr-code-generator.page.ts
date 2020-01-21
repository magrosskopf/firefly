import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GeodataService } from '../_services/geodata.service';
import { UserInfoService } from '../_services/user-info.service';

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.page.html',
  styleUrls: ['./qr-code-generator.page.scss'],
})
export class QrCodeGeneratorPage implements OnInit {

  public myAngularxQrCode: string = null;
  user;

  constructor( public afAuth: AngularFireAuth, private geodata: GeodataService, public userinfo: UserInfoService ) {
    this.afAuth.user.subscribe(data => {
      this.user = data;
    });
    this.geodata.getGeolocation();
   }

  ngOnInit() {
  }

  createQR() {
    this.myAngularxQrCode = this.user.uid;
  }

}
