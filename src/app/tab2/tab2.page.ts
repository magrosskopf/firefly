import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { GeodataService } from '../_services/geodata.service';
import * as L from 'leaflet';
import { marker } from 'leaflet';
import { UserInfoService } from '../_services/user-info.service';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../_interfaces/personal-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {featureGroup, latLng, tileLayer, polygon, Icon, LatLngBounds} from 'leaflet';
import { EarthService } from '../_services/earth.service';
import { element } from 'protractor';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

 

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
      
    })
   
    /* this._userInfo.getPersonalDataFromFirestore(afAuth.auth.currentUser.uid)
    this._userInfo.userInfo.subscribe(data => {
      this.userInfo = data;
      console.log(data);
      
    }) */

    this.afAuth.user.subscribe(user => {
      this.uid = user.uid;
    })
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

  // TODO MSC 22.01.20 tab2 und map sind mehr oder weniger doppelt. Leaflet Popup zieht sich die Daten von map. Was von tab2page wird noch gebraucht?

  getDiscoveredStores(userObs: Observable<PersonalInfo>){
    userObs.subscribe(data => {
      
      this.userInfo = data;
      //this.getStoreData();
      this.list = [
        {
          adId: ["", "KlupshZuIxtQ5dfqf3AG", "NFZV3JOzWcC3rbUNpctd", "cfmde9Oezwms9Y9oQkRu", "8MrtrXGfTOsEpuMHv0Yk", "fcd9YbIAOsoialx56QAh", "XK8NVOrIjiaiYRfnNkaY", "nbZffS1zBfsEuRzChT3L", "Kb8LMrue7acSkrvIFmye", "7FjFoXSxo8aR6jKi9d0x", "p7cngRHytryAdHRvcd9M", "HnppUZ0w7P3kLFie9jLs", "Y8yp2TMMLCLLqMDQY6Vg", "pA63Tzs4pFMWpQZnuA2w", "TY1GEN1XWHk1pZBxC1qg", "cx6kXSoNUQMi2FuCCZ6y", "CRI4gRAJrW8wCGfRi50V", "KIEQTo0BCzl0wTnRnEvp", "048rnuQhtrZTFHi8215B", "OLc2eUbdX5YRiEpLYZFm", "q7BiOJnOXafvvgz6XNyP", "Uru8sCRQnY8Y7SBimLXj", "NImT9rCMfwXP8ewpAvTm", "kpNkGITCLeokQgFdM8gc", "q1WbZ5zZTOZQtqPc2E0Q"],
          adress: "Schwanengasse 2",
          buyingUsers24: ["XAbffjv83Qca96mro0RXRYSlnys1"],
          categoryId: "",
          city: "Mosbach",
          givenPoints: 0,
          // TODO @Tami, hier kannst du ein Bild reinladen für das Leaflet Popup.
          imgUrl: "data:image/jpeg;base64,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",
          owner: "Anna Seeber",
          qrCode: "",
          storeName: "Annas",
          toGoodToGoActive: [""],
          toGoodToGoHistory: [""],
          verified: false,
          walkbyUsers24: [""],
          zip: "74821",
          lat: 49,
          long: 9
        }
      ]
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
       
        
      })
    });
    this.userInfo.favStores.forEach(element => {
      this._userInfo.getSellerDataFromFirestore(element).subscribe(data => {
        if (data !== undefined) {
          this.favs.push(data);
        }
      })
    })
  }

}
