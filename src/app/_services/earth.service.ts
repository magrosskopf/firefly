import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class EarthService {

  greenIcon = L.icon({
    iconUrl: 'assets/map.svg',
    shadowUrl: 'assets/Element 1.svg',
    iconSize:     [60, 112], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 40],  // the same for the shadow
    popupAnchor:  [-0, -76] // point from which the popup should open relative to the iconAnchor
  });

  map: any;

  constructor() { }

  initMap(list: any[], lat, long): void {
    this.map = L.map('map').setView([lat, long], 8);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.addMarker(list);
    tiles.addTo(this.map);
  }

  addMarker(markerList: any[]) {
    markerList.forEach(element => {
      const marker = new L.marker([element.lat, element.long], {icon: this.greenIcon}).addTo(this.map)
      // TODO MSC 21.01.20 hier const statt let?
      .bindPopup('Ionic 4 <br> Leaflet.' + element.long + element.lat);
    });
  }

  setPosition(lat, long) {
    this.map.panTo(new L.LatLng(lat, long));
  }
}
