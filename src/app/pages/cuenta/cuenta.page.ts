import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  nombre= localStorage.getItem("nombre")
  correo= localStorage.getItem("correo")
  rol= localStorage.getItem('rolUsuario')
  constructor() { }

  ngOnInit() {
  }

}
