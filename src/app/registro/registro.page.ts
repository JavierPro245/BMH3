import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../interfaces/model';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario : Usuarios = { 
    uid: '',
    //imagen: string;
    nombre: '',
    correo: '',
    password: '',
    confirmaPass: '',
    rol: '',
  };

  constructor(private firebaseauthService: FirebaseauthService) { }

  ngOnInit() {

  }

  async registrar(){
    const credenciales = {
      email: this.usuario.correo,
      password: this.usuario.password,
    };
    const res = await this.firebaseauthService.registrar(credenciales.email,credenciales.password).catch(err => console.log('err',err));
    console.log("Registrado", res);
  }

}
