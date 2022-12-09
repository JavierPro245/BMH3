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

  credenciales = {
    correo: null,
    password: null
  }



  usuarios : Usuario[] = []; 

  constructor( private alertController: AlertController, 
               private navController: NavController, 
               private registroService: RegistroserviceService,
               private auth: AuthService,
               private interaction: InteractionService,
               private fb: FormBuilder,
               private router: Router,
               private storage:Storage) {
                 
                }
              
  ngOnInit() {
  }

  async Ingresar(){
    await this.interaction.presentLoading('Ingresando....');
    console.log('Credenciales ->', this.credenciales);
    const res = await this.auth.login(this.credenciales.correo,this.credenciales.password).catch( error => {
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
 async alertMsg(){
  const alert = await this.alertController.create({
    header: 'Error..',
    message:'¡Los datos ingresados no son correctos!',
    buttons: ['Aceptar'],
  });
    await alert.present();
    return;
    
  }


}
