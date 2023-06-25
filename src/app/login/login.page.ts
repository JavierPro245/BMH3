import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { BasedatosService } from '../services/basedatos.service';
import { Usuarios } from '../interfaces/model';
import { Subscription } from 'rxjs';
import { InteractionService } from '../services/interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  uid: string = '';

  credenciales = {
    correo: null,
    password: null
  };


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

  ingresarEnable = false;

  constructor(private MenuControler: MenuController,
              private firebaseauthService: FirebaseauthService,
              private firestore: BasedatosService,
              private interaction: InteractionService,
              private router: Router,) { 
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

  async Ingresar() {
    await this.interaction.presentLoading('Ingresando....');
    console.log('Credenciales ->', this.credenciales);
    const res = await this.firebaseauthService.login(this.credenciales.correo,this.credenciales.password).catch( error => {
      console.log('Error')
      this.interaction.closeLoading();
      this.interaction.Alerta('Usuario o contraseña invalido');
    })
    if(res){
      console.log('res ->', res);
    
      this.interaction.closeLoading();
      this.interaction.Alerta('Ingresado exitosamente');
      localStorage.setItem('ingresado', 'true');
      this.router.navigate(['/home'])
    }
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
