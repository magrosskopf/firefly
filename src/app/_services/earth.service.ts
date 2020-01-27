import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Injectable({
  providedIn: 'root'
})
export class EarthService {

  greenIcon = L.icon({
    iconUrl: 'assets/map.svg',
    shadowUrl: 'assets/Element 1.svg',
    iconSize: [60, 112], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 40],  // the same for the shadow
    popupAnchor: [-0, -76] // point from which the popup should open relative to the iconAnchor
  });

  map: any;
  follow = true;

  constructor(public router: Router, private geolocation: Geolocation) {
    
  }

  initMap(list: any[], favs: any[], lat, long): void {
    this.map = L.map('map').setView([lat, long], 8);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    });
   
    const watch = this.geolocation.watchPosition();
    watch.subscribe(data => {
      if (this.follow) {
        this.setPosition(data.coords.latitude, data.coords.longitude)
      }
    });
    this.addMarker(list);
    tiles.addTo(this.map);
    document.getElementById('map').addEventListener('click', () => {
      this.follow = false;
      console.log(this.follow);
      
    })
  }

  addMarker(markerList: any[]) {
    markerList.forEach(element => {
      const marker = new L.marker([element.lat, element.long], {icon: this.greenIcon}).addTo(this.map)
      .bindPopup(
          '<img src="' + element.imgUrl + '" width="100%" alt="shop_image" />' +
          '<a href="/tabs/map/shop-detail/0WfSKft5onQ44wlYWlBqAisk2KJ2">' +
          '<ion-row>' +
          '<ion-col size=8>' +
          '<h2>' +
          element.storeName +
          '</h2>' +
          '</ion-col>' +
          '<ion-col class="text-left" size=4>' +
          '<ion-icon size="large" name="arrow-dropright"></ion-icon>' +
          '</ion-col>' +
          '</ion-row>' +
          '</a>' +
          '<style> #map .leaflet-popup-content-wrapper { background:#FFA462; color:#fff !important; font-size:16px; line-height:24px;} #map h2 { color: #fff; text-align: right;} #map ion-icon {margin-top: 8px; color: white;} </style>'
      );
    });
  }

  setPosition(lat, long) {
    this.follow = true;
    this.map.panTo(new L.LatLng(lat, long));
   
  }

  openShop(id) {
    console.log(id);

    this.router.navigateByUrl('/shop-detail');
  }
}
