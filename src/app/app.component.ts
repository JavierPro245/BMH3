import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseauthService } from './services/firebaseauth.service';
import { Usuarios } from './interfaces/model';
import { BasedatosService } from './services/basedatos.service';
import { Subscription } from 'rxjs';
interface Componente{
  icon:string;
  name:string;
  redirectTo:string;
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  uid: string = '';

  usuario : Usuarios = { 
    uid: '',
    //imagen: string;
    nombre: '',
    correo: '',
    password: '',
    confirmaPass: '',
    rol: '',
  };

  suscriberUserInfo: Subscription;
  public appPages = [
    { title: 'Mi cuenta', url: '/mi-cuenta', icon: 'person-circle' },
    { title: 'Historial de viaje', url: '/historial-viaje', icon: 'timer' },
    { title: 'Solicitar transporte', url: '/solicidudes-viajes', icon: 'car-sport' },
  ];
  constructor(private router: Router,
              private firebaseauthService: FirebaseauthService,
              private firestore: BasedatosService) { 
                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res !== null){
                    this.uid = res.uid;
                    this.getUserInfo(this.uid);
                  }else{
                    this.initCliente();
                  }
                });
              }

  componentes : Componente[] = [
    {
      icon: 'person-circle',
      name: 'Mi Cuenta',
      redirectTo: '/cuenta'
  
    },
    {
      icon: 'timer',
      name: 'Historial de viaje',
      redirectTo: '/historial-viaje'
  
    },
    {
      icon: 'car-sport',
      name: 'transportes',
      redirectTo: '/vehiculo'
  
    },
  
  ];

  cerrarSesion(){
    localStorage.removeItem('ingresado');
    this.firebaseauthService.logout();
    // this.interaction.Alerta('Sesion Cerrada');
    this.router.navigate(['/login']);
    this.suscriberUserInfo.unsubscribe();
  }
  //navController:NavController esto iba dentro del cerrar sesion
  getUserInfo(uid: string) {
    const path = 'Usuarios';
    this.suscriberUserInfo = this.firestore.getDoc<Usuarios>(path, uid).subscribe(res => {
      this.usuario = res;
    });
  }

  initCliente(){ 
    this.uid = '';
    this.usuario = { 
    uid: '',
    //imagen: string;
    nombre: '',
    correo: '',
    password: '',
    confirmaPass: '',
    rol: '',
    };
  }
}
