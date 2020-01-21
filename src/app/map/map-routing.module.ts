import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapPage } from './map.page';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  },
  {
    path: 'shop-detail/:id',
    loadChildren: () => import('./shop-detail/shop-detail.module').then( m => m.ShopDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapPageRoutingModule {}
