import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDealPageRoutingModule } from './create-deal-routing.module';

import { CreateDealPage } from './create-deal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDealPageRoutingModule
  ],
  declarations: [CreateDealPage]
})
export class CreateDealPageModule {}
