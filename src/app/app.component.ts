import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
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
  constructor() {}

  componentes : Componente[] = [
    {
      icon: 'person-outline',
      name: 'Mi Cuenta',
      redirectTo: '/cuenta'
  
    },
    {
      icon: 'calendar-number-outline',
      name: 'Feriados',
      redirectTo: '/feriados'
  
    },
    {
      icon: 'car-outline',
      name: 'Vehículo',
      redirectTo: '/vehiculo'
  
    },
  
  ];

  cerrarSesion(navController:NavController){
    localStorage.removeItem('ingresado')
    localStorage.removeItem('nombre')
    localStorage.removeItem('rolUsuario')
  }

}
