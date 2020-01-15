import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  qrText;
  scanSub;
  constructor(private qrScanner: QRScanner,  public platform: Platform, public toastController: ToastController) { 
  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    // this.showCamera();
    this.scanCode();

  }
  
  ionViewWillLeave(){
    this.setVisible();
  }

  scanCode() {

      // setTimeout(() => { document.body.style.visibility = 'visible' }, 1)
    this.qrScanner.scan().subscribe(data => {
      console.log(data);
      
      this.qrText = data;
      this.presentToast(data);
      setTimeout(() => {
        document.body.style.visibility = 'visible';
        this.qrScanner.hide();
      }, 500)

    });
    this.qrScanner.show();
    document.body.style.visibility = 'hidden';
  }

  setVisible() {
    document.body.style.visibility = 'visible';
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
