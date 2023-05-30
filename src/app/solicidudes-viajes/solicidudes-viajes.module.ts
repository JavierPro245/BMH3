import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicidudesViajesPageRoutingModule } from './solicidudes-viajes-routing.module';

import { SolicidudesViajesPage } from './solicidudes-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicidudesViajesPageRoutingModule
  ],
  declarations: [SolicidudesViajesPage]
})
export class SolicidudesViajesPageModule {}
