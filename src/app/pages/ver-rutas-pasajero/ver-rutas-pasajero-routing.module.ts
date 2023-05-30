import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerRutasPasajeroPage } from './ver-rutas-pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: VerRutasPasajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerRutasPasajeroPageRoutingModule {}
