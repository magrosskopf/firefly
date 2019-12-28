import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDealPage } from './create-deal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDealPageRoutingModule {}
