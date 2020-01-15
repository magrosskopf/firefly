import {
  Component,
  OnInit
} from '@angular/core';
import {
  QRScanner,
  QRScannerStatus
} from '@ionic-native/qr-scanner/ngx';
import {
  Platform,
  ToastController
} from '@ionic/angular';
import {
  UserInfoService
} from '../_services/user-info.service';
import { FirebaseAuth } from '@angular/fire';
import { AuthenticationService } from '../_services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  qrText;
  scanSub;
  uid;
  sellerInf;
  constructor(
    private auth: AuthenticationService,
    private qrScanner: QRScanner,
    public platform: Platform,
    public toastController: ToastController,
    private userinfo: UserInfoService,
    public afAuth: AngularFireAuth,
  ) {
    this.afAuth.user.subscribe(data => {
      this.userinfo.getSellerDataFromFirestore(data.uid);
    })
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    // this.showCamera();
    // this.scanCode();
    
  }

  ionViewDidEnter() {
    
  }

  ionViewWillLeave() {
    this.setVisible();
  }

  scanCode() {

    // setTimeout(() => { document.body.style.visibility = 'visible' }, 1)
    this.qrScanner.scan().subscribe(data => {
      console.log(data);

      this.qrText = data;
      this.checkQRCode(data);
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

  checkQRCode(code: string) {
    if (condition) {
      
    }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}