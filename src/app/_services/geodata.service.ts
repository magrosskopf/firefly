import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Injectable({
  providedIn: 'root'
})
export class GeodataService {

  lat: number;
  long: number;
  geofence = {
    lat: 54.0,
    long: 9.0,
    radius: 100
  }
  passedGeofence: boolean;

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
      if (this.compareCoords() < 0.001) {
        this.passedGeofence = true;
      } else {
        this.passedGeofence = false;
      }
    });
  }

  compareCoords(): number {
    let num: number;
    num = (Math.pow(Math.pow(this.lat - this.geofence.lat, 2), 0.5) + Math.pow(Math.pow(this.long - this.geofence.long, 2), 0.5));
    console.log(num);
    return num;
  }
}
