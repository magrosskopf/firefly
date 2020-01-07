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
  },
  {
    path: 'show/:id',
    loadChildren: () => import('./detail-deal/detail-deal.module').then( m => m.DetailDealPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit-deal/edit-deal.module').then( m => m.EditDealPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealsPageRoutingModule {}
