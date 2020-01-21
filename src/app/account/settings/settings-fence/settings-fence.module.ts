import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsFencePageRoutingModule } from './settings-fence-routing.module';

import { SettingsFencePage } from './settings-fence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsFencePageRoutingModule
  ],
  declarations: [SettingsFencePage]
})
export class SettingsFencePageModule {}
