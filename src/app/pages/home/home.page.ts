import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BasedatosService } from 'src/app/services/basedatos.service';
import { Usuarios } from 'src/app/interfaces/model';
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
  nombre= localStorage.getItem("nombre")
  constructor(private menuContoller: MenuController,
              
              ) { 
   
  }

  ngOnInit() {
    
  }
  
  mostrarMenu(){
    this.menuContoller.open('first');
  }


  /* con esta funcion se obtienen todos los usuarios
  getUsuarios(){

    this.database.getCollection<Usuarios>('Usuarios').subscribe( res =>{
      console.log('Esta es la lectura',res);
    } )

  }

  */

}
