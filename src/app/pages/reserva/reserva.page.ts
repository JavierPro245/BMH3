import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  constructor(private navController: NavController) { }
  rol= localStorage.getItem('rolUsuario');
  ngOnInit() {
    if (localStorage.getItem('rolUsuario')== 'pasajero'){
      this.navController.navigateRoot('/pasajero-reserva');
    }else{
      this.navController.navigateRoot('/reserva');
    }
  }

}
