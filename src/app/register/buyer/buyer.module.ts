import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyerPageRoutingModule } from './buyer-routing.module';

import { BuyerPage } from './buyer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyerPageRoutingModule
  ],
  declarations: [BuyerPage]
})
export class BuyerPageModule {}
