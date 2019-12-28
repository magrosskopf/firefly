import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealsPage } from './deals.page';

const routes: Routes = [
  {
    path: '',
    component: DealsPage
  },
  {
    path: 'create-deal',
    loadChildren: () => import('./create-deal/create-deal.module').then( m => m.CreateDealPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealsPageRoutingModule {}
