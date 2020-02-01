import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GeodataService } from '../_services/geodata.service';
import { UserInfoService } from '../_services/user-info.service';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.page.html',
  styleUrls: ['./qr-code-generator.page.scss'],
})
export class QrCodeGeneratorPage implements OnInit {

  public myAngularxQrCode: string = null;
  user;
  href: string;

  constructor( public afAuth: AngularFireAuth,
               private geodata: GeodataService,
               public userinfo: UserInfoService ) {
    this.afAuth.user.subscribe(data => {
      this.user = data;
    });
    this.geodata.getGeolocation();
   }

  ngOnInit() {
  }

  createQR() {
    this.myAngularxQrCode = this.user.uid;
    setTimeout(() => {
      this.captureScreen();
    }, 3000);
  }

  captureScreen() {
    this.href = document.getElementsByTagName('canvas')[0].toDataURL();
    const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    const position = 10;
    pdf.addImage(this.href, 'PNG', 0, position, 100, 100);
    pdf.save('QR-Code-' + this.afAuth.auth.currentUser.displayName + '.pdf'); // Generated PDF
  }

}
