import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';

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

  constructor(public router: Router) { }

  initMap(list: any[], favs: any[], lat, long): void {
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
      let marker = new L.marker([element.lat, element.long], {icon: this.greenIcon}).addTo(this.map)
      .bindPopup(
       
        
          '<img src="' + element.imgUrl + '" width="100%" />' +
          
            '<a href="/shop-detail/0WfSKft5onQ44wlYWlBqAisk2KJ2"><h2>' + 
              element.storeName + 
            '</h2>'+
            '</a>'          
      )
    });
    
  }

  setPosition(lat, long) {
    
    this.map.panTo(new L.LatLng(lat, long));
  }
  openShop(id) {
    console.log(id);
    
    this.router.navigateByUrl('/shop-detail');
  }
}
