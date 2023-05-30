import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialViajePageRoutingModule } from './historial-viaje-routing.module';

import { HistorialViajePage } from './historial-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialViajePageRoutingModule
  ],
  declarations: [HistorialViajePage]
})
export class HistorialViajePageModule {}
