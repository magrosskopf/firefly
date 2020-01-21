import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  },
  {
    path: 'deal/:id',
    loadChildren: () => import('./edit-deal/edit-deal.module').then( m => m.EditDealPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
