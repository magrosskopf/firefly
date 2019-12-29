import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerBusinessPageRoutingModule } from './seller-business-routing.module';

import { SellerBusinessPage } from './seller-business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerBusinessPageRoutingModule
  ],
  declarations: [SellerBusinessPage]
})
export class SellerBusinessPageModule {}
