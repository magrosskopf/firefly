import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { NgForm } from '@angular/forms';
import { User } from '../../../_interfaces/user';
import { GeodataService } from '../../../_services/geodata.service';

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
    lng: null,
    opening: {
      mo: [null, null],
      di: [null, null],
      mi: [null, null],
      do: [null, null],
      fr: [null, null],
      sa: [null, null],
      so: [null, null]
    }
  };

  constructor(public authentication: AuthenticationService, public geodataService: GeodataService) {}

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    const infos = form.value;
    const locationIq = await this.geodataService.getGeodataFromLocationIQ(infos.adress, infos.zip, infos.city);
    this.user.storeName = infos.storeName;
    this.user.adress = infos.adress;
    this.user.zip = infos.zip;
    this.user.city = infos.city;
    this.user.lat = parseFloat(locationIq[0].lat);
    this.user.lng = parseFloat(locationIq[0].lon);
    this.user.opening = {
      mo: [infos.mo, infos.mo_end],
      di: [infos.di, infos.di_end],
      mi: [infos.mi, infos.mi_end],
      do: [infos.do, infos.do_end],
      fr: [infos.fr, infos.fr_end],
      sa: [infos.sa, infos.sa_end],
      so: [infos.so, infos.so_end]
    };

    this.authentication.setLocalUser(this.user);
    await this.authentication.register();
    this.authentication.initUserData('salesperson');
  }

}
