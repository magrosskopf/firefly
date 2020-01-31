import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerPersonalPage } from './seller-personal.page';

const routes: Routes = [
  {
    path: '',
    component: SellerPersonalPage
  },
  {
    path: 'business',
    loadChildren: () => import('./seller-business/seller-business.module').then( m => m.SellerBusinessPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerPersonalPageRoutingModule {}
