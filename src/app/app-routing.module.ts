import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoIngresadoGuard } from './no-ingresado.guard';
import { IngresadoGuard } from './ingresado.guard';
import { ChoferGuard } from './chofer.guard';
import { PasajeroGuard } from './pasajero.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'solicitar-vehiculo',
    loadChildren: () => import('./solicitar-vehiculo/solicitar-vehiculo.module').then( m => m.SolicitarVehiculoPageModule),
    canActivate: [IngresadoGuard, PasajeroGuard]
  },
  {
    path: 'historial-viaje',
    loadChildren: () => import('./historial-viaje/historial-viaje.module').then( m => m.HistorialViajePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'solicidudes-viajes',
    loadChildren: () => import('./solicidudes-viajes/solicidudes-viajes.module').then( m => m.SolicidudesViajesPageModule),
    canActivate: [IngresadoGuard, ChoferGuard]
  },
  {
    path: 'mi-cuenta',
    loadChildren: () => import('./mi-cuenta/mi-cuenta.module').then( m => m.MiCuentaPageModule),
    canActivate: [IngresadoGuard, PasajeroGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'registrar-vehiculo',
    loadChildren: () => import('./registrar-vehiculo/registrar-vehiculo.module').then( m => m.RegistrarVehiculoPageModule),
    canActivate: [IngresadoGuard, ChoferGuard]
  },
  {
    path: 'cuenta-chofer',
    loadChildren: () => import('./cuenta-chofer/cuenta-chofer.module').then( m => m.CuentaChoferPageModule),
    canActivate: [IngresadoGuard, ChoferGuard]
  },
  {
    path: 'mi-info',
    loadChildren: () => import('./mi-info/mi-info.module').then( m => m.MiInfoPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'mis-vehiculos',
    loadChildren: () => import('./mis-vehiculos/mis-vehiculos.module').then( m => m.MisVehiculosPageModule),
    canActivate: [IngresadoGuard, ChoferGuard]
  },
  {
    path: 'vehiculo',
    loadChildren: () => import('./vehiculo/vehiculo.module').then( m => m.VehiculoPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./cuenta/cuenta.module').then( m => m.CuentaPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'acerca-de',
    loadChildren: () => import('./acerca-de/acerca-de.module').then( m => m.AcercaDePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'metodo-pago',
    loadChildren: () => import('./metodo-pago/metodo-pago.module').then( m => m.MetodoPagoPageModule),
    canActivate: [IngresadoGuard, PasajeroGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
