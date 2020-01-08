import {
  Injectable
} from '@angular/core';
import {
  HttpHeaders,
  HttpClient
} from '@angular/common/http';
import {
  AngularFireMessaging
} from '@angular/fire/messaging';
import {
  mergeMapTo
} from 'rxjs/operators';
import {
  UserInfoService
} from './user-info.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  currentMessage = new BehaviorSubject(null)
  data$: any;

  constructor(
    public http: HttpClient,
    public afMessaging: AngularFireMessaging,
    public userinfo: UserInfoService
  ) {
    // this.requestPermission();
    // this.userinfo.getPermissonTokenFirestore();
    this.listen();
  }

  enterFence() {
    const payload = {
      reqToken: "fzEIfe6NFC-hGSRzPqUB3l:APA91bEJS7e1kNn8YWdgPrTHpC2WKCGYCLbfROXOV3ZHx_vDS0Fq8Ug_mRSR9mJSzXzDJjqgLC_mzzWT_t-ETXwu0hgqa4leq0oiMJLVopnpmYAxUT8oVk9ovkfy1NxLx14PNkGjCQVU"
    };
    this.httpOptions.headers.append('Authorization', 'bearer ' + this.userinfo.nfToken);

    this.http.post('https://us-central1-firefly-5af90.cloudfunctions.net/enterFence',
      payload,
      this.httpOptions).subscribe(data => {
      console.log(data);
      this.listen();
    });
    

  }


  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token); this.userinfo.updatePermissonTokenFirestore(token)},
        (error) => { console.error(error); }
      );

  }

  listen() {
    this.afMessaging.messages
      .subscribe((message) => { console.log(message); });
  }

  deleteMyToken() {
    this.afMessaging.getToken
      .pipe(mergeMapTo(token => this.afMessaging.deleteToken(token)))
      .subscribe(
        (token) => {
          console.log('Deleted!');
          this.userinfo.deletePermissonTokenFirestore();
        },
      );
  }
}