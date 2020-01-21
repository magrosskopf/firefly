import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

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
      public afDB: AngularFirestore
  ) {
    // TODO MS 20.01.20: insert Service getGeolocation() when branches are merged
  }

  ngOnInit() {
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
