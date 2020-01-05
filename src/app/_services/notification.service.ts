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

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  data$: any;

  constructor(
    public http: HttpClient,
    public afMessaging: AngularFireMessaging,
    public userinfo: UserInfoService) {
    this.userinfo.getPermissonTokenFirestore();
  }

  enterFence() {
    const payload = {
      reqToken: this.userinfo.nfToken
    };

    this.http.post('https://us-central1-firefly-5af90.cloudfunctions.net/enterFence',
      payload,
      this.httpOptions).subscribe(data => {
      console.log(data);
    });
  }



  requestPermission() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);
          this.userinfo.updatePermissonTokenFirestore(token);
        },
        (error) => {
          console.error(error);
        }
      );
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