import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDealPage } from './edit-deal.page';

const routes: Routes = [
  {
    path: '',
    component: EditDealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDealPageRoutingModule {}
