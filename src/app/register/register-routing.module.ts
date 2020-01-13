import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  },
  {
    path: 'buyer',
    loadChildren: () => import('./buyer/buyer.module').then( m => m.BuyerPageModule)
  },
  {
    path: 'seller',
    loadChildren: () => import('./seller-personal/seller-personal.module').then( m => m.SellerPersonalPageModule)
  },
  {
    path: 'homefence-register',
    loadChildren: () => import('./homefence-register/homefence-register.module').then(m => m.HomefenceRegisterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
