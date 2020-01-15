import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrCodeGeneratorPageRoutingModule } from './qr-code-generator-routing.module';
import { QRCodeModule } from 'angularx-qrcode';

import { QrCodeGeneratorPage } from './qr-code-generator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QRCodeModule,
    IonicModule,
    QrCodeGeneratorPageRoutingModule
  ],
  declarations: [QrCodeGeneratorPage]
})
export class QrCodeGeneratorPageModule {}
