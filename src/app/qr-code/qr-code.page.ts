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
import {
  FirebaseAuth
} from '@angular/fire';
import {
  AuthenticationService
} from '../_services/authentication.service';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  PersonalInfo
} from '../_interfaces/personal-info';
import {
  GeodataService
} from '../_services/geodata.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  qrText;
  scanSub;
  cUser;
  sellerInf;
  constructor(
    private auth: AuthenticationService,
    private qrScanner: QRScanner,
    public platform: Platform,
    public toastController: ToastController,
    private userinfo: UserInfoService,
    public afAuth: AngularFireAuth,
    public geodata: GeodataService
  ) {
    this.afAuth.user.subscribe(user => {
      this.cUser = user;
    })
    // this.geodata.getGeolocation();

  }

  ngOnInit() {

  }

  ionViewWillEnter() {
   
    this.scanCode();

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
      if (data.length > 18) {
        this.checkQRCode(data);
      }
      setTimeout(() => {
        document.body.style.visibility = 'visible';
        this.qrScanner.hide();
      }, 500)

    });
    this.qrScanner.show();
    document.getElementById('bg-hidden').style.visibility = 'hidden';
    document.body.style.visibility = 'hidden';
  }

  setVisible() {
    document.body.style.visibility = 'visible';
  }

  checkQRCode(code: string) {

    if (this.geodata.passedGeofence && this.geodata.passedShop['shopId'].indexOf(code) === 0) {
      console.log('passed');


      let u: PersonalInfo;
      this.userinfo.getPersonalDataFromFirestore(this.cUser.uid, 'customer').subscribe(user => {
        u = user;
      });
      this.userinfo.getSellerDataFromFirestore(code).subscribe(seller => {
        if (seller.buyingUsers24.indexOf(this.cUser.uid) < 0) {
          console.log('nicht drin');
          u.points += 5;
          u.history.push(code);
          if (u.discoveredStores.indexOf(code) < 0) {
            u.discoveredStores.push(code);
          }
          this.userinfo.updatePersonalDataFromFirestore(this.cUser.uid, u);
          seller.buyingUsers24.push(this.cUser.uid);
          this.userinfo.updateSellerDataFromFirestore(code, seller);
          this.presentToast('Du hast 5 Punkte bekommen!');
        }
      });
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