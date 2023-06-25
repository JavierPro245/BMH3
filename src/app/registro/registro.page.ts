import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../interfaces/model';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { AlertController, NavController } from '@ionic/angular';
import { InteractionService } from '../services/interaction.service';
import { BasedatosService } from '../services/basedatos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  res=null
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
              private alertController: AlertController,
              private interaction: InteractionService,
              private database: BasedatosService,
              private navController: NavController) { }

  ngOnInit() {

  }

  // async registrar(){
  //   const credenciales = {
  //     email: this.usuario.correo,
  //     password: this.usuario.password,
  //   };
  //   const res = await this.firebaseauthService.registrar(credenciales.email,credenciales.password).catch(err =>{
  //     console.log("Error", err);
  //   });
  //   console.log("Registrado", res);

  //   const uid = await this.firebaseauthService.getUid();
  //   console.log("UID", uid);
  
  // }

  async guardarUser(){
    console.log('Datos ->', this.usuario);
        

    if(this.usuario.password != this.usuario.confirmaPass){
      const alert = await this.alertController.create({
      header: 'Contraseña Incorrecta',
      message: 'Las contraseñas no coinciden',
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;
    }else{

      this.res = await this.firebaseauthService.registrar(this.usuario).catch( error =>{
        console.log('Error');
      });
      this.interaction.presentLoading('Creando Usuario...')
      console.log('Usuario Creado');
      const path = 'Usuarios'
      const id = this.res.user.uid;
      this.usuario.uid= id;
      this.usuario.password= null;
      this.usuario.confirmaPass= null;
      // const paths = 'Img_Usuarios';
      // const name = this.Usuarios.nombre;
      // const res = await this.firestorageService.uploadImage(this.newFile, paths, name);
      // this.Usuarios.imagen = res;
      await this.database.createDoc(this.usuario,path, id);
      this.interaction.closeLoading();
      this.interaction.Alerta('Usuario Creado Exitosamente');  
      this.navController.navigateRoot('login');
    }
  }

}
