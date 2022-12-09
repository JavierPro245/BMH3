import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/model';
import { AuthService } from 'src/app/services/auth.service';
import { BasedatosService } from 'src/app/services/basedatos.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  nombre= null;
  correo= null;
  rol= null;
  img = null;
  Usuarios: Usuarios[]=[];

  constructor(private firestore: BasedatosService,
              private auth: AuthService) {
    this.auth.stateUser().subscribe( res => {
      if(res){
         this.getDatosUser(res.uid)
      }
    });
   }

  ngOnInit() {
    /*
    this.getUsuarios();
    */
  }

/*
  getUsuarios(){

    this.firestore.getCollection<Usuarios>('Usuarios').subscribe( res =>{
      console.log('Esta es la lectura',res);
      this.Usuarios = res;
    })

  }

*/
  getDatosUser(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<Usuarios>(path,id).subscribe( res => {
      console.log('Datos -> ', res);
      if(res) {
        this.correo = res.correo;
        this.nombre = res.nombre;
        this.rol = res.rol;
        this.img = res.imagen;
        
      }
    })
  }


}
