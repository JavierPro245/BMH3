import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

  constructor() { }
  rol= localStorage.getItem('rolUsuario');
  ngOnInit() {
  }
  
}
