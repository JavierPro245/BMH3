import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
    if (localStorage.getItem('rol')== 'Pasajero'){
      this.navController.navigateRoot('/solicitar-vehiculo');
    }else{
      this.navController.navigateRoot('/solicidudes-viajes');
    }
  }

}
