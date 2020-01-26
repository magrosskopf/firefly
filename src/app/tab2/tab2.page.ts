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
          imgUrl: "../../assets/annas.jpg",
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
