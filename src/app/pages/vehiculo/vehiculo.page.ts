import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

  constructor(private navController: NavController) { }
  rol= localStorage.getItem('rolUsuario');
  ngOnInit() {
    if (localStorage.getItem('rolUsuario')== 'pasajero'){
      this.navController.navigateRoot('/buscar-vehiculo');
    }else{
      this.navController.navigateRoot('/registro-vehiculo');
    }
  }
  
}
