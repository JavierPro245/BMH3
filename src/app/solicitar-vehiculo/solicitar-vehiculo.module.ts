import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarVehiculoPageRoutingModule } from './solicitar-vehiculo-routing.module';

import { SolicitarVehiculoPage } from './solicitar-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitarVehiculoPageRoutingModule
  ],
  declarations: [SolicitarVehiculoPage]
})
export class SolicitarVehiculoPageModule {}
