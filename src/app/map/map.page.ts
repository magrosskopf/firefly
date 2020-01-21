import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GeodataService } from '../_services/geodata.service';
import { UserInfoService } from '../_services/user-info.service';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../_interfaces/personal-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EarthService } from '../_services/earth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage{

  latitude = 54;
  longitude = 9;



  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':  'localhost:8100',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    })
  };

  list: any[];
  favs: any[];

  userInfo: PersonalInfo;
  uid;
  discoveredStoresApi = 'https://us-central1-firefly-5af90.cloudfunctions.net/getDiscoveredStores';

  constructor(public afAuth: AngularFireAuth, public router: Router, private earth: EarthService, public http: HttpClient, public geodata: GeodataService, public _userInfo: UserInfoService) {

    this.geodata.getGeolocation();
    this.latitude = this.geodata.lat;
    this.longitude = this.geodata.long;
    this.list = [];
    this.favs = [];
    this.afAuth.user.subscribe(user => {
      this.uid = user.uid;
      this.getDiscoveredStores(this._userInfo.getPersonalDataFromFirestore(this.uid, 'customer'));

    });

    /* this._userInfo.getPersonalDataFromFirestore(afAuth.auth.currentUser.uid)
    this._userInfo.userInfo.subscribe(data => {
      this.userInfo = data;
      console.log(data);

    }) */

    this.afAuth.user.subscribe(user => {
      this.uid = user.uid;
    });
  }

  ionViewDidEnter() {
  }

  setPosition() {

    this.earth.setPosition(this.geodata.lat, this.geodata.long);
  }

  openShop(id) {
    console.log(id);

    this.router.navigateByUrl('/shop-detail');
  }



  getDiscoveredStores(userObs: Observable<PersonalInfo>) {
    userObs.subscribe(data => {

      this.userInfo = data;
      // this.getStoreData();
      this.list = [
        {
          adId: ['', 'KlupshZuIxtQ5dfqf3AG', 'NFZV3JOzWcC3rbUNpctd', 'cfmde9Oezwms9Y9oQkRu', '8MrtrXGfTOsEpuMHv0Yk', 'fcd9YbIAOsoialx56QAh', 'XK8NVOrIjiaiYRfnNkaY', 'nbZffS1zBfsEuRzChT3L', 'Kb8LMrue7acSkrvIFmye', '7FjFoXSxo8aR6jKi9d0x', 'p7cngRHytryAdHRvcd9M', 'HnppUZ0w7P3kLFie9jLs', 'Y8yp2TMMLCLLqMDQY6Vg', 'pA63Tzs4pFMWpQZnuA2w', 'TY1GEN1XWHk1pZBxC1qg', 'cx6kXSoNUQMi2FuCCZ6y', 'CRI4gRAJrW8wCGfRi50V', 'KIEQTo0BCzl0wTnRnEvp', '048rnuQhtrZTFHi8215B', 'OLc2eUbdX5YRiEpLYZFm', 'q7BiOJnOXafvvgz6XNyP', 'Uru8sCRQnY8Y7SBimLXj', 'NImT9rCMfwXP8ewpAvTm', 'kpNkGITCLeokQgFdM8gc', 'q1WbZ5zZTOZQtqPc2E0Q'],
          adress: 'Lütt-Moor 8',
          buyingUsers24: ['XAbffjv83Qca96mro0RXRYSlnys1'],
          categoryId: '',
          city: 'Wismar',
          givenPoints: 0,
          imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Rostock_asv2018-05_img42_aerial_view.jpg/1200px-Rostock_asv2018-05_img42_aerial_view.jpg',
          owner: 'Henningsvater Löwe',
          qrCode: '',
          storeName: 'FSD',
          toGoodToGoActive: [''],
          toGoodToGoHistory: [''],
          verified: false,
          walkbyUsers24: [''],
          zip: '23970',
          lat: 49,
          long: 9
        }
      ];
      this.earth.initMap(this.list, this.favs, this.geodata.lat, this.geodata.long);

    });

  }

  getStoreData() {
    this.userInfo.discoveredStores.forEach(element => {
      this._userInfo.getSellerDataFromFirestore(element).subscribe(data => {
        if (data !== undefined) {
          console.log(data);

          this.list.push(data);
        }


      });
    });
    this.userInfo.favStores.forEach(element => {
      this._userInfo.getSellerDataFromFirestore(element).subscribe(data => {
        if (data !== undefined) {
          this.favs.push(data);
        }
      });
    });
  }

}

