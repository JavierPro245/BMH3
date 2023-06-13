import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'solicitar-vehiculo',
    loadChildren: () => import('./solicitar-vehiculo/solicitar-vehiculo.module').then( m => m.SolicitarVehiculoPageModule)
  },
  {
    path: 'historial-viaje',
    loadChildren: () => import('./historial-viaje/historial-viaje.module').then( m => m.HistorialViajePageModule)
  },
  {
    path: 'solicidudes-viajes',
    loadChildren: () => import('./solicidudes-viajes/solicidudes-viajes.module').then( m => m.SolicidudesViajesPageModule)
  },
  {
    path: 'mi-cuenta',
    loadChildren: () => import('./mi-cuenta/mi-cuenta.module').then( m => m.MiCuentaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'registrar-vehiculo',
    loadChildren: () => import('./registrar-vehiculo/registrar-vehiculo.module').then( m => m.RegistrarVehiculoPageModule)
  },
  {
    path: 'cuenta-chofer',
    loadChildren: () => import('./cuenta-chofer/cuenta-chofer.module').then( m => m.CuentaChoferPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
