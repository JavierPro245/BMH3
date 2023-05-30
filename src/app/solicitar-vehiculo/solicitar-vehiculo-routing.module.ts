import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitarVehiculoPage } from './solicitar-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitarVehiculoPageRoutingModule {}
