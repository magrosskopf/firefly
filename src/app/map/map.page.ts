import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GeodataService } from '../_services/geodata.service';
import { UserInfoService } from '../_services/user-info.service';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../_interfaces/personal-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EarthService } from '../_services/earth.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  latitude = 54;
  longitude = 9;
  user = this.authentication.afAuth.auth.currentUser;
  role = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'localhost:8100',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    })
  };

  list: any[];
  favs: any[];

  personalInfo: PersonalInfo;
  uid;
  discoveredStoresApi = 'https://us-central1-firefly-5af90.cloudfunctions.net/getDiscoveredStores';

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private earth: EarthService,
    public http: HttpClient,
    public geodata: GeodataService,
    public authentication: AuthenticationService,
    public userService: UserInfoService
  ) {
    this.userService.getRoleFromFirestore(this.user.uid)
    .subscribe(data => {
      this.role = data.role;
    });

    this.geodata.getGeolocation();
    this.latitude = this.geodata.lat;
    this.longitude = this.geodata.long;
    this.list = [];
    this.favs = [];
    this.afAuth.user.subscribe(user => {
      this.uid = user.uid;
      this.getDiscoveredStores(this.userService.getPersonalDataFromFirestore(this.uid, 'customer'));
    });

    this.afAuth.user.subscribe(user => {
      this.uid = user.uid;
    });
  }

  setPosition() {
    this.earth.setPosition(this.geodata.lat, this.geodata.long);
  }

  openShop(id) {
    this.router.navigateByUrl('/tabs/shop');
  }

  getDiscoveredStores(userObs: Observable < PersonalInfo > ) {
    userObs.subscribe(data => {

      this.personalInfo = data;
      this.getStoreData();
      // this.list = [
      //   {
      //     adId: ['',
      //       'KlupshZuIxtQ5dfqf3AG',
      //       'NFZV3JOzWcC3rbUNpctd',
      //       'cfmde9Oezwms9Y9oQkRu',
      //       '8MrtrXGfTOsEpuMHv0Yk',
      //       'fcd9YbIAOsoialx56QAh',
      //       'XK8NVOrIjiaiYRfnNkaY',
      //       'nbZffS1zBfsEuRzChT3L',
      //       'Kb8LMrue7acSkrvIFmye',
      //       '7FjFoXSxo8aR6jKi9d0x',
      //       'p7cngRHytryAdHRvcd9M',
      //       'HnppUZ0w7P3kLFie9jLs',
      //       'Y8yp2TMMLCLLqMDQY6Vg',
      //       'pA63Tzs4pFMWpQZnuA2w',
      //       'TY1GEN1XWHk1pZBxC1qg',
      //       'cx6kXSoNUQMi2FuCCZ6y',
      //       'CRI4gRAJrW8wCGfRi50V',
      //       'KIEQTo0BCzl0wTnRnEvp',
      //       '048rnuQhtrZTFHi8215B',
      //       'OLc2eUbdX5YRiEpLYZFm',
      //       'q7BiOJnOXafvvgz6XNyP',
      //       'Uru8sCRQnY8Y7SBimLXj',
      //       'NImT9rCMfwXP8ewpAvTm',
      //       'kpNkGITCLeokQgFdM8gc',
      //       'q1WbZ5zZTOZQtqPc2E0Q'],
      //     adress: 'Schwanengasse 2',
      //     buyingUsers24: ['XAbffjv83Qca96mro0RXRYSlnys1'],
      //     categoryId: '',
      //     city: 'Mosbach',
      //     givenPoints: 0,
      //     imgUrl: '../../assets/annas.jpg',
      //     owner: 'Anna Seeber',
      //     qrCode: '',
      //     storeName: 'Annas',
      //     toGoodToGoActive: [''],
      //     toGoodToGoHistory: [''],
      //     verified: false,
      //     walkbyUsers24: [''],
      //     zip: '74821 ',
      //     lat: 49,
      //     long: 9
      //   }
      // ];
    });
  }

  getStoreData() {
    this.userService.getAllSellerFromFirestore().subscribe(data => {
      data.forEach(element => {
        if (element !== undefined) {
          this.list.push(element);
        }
      });
      this.earth.initMap(this.list, this.geodata.lat, this.geodata.long, 'map');
    });
  }
}

