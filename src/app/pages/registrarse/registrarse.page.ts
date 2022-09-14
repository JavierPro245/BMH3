import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  nombre: string='';

  usuario = {
    user: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: ''
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Submit');
    console.log(this.usuario);
  }

  registrarse(){
    this.router.navigate(['/home']);
  }

}
