import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BasedatosService } from 'src/app/services/basedatos.service';
import { Usuarios } from 'src/app/interfaces/model';
import { AuthService } from 'src/app/services/auth.service';
interface Componente {
  icon:string;
  name:string;
  redirectTo:string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombre= null;
  correo= null;
  rol= null;
  
  constructor(private menuContoller: MenuController,
              private auth: AuthService,
              private database: BasedatosService
              ) { 

                this.auth.stateUser().subscribe( res => {
                  if(res){
                     this.getDatosUser(res.uid)
                  }
                });
              }

  ngOnInit() {
    
  }
  
  mostrarMenu(){
    this.menuContoller.open('first');
  }

  getDatosUser(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.database.getDoc<Usuarios>(path,id).subscribe( res => {
      console.log('Datos -> ', res);
      if(res) {
        this.correo = res.correo;
        this.nombre = res.nombre;
        this.rol = res.rol;
      }
    })
  }
  /* con esta funcion se obtienen todos los usuarios
  getUsuarios(){

    this.database.getCollection<Usuarios>('Usuarios').subscribe( res =>{
      console.log('Esta es la lectura',res);
    } )

  }

  */

}
