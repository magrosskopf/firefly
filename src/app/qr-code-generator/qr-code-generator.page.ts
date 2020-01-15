import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.page.html',
  styleUrls: ['./qr-code-generator.page.scss'],
})
export class QrCodeGeneratorPage implements OnInit {

  public myAngularxQrCode: string = null;
    
  constructor() {
   }

  ngOnInit() {
  }

  createQR() {
    this.myAngularxQrCode = 'www.google.de';
  }

}
