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

  list = [
    {
      lat: 49.5,
      long: 9.0
    },
    {
      lat: 49,
      long: 9
    },
    {
      lat: 49.4,
      long: 9.1
    },
    {
      lat: 49.3,
      long: 9.2
    },
    {
      lat: 49.2,
      long: 9.4
    }
    ]
    

  userInfo: PersonalInfo;

  discoveredStoresApi = 'https://us-central1-firefly-5af90.cloudfunctions.net/getDiscoveredStores';

  constructor(public afAuth: AngularFireAuth, private earth: EarthService, public http: HttpClient, public geodata: GeodataService, public _userInfo: UserInfoService) {
    
    this.geodata.getGeolocation();
    this.latitude = this.geodata.lat;
    this.longitude = this.geodata.long;
    this.getDiscoveredStores();
    /* this._userInfo.getPersonalDataFromFirestore(afAuth.auth.currentUser.uid)
    this._userInfo.userInfo.subscribe(data => {
      this.userInfo = data;
      console.log(data);
      
    }) */

    
  }

  ionViewDidEnter() {
    this.earth.initMap(this.list, this.geodata.lat, this.geodata.long);
  }

  setPosition() {
    console.log(this.geodata.lat, this.geodata.long);
    
    this.earth.setPosition(this.geodata.lat, this.geodata.long)
  }

  

  getDiscoveredStores(){
    const payload = {
      uid: this.afAuth.auth.currentUser
    };

    this.httpOptions.headers.append('Authorization', 'bearer ' + this._userInfo.nfToken);

    this.http.post(this.discoveredStoresApi,
      payload,
      this.httpOptions).subscribe(data => {
      console.log(data);
    });
  }

}
