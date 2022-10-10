import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from 'src/app/services/registroservice.service';
import { ToastController } from '@ionic/angular';
import { 
  FormGroup,
  FormControl,
  Validators,
  FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  formularioRegistro: FormGroup;
  newUsuario: Usuario = <Usuario>{};

  constructor(private registroService: RegistroserviceService,
              private alertController: AlertController, 
              private toastController: ToastController,
              private fb:FormBuilder) { 
                  this.formularioRegistro = this.fb.group({
                      'nombre': new FormControl("", Validators.required),
                      'correo': new FormControl("", Validators.required),
                      'password': new FormControl("", Validators.required),
                      'confirmaPass': new FormControl("", Validators.required)
            });
          }


  ngOnInit() {
  }

  async CrearUsuario(){
    //console.log('Guardar');
   var form= this.formularioRegistro.value;
   if (this.formularioRegistro.invalid){
       const alert = await this.alertController.create({
         header: 'Datos Incompletos',
         message: 'Debe completar todos los datos',
         buttons: ['Aceptar'],
       });
   
       await alert.present();
       return;
     }

     this.newUsuario.nomUsuario = form.nombre,
     this.newUsuario.correoUsuario = form.correo, 
     this.newUsuario.passUsuario=form.password, 
     this.newUsuario.repassUsuario=form.confirmaPass
     this.registroService.addDatos(this.newUsuario).then(dato => { 
       this.newUsuario = <Usuario>{};
       this.showToast('!Datos Agregados');  
     }); 
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg, 
      duration: 2000
    });
    toast.present();
  }
}
