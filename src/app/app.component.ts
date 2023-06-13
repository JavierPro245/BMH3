import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseauthService } from './services/firebaseauth.service';
interface Componente{
  icon:string;
  name:string;
  redirectTo:string;
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  public appPages = [
    { title: 'Mi cuenta', url: '/mi-cuenta', icon: 'person-circle' },
    { title: 'Historial de viaje', url: '/historial-viaje', icon: 'timer' },
    { title: 'Solicitar transporte', url: '/solicidudes-viajes', icon: 'car-sport' },
  ];
  constructor(private router: Router,
              private firebaseauthService: FirebaseauthService) { }

  componentes : Componente[] = [
    {
      icon: 'person-circle',
      name: 'Mi Cuenta',
      redirectTo: '/mi-cuenta'
  
    },
    {
      icon: 'timer',
      name: 'Historial de viaje',
      redirectTo: '/historial-viaje'
  
    },
    {
      icon: 'car-sport',
      name: 'Solicitar transporte',
      redirectTo: '/solicitar-vehiculo'
  
    },
  
  ];

  cerrarSesion(){
    //localStorage.removeItem('ingresado');
    this.firebaseauthService.logout();
    // this.interaction.Alerta('Sesion Cerrada');
    this.router.navigate(['/login']);
  }
  //navController:NavController esto iba dentro del cerrar sesion
}
