import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
    if (localStorage.getItem('rol')== 'Pasajero'){
      this.navController.navigateRoot('/mi-cuenta');
    }else{
      this.navController.navigateRoot('/cuenta-chofer');
    }
  }

}
