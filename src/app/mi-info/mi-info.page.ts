import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { BasedatosService } from '../services/basedatos.service';
import { Subscription } from 'rxjs';
import { Usuarios } from '../interfaces/model';

@Component({
  selector: 'app-mi-info',
  templateUrl: './mi-info.page.html',
  styleUrls: ['./mi-info.page.scss'],
})
export class MiInfoPage implements OnInit {
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
  constructor(private firebaseauthService: FirebaseauthService,
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
    };
  }

}
