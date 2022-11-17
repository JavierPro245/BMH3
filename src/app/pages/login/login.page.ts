import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from 'src/app/services/registroservice.service';
import { HomePage } from '../home/home.page';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // rescato desde html el input #username
  @ViewChild('correo') correo;
  // rescato desde html el input #password
  @ViewChild('password') password;
  
  credenciales = {
    correo: null,
    password: null
  }



  formularioLogin : FormGroup;
  usuarios : Usuario[] = []; 

  constructor( private alertController: AlertController, 
               private navController: NavController, 
               private registroService: RegistroserviceService,
               private auth: AuthService,
               private interaction: InteractionService,
               private fb: FormBuilder,
               private router: Router,
               private storage:Storage) {
                  this.formularioLogin = this.fb.group({ 
                    'correo': new FormControl("", Validators.required),
                    'password': new FormControl("", Validators.required),
                  })
                }
              
  ngOnInit() {
  }

  async Ingresar(){
    await this.interaction.presentLoading('Ingresando....');
    console.log('Credenciales ->', this.credenciales);
    const res = await this.auth.login(this.credenciales.correo,this.credenciales.password).catch( error => {
      console.log('Error')
      this.interaction.closeLoading();
      this.interaction.Alerta('Usuario o Contraseña invalido');
    })
    if(res){
      console.log('res ->', res)
      this.interaction.closeLoading();
      this.interaction.Alerta('Ingresado Exitosamente');
      this.router.navigate(['/home'])
    }

    var f = this.formularioLogin.value;
    var a = 0;
    this.registroService.getUsuarios().then(datos=>{
      this.usuarios=datos;
      if (datos.length==0)
      {
          return null;
      }

      for (let obj of this.usuarios){
        if (obj.correoUsuario == f.correo && obj.passUsuario==f.password){
            a=1;
            console.log('ingresado');
            localStorage.setItem('ingresado', 'true');
            localStorage.setItem('nombre',obj.nomUsuario);
            localStorage.setItem('correo',obj.correoUsuario);
            localStorage.setItem('rolUsuario', obj.rol);
            this.navController.navigateRoot('home');
            console.log(obj.nomUsuario);  
              
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


}
