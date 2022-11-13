import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/model';
import { BasedatosService } from 'src/app/services/basedatos.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  nombre= localStorage.getItem("nombre")
  correo= localStorage.getItem("correo")
  rol= localStorage.getItem('rolUsuario')

  Usuarios: Usuarios[]=[];

  constructor(private firestore: BasedatosService) { }

  ngOnInit() {
    this.getUsuarios();
  }


  getUsuarios(){

    this.firestore.getCollection<Usuarios>('Usuarios').subscribe( res =>{
      console.log('Esta es la lectura',res);
      this.Usuarios = res;
    })

  }


}
