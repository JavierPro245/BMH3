import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestorageService } from '../services/firestorage.service';
import { BasedatosService } from '../services/basedatos.service';
import { Usuarios } from '../interfaces/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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
  constructor(private menuContoller: MenuController,
              private firebaseauthService: FirebaseauthService,
              private FirestorageService: FirestorageService,
              private firestore: BasedatosService) { 
                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res !== null){
                    this.uid = res.uid;
                    this.getUserInfo(this.uid);
                  }
                });
              }

  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
    console.log("UID", uid);
  }
  
  mostrarMenu(){
    this.menuContoller.open('first');
  }

  getUserInfo(uid: string) {
    const path = 'Usuarios';
    this.suscriberUserInfo = this.firestore.getDoc<Usuarios>(path, uid).subscribe(res => {
      this.usuario = res;
    });
  }

}
