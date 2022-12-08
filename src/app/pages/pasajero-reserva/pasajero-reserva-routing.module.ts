import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasajeroReservaPage } from './pasajero-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: PasajeroReservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasajeroReservaPageRoutingModule {}
