import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../services/registroservice.service';
import { ToastController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction.service';
import { DatosPage } from '../datos/datos.page';
//import { UserI } from '../models/models';

//import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  credenciales = {
    correo: null,
    password: null,
    nombre: null,
  }

  //formularioLogin : FormGroup;
  //usuarios : Usuario[] = []; 

  constructor( private auth:AuthService,private toastController: ToastController
    ,private alertController: AlertController,
               private navController: NavController, 
               private registroService: RegistroserviceService,
               private fb: FormBuilder,
               private router: Router,
               private interaction: InteractionService) {
                  /*this.formularioLogin = this.fb.group({ 
                    'correo': new FormControl("", Validators.required),
                    'password': new FormControl("", Validators.required),*/
                  }
                
              
  ngOnInit() {
  }

  async Ingresar(){
    this.interaction.showLoading('Ingresando')
    console.log('credenciales->', this.credenciales);
    const res = await this.auth.login(this.credenciales.correo,this.credenciales.password).catch(error=>{
      console.log('error');
      this.showToast(' Usuario o contraseña invalidos');
    })
    if(res ){
      console.log('res->',res);
      const alert = await this.alertController.create({
        header:'Bienvenido ' + this.credenciales.correo,
      });

      //this.showToast('Bienvenido '+ this.credenciales.nombre);
      this.router.navigate(['/inicio']);
      
      await alert.present();
      return;
    }

    

  }
  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg, 
      duration: 2000
    });
    toast.present();
  }

  /*usuario={
    nombre:'',
    email:'',
    password:''
  }*/

 

  /*async Ingresar(){
    var f = this.formularioLogin.value;
    var a = 0;
    this.registroService.getUsuarios().then(async datos=>{
      this.usuarios=datos;
      if (datos.length==0)
      {
          return null;
      }

      for (let obj of this.usuarios){
        if (obj.correoUsuario == f.correo && obj.passUsuario==f.password && obj.categoria=='Pasajero'){
          if(this.formularioLogin.valid){
            const alert = await this.alertController.create({
              header:'Bienvenido ' +obj.categoria+ ' ' +obj.nomUsuario, 
              
            });
            

            a=1;
            console.log('ingresado');
            localStorage.setItem('ingresado', 'true');
            this.navController.navigateRoot('action-sheet');
            //this.showToast(' Bienvenido '+obj.categoria+ ' ' + obj.nomUsuario);

            await alert.present();
            return;
          }


        }
        if(obj.correoUsuario == f.correo && obj.passUsuario==f.password && obj.categoria=='Conductor'){
          if(this.formularioLogin.valid){
            const alert = await this.alertController.create({
              header:'Bienvenido ' +obj.categoria+ ' ' +obj.nomUsuario, 
              
            });

            a=1;
            console.log('ingresado');
            localStorage.setItem('ingresado', 'true');
            this.navController.navigateRoot('alert');
            //this.showToast(' Bienvenido a TellevoApp'+obj.categoria+ ' ' + obj.nomUsuario);
            await alert.present();
            return;
          }

        }

      }
    console.log(a);
    if (a==0){
      this.alertMsg();
    }
  });   
 }

 async alertMsg(){
  const alert = await this.alertController.create({
    header: 'Error..',
    message:'!Los datos ingresados no son correctos',
    buttons: ['Aceptar'],
   
    
  
  });
    await alert.present();
    return;
  }

  onSubmit(){
    console.log('Submit');
    console.log(this.usuarios);
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg, 
      duration: 2000
    });
    toast.present();
  }


*/
}
