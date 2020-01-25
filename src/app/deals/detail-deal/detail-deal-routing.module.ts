import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailDealPage } from './detail-deal.page';

const routes: Routes = [
  {
    path: '',
    component: DetailDealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailDealPageRoutingModule {}
