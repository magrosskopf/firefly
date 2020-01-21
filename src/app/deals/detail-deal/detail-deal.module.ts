import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailDealPageRoutingModule } from './detail-deal-routing.module';

import { DetailDealPage } from './detail-deal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailDealPageRoutingModule
  ],
  declarations: [DetailDealPage]
})
export class DetailDealPageModule {}
