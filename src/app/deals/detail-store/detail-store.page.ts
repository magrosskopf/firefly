import { Component, OnInit } from '@angular/core';
import { Store } from '../../_interfaces/store';
import { Router } from '@angular/router';
import { StoreService } from '../../_services/store.service';
import { UserInfoService } from '../../_services/user-info.service';

@Component({
  selector: 'app-detail-store',
  templateUrl: './detail-store.page.html',
  styleUrls: ['./detail-store.page.scss'],
})
export class DetailStorePage implements OnInit {

  store: Store = {
    storeName: '',
    description: '',
    adress: '',
    zip: '',
    city: ''
  };

  favStore = false;
  storeId: string;

  constructor(private router: Router, public storeService: StoreService, public userService: UserInfoService) { }

  ngOnInit() {
    const pathArray = this.router.url.split('/');
    const pathId = pathArray[pathArray.length - 1];

    this.storeService.getStore(pathId).then((data) => {
      this.store.storeName = data.storeName;
      this.store.description = data.description;
      this.store.adress = data.adress;
      this.store.zip = data.zip;
      this.store.city = data.city;
      this.storeId = pathId;
    });

    this.userService.getPersonalFavStoreFromFirestore().then((data) => {
      data.favStores.forEach(element => {
        if (pathId === element) {
          this.favStore = true;
        }
      });
    });
  }

  changeFavStore() {
    this.favStore = !this.favStore;
    this.userService.changePersonalFavStore(this.storeId, this.favStore);
  }

}
