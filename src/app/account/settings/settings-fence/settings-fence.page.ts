import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { EarthService } from 'src/app/_services/earth.service';
import { GeodataService } from 'src/app/_services/geodata.service';

@Component({
  selector: 'app-settings-fence',
  templateUrl: './settings-fence.page.html',
  styleUrls: ['./settings-fence.page.scss'],
})
export class SettingsFencePage implements OnInit {
  sliderrange = 0;
  latitude = 0;
  longitude = 0;
  

  constructor(
      public afAuth: AngularFireAuth,
      public afDB: AngularFirestore,
      public earth: EarthService, 
      public geodata: GeodataService
      
  ) {
    // TODO MS 20.01.20: insert Service getGeolocation() when branches are merged
    this.geodata.getGeolocation();
    this.latitude = this.geodata.lat;
    this.longitude = this.geodata.long;
    

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.earth.initMap([], this.latitude, this.longitude, 'map1');
    this.earth.drawCircle(13, this.latitude, this.longitude);
    this.sliderrange = 14;
  }

  drawCircle() {
    this.earth.changeCircle(this.sliderrange, this.latitude, this.longitude);
    
  }

  updateHomefence() {
    const userId = this.afAuth.auth.currentUser.uid;
    this.afDB.collection('customer').doc(userId).update({
      homefence: [
        this.latitude,
        this.longitude,
        this.sliderrange
      ]
    }).then(() => {
      console.log('update homefence');
    }).catch(error => {
      console.log('update homefence didnt work', error);
    });
  }

}
