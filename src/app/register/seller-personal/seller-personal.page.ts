import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_interfaces/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-personal',
  templateUrl: './seller-personal.page.html',
  styleUrls: ['./seller-personal.page.scss'],
})
export class SellerPersonalPage implements OnInit {

  user: User = {
    uid: '',
    displayName: '',
    email: '',
    password: '',
    confirm: '',
    photoURL: '',
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

  constructor( public authentication: AuthenticationService ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const infos = form.value;

    this.user.email = infos.email;
    this.user.password = infos.password;
    this.user.confirm = infos.confirm;
    this.user.displayName = infos.firstName + ' ' + infos.lastName;

    this.authentication.setLocalUser(this.user);
  }

}
