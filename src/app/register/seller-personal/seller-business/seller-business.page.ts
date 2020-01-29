import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { NgForm } from '@angular/forms';
import { User } from '../../../_interfaces/user';

@Component({
  selector: 'app-seller-business',
  templateUrl: './seller-business.page.html',
  styleUrls: ['./seller-business.page.scss'],
})
export class SellerBusinessPage implements OnInit {

  user: User = {
    storeName: '',
    adress: '',
    zip: '',
    city: '',
    lat: null,
    lng: null
  };

  constructor( public authentication: AuthenticationService ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const infos = form.value;

    this.user.storeName = infos.storeName;
    this.user.adress = infos.adress;
    this.user.zip = infos.zip;
    this.user.city = infos.city;
    this.user.lat = infos.lat;
    this.user.lng = infos.lng;

    console.log(this.user);
    this.authentication.setLocalUser(this.user);

    this.authentication.register();

    setTimeout(() => {
      this.authentication.initUserData('salesperson');
    }, 1000);
  }

}
