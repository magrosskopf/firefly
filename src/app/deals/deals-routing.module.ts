import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealsPage } from './deals.page';

const routes: Routes = [
  {
    path: '',
    component: DealsPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create-deal/create-deal.module').then( m => m.CreateDealPageModule)
  },
  {
    path: 'facts',
    loadChildren: () => import('./facts/facts.module').then( m => m.FactsPageModule)
  },
  {
    path: 'deal/:id',
    loadChildren: () => import('./detail-deal/detail-deal.module').then( m => m.DetailDealPageModule)
  },
  {
    path: 'store/:id',
    loadChildren: () => import('./detail-store/detail-store.module').then( m => m.DetailStorePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealsPageRoutingModule {}
