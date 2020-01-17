import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsFencePage } from './settings-fence.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsFencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsFencePageRoutingModule {}
