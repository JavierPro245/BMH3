import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasajeroReservaPageRoutingModule } from './pasajero-reserva-routing.module';

import { PasajeroReservaPage } from './pasajero-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasajeroReservaPageRoutingModule
  ],
  declarations: [PasajeroReservaPage]
})
export class PasajeroReservaPageModule {}
