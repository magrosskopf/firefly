import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UserInfoService } from './user-info.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { PersonalInfo } from '../_interfaces/personal-info';

@Injectable({
  providedIn: 'root'
})
export class GeodataService {

  lat: number;
  long: number;
  geofence = [];
  passedGeofence: boolean;
  passedShop;
  cUser;
  personalInfo: PersonalInfo;
  locationIqToken = '94dd6196217fed';

  constructor(
    private geolocation: Geolocation,
    private userinfo: UserInfoService,
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private httpClient: HttpClient
  ) {
    this.lat = 0;
    this.long = 0;
    this.passedGeofence = false;
    this.passedShop = {};
    this.userinfo.getAllSellerFromFirestore().subscribe(data => {
      this.geofence = data;
      console.log(this.geofence);
    });
    this.afAuth.user.subscribe(user => {
      this.cUser = user;
      this.userinfo.getPersonalDataFromFirestore(this.cUser.uid, 'customer').subscribe(personal => {
        this.personalInfo = personal;
      });
    });
  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      this.compareCoords();

      console.log(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    const watch = this.geolocation.watchPosition();
    watch.subscribe(data => {
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      console.log('sub: ' + data.coords.latitude, data.coords.longitude);
      this.compareCoords();
    });
  }

  getPassedGeofence(): boolean {
    return this.passedGeofence;
  }

  compareCoords() {
    let num: number;
    let stop = true;
    this.geofence.forEach(el => {
      num = (Math.pow(Math.pow(this.lat - el.lat, 2), 0.5) + Math.pow(Math.pow(this.long - el.lng, 2), 0.5));
      if (num < 0.001 && stop) {
        this.passedShop = el;
        this.passedGeofence = true;
        stop = false;

        if (this.passedShop.walkbyUsers24.indexOf(this.cUser.uid) < 0) {
          this.passedShop.walkbyUsers24.push(this.cUser.uid);
          this.passedShop.givenPoints += 5;
          this.personalInfo.points += 5;
          console.log(this.passedShop, this.personalInfo);
          this.presentToast('You got 5 vegan points!');
          this.userinfo.updatePersonalDataFromFirestore(this.cUser.uid, this.personalInfo);
          this.userinfo.updateSellerDataFromFirestore(this.passedShop.uid, this.passedShop);
        }
        // Todo: Check if User already passed this fence and if not, give him some points
      } else if (num > 0.001 && stop) {
        this.passedShop = {};
        this.passedGeofence = false;
      }
    });
    this.passedGeofence = true;
  }

  getGeodataFromLocationIQ(address, zip, city) {
    const location = address + ' ' + zip + ' ' + city;
    return this.httpClient
    .get('https://eu1.locationiq.com/v1/search.php?key=' + this.locationIqToken + '&q=' + encodeURIComponent(location) + '&format=json')
    .toPromise();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
