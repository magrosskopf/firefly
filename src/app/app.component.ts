import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './_services/authentication.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { NotificationService } from './_services/notification.service';
import { GeodataService } from './_services/geodata.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthenticationService,
    private afMessaging: AngularFireMessaging,
    private notification: NotificationService,
    private geodata: GeodataService
  ) {
    this.initializeApp();
    this.notification.listen();
    this.geodata.getGeolocation();
    this.afMessaging.messages
    .subscribe((message) => { console.log(message); });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
