import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerRutasPasajeroPageRoutingModule } from './ver-rutas-pasajero-routing.module';

import { VerRutasPasajeroPage } from './ver-rutas-pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRutasPasajeroPageRoutingModule
  ],
  declarations: [VerRutasPasajeroPage]
})
export class VerRutasPasajeroPageModule {}
