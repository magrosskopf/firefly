import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { UserInfoService } from './user-info.service';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'localhost:8100',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    })
  };
  currentMessage = new BehaviorSubject(null);
  message;
  data$: any;
  uid: string;

  constructor(
      public http: HttpClient,
      public afMessaging: AngularFireMessaging,
      public userinfo: UserInfoService,
      public toastController: ToastController,
      public afAuth: AngularFireAuth
  ) {
    afAuth.user.subscribe(data => {
      this.uid = data.uid;
      // this.requestPermission(data.uid);
      // this.userinfo.getPermissonTokenFirestore(data.uid);
      // this.listen();
    });
  }

  enterFence() {
    const payload = {
      // tslint:disable-next-line:max-line-length
      reqToken: 'ev5E-29vQPiLekEQzJO0jC:APA91bGVasLAGYcKuLhPH-8Vsz3NjwcmSDi9h6BsdJaOFcOdLLJ1i7irIDs_o9cfYeKIT13FjbQ7q5xJDorQbU4SZMgMg3ofF7MGyd0ADoBsizmlQ5EhGSnt6dqAYvzepxNBgAMGI1rp'
    };
    this.httpOptions.headers.append('Authorization', 'bearer ' + this.userinfo.nfToken);

    this.http.post('https://us-central1-firefly-5af90.cloudfunctions.net/enterFence',
        payload,
        this.httpOptions).subscribe(data => {
      console.log(data);
      let message = data['message'].message.notification.title + ' - ' + data['message'].message.notification.body;
      // TODO MSC 21.01.20 Hier const statt let?
      this.presentToast(message);
      this.listen();
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  requestPermission(uid) {
    this.afMessaging.requestPermission
    .pipe(mergeMapTo(this.afMessaging.tokenChanges))
    .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);
          this.userinfo.updatePermissonTokenFirestore(token, uid);
        },
        (error) => {
          console.error(error);
        }
    );

  }

  listen() {
    this.afMessaging.messages
    .subscribe((message) => {
      console.log(message);
      this.message = message;
    });
  }

  deleteMyToken(uid) {
    this.afMessaging.getToken
    .pipe(mergeMapTo(token => this.afMessaging.deleteToken(token)))
    .subscribe(
        (token) => {
          console.log('Deleted!');
          this.userinfo.deletePermissonTokenFirestore(uid);
        },
    );
  }
}
