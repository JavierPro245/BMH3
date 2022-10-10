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
}
