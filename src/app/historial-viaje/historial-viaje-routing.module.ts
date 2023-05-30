import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialViajePage } from './historial-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialViajePageRoutingModule {}
