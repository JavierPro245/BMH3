import { Component } from '@angular/core';
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
      icon: 'home-outline',
      name: 'Home',
      redirectTo: '/home'
  
    },
    {
      icon: 'car-outline',
      name: 'Vehiculo',
      redirectTo: '/vehiculo'
  
    },
  
  ];
}
