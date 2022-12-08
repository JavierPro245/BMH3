import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';
import { PasajeroGuard } from './pasajero.guard';
import { ChoferGuard } from './chofer.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'vehiculo',
    loadChildren: () => import('./pages/vehiculo/vehiculo.module').then( m => m.VehiculoPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'registro-vehiculo',
    loadChildren: () => import('./pages/registro-vehiculo/registro-vehiculo.module').then( m => m.RegistroVehiculoPageModule),
    canActivate: [IngresadoGuard, ChoferGuard]
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./pages/registrarse/registrarse.module').then( m => m.RegistrarsePageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'buscar-vehiculo',
    loadChildren: () => import('./pages/buscar-vehiculo/buscar-vehiculo.module').then( m => m.BuscarVehiculoPageModule),
    canActivate: [IngresadoGuard, PasajeroGuard]
  },
  {
    path: 'feriados',
    loadChildren: () => import('./pages/feriados/feriados.module').then( m => m.FeriadosPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'reserva',
    loadChildren: () => import('./pages/reserva/reserva.module').then( m => m.ReservaPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'pasajero-reserva',
    loadChildren: () => import('./pages/pasajero-reserva/pasajero-reserva.module').then( m => m.PasajeroReservaPageModule),
    canActivate: [IngresadoGuard, PasajeroGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
