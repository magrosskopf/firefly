import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDealPageRoutingModule } from './edit-deal-routing.module';

import { EditDealPage } from './edit-deal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDealPageRoutingModule
  ],
  declarations: [EditDealPage]
})
export class EditDealPageModule {}
