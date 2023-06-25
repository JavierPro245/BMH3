import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { BasedatosService } from '../services/basedatos.service';
import { Usuarios } from '../interfaces/model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta-chofer',
  templateUrl: './cuenta-chofer.page.html',
  styleUrls: ['./cuenta-chofer.page.scss'],
})
export class CuentaChoferPage implements OnInit {
  uid: string = '';

  usuario : Usuarios = { 
    uid: '',
    //imagen: string;
    nombre: '',
    correo: '',
    password: '',
    confirmaPass: '',
    rol: '',
    discapacidad: 'N/A',
  };

  suscriberUserInfo: Subscription;
  constructor(private firebaseauthService: FirebaseauthService,
              private firestore: BasedatosService,
              private router: Router) { 
                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res !== null){
                    this.uid = res.uid;
                    this.getUserInfo(this.uid);
                  }else{
                    this.initCliente();
                  }
                });
              }

  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
  }

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
    discapacidad: 'N/A',
    };
  }

}
