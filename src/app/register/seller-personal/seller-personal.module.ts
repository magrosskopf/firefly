import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerPersonalPageRoutingModule } from './seller-personal-routing.module';

import { SellerPersonalPage } from './seller-personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerPersonalPageRoutingModule
  ],
  declarations: [SellerPersonalPage]
})
export class SellerPersonalPageModule {}
