import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Injectable({
  providedIn: 'root'
})
export class GeodataService {

  lat: number;
  long: number;
  geofence =[ {
    lat: 54.0,
    long: 9.0,
    radius: 100,
    shopId: '12345',
    isInFence: false
  },{
    lat: 53.0,
    long: 9.0,
    radius: 100,
    shopId: '123456',
    isInFence: false
  },{
    lat: 54.0,
    long: 8.0,
    radius: 100,
    shopId: '123457',
    isInFence: false
  },
]
  passedGeofence: boolean;
  passedShop = {};

  constructor(private geolocation: Geolocation ) {
    this.lat = 0;
    this.long = 0;
    this.passedGeofence = false;
   }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    console.log(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    const watch = this.geolocation.watchPosition();
    watch.subscribe(data => {
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      this.compareCoords();
    });
  }

  compareCoords() {
    let num: number;
    this.geofence.forEach(el => {
      num = (Math.pow(Math.pow(this.lat - el.lat, 2), 0.5) + Math.pow(Math.pow(this.long - el.long, 2), 0.5));
      if (num  < 0.001) {
        this.passedShop = el;
        this.passedGeofence = true;
        // Todo: Check if User already passed this fence and if not, give him some points
      } else {
        this.passedShop = {};
        this.passedGeofence = false;
      }
    })
  }
}
