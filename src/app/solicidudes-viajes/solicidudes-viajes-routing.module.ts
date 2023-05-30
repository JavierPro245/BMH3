import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicidudesViajesPage } from './solicidudes-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: SolicidudesViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicidudesViajesPageRoutingModule {}
