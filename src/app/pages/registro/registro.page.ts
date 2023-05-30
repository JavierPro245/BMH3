import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../services/registroservice.service';
import { ToastController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

import { UserI } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';

import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  /*newUsuario: Usuario = <Usuario>{};*/
  datos: UserI = {
    uid: null,
    nombre:null,
    correo: null,
    edad: null,
    password: null,
    repasPassword: null,
    perfil: 'conductor',//|'pasajero',

  };

  constructor(private registroService: RegistroserviceService,
              private alertController: AlertController, 
              private toastController: ToastController,
              private fb:FormBuilder,
              private firebaseauthService: FirebaseauthService,
              private auth: AuthService,
              private firestore : FirestoreService,
              private interaction : InteractionService) { 
                  this.formularioRegistro = this.fb.group({
                      'nombre': new FormControl("", Validators.required),
                      'correo': new FormControl("", Validators.required),
                      'password': new FormControl("", Validators.required),
                      'repasPassword': new FormControl("", Validators.required),
                      'perfil':new FormControl("",Validators.required)
                  });
          
                }

  async ngOnInit() {




  }

  async registrar(){
    this.interaction.showLoading('Registrando...')
    console.log('datos ->',this.datos);
    const res = await this.auth.registrarUser(this.datos).catch(error => {
      this.interaction.closeloading();
      //this.interaction.presentToast('error');
      console.log('error');
    })
    if(res){
      console.log('Usuario creado con exito');
      const path = 'Usuarios';
      const id = res.user.uid;
      this.datos.uid = id;
      this.datos.password = null
      await this.firestore.createDoc(this.datos,path,id)
      this.interaction.closeloading();
      this.interaction.presentToast('Registrado con Exito')
    }
    var form= this.formularioRegistro.value;
    if(this.formularioRegistro.invalid){
      //const alert = await this.alertController.create({
       // header: 'Datos Incompletos',
        //message: 'Debe completar todos los datos',
        //buttons: ['Aceptar'],
      //});
      //await alert.present();
      //return ;
    }

    const path = 'Usuarios'

     this.datos.nombre = form.nombre,
     this.datos.correo = form.correo, 
     this.datos.password=form.password, 
     this.datos.repasPassword=form.confirmaPass
     this.datos.perfil=form.categoria
     //this.firestore.createDoc(this.Usuarios)

    

  }





  /*async CrearUsuario(){

    //console.log('Guardar');
   var form= this.formularioRegistro.value;
   if (this.formularioRegistro.invalid){      
       const alert = await this.alertController.create({
        
         header: 'Datos Incompletos',
         message: 'Debe completar todos los datos',
         buttons: ['Aceptar'],
        
       });
   
       await alert.present();
       return ;
     }

     //if(this.formularioRegistro.valid){
      //const alert = await this.alertController.create({
        //header: 'Registro con exito',
        //message: 'Te hemos enviado un mensaje a tu corre.',
        //buttons: ['ACEPTAR']
      //});
      //await alert.present();
      //return;
     //}

     this.newUsuario.nomUsuario = form.nombre,
     this.newUsuario.correoUsuario = form.correo, 
     this.newUsuario.passUsuario=form.password, 
     this.newUsuario.repassUsuario=form.confirmaPass
     this.newUsuario.categoria=form.categoria
     this.registroService.addDatos(this.newUsuario).then(dato => {
       
      if(form.passUsuario == form.repassUsuario){
        this.newUsuario = <Usuario>{};
        this.showToast('!!! Registro con exito !!!');
       }
       else{this.showToast('Contraseñas no son iguales')} 
     });
     

     

 }

 async showToast(msg){
  const toast = await this.toastController.create({
    message: msg, 
    duration: 2000
  });
  toast.present();
}*/



}
