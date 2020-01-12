import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { GeodataService } from '../_services/geodata.service';
import * as L from 'leaflet';
declare var ol: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  email: string;
  pwd: string;

  latitude = 18.5204;
  longitude = 73.8567;

  map: any;

  constructor(public afAuth: AngularFireAuth, public geodata: GeodataService) {
    this.email = '';
    this.pwd = '';
    this.geodata.getGeolocation();
  }

  ngOnInit() {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

    tiles.addTo(this.map);
  }

  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error => console.log(error));
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
