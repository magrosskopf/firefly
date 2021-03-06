import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'deals',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../deals/deals.module').then(m => m.DealsPageModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../map/map.module').then(m => m.MapPageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../account/account.module').then(m => m.AccountPageModule)
          }
        ],
        canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'shop',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../shop/shop.module').then( m => m.ShopPageModule)
          }
        ]
      },
      {
        path: 'facts',
        children: [
          {
            path: '',
            loadChildren: () => import('../facts/facts.module').then( m => m.FactsPageModule)
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
