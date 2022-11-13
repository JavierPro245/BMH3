import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from 'src/app/services/registroservice.service';
import { ToastController } from '@ionic/angular';
import { 
  FormGroup,
  FormControl,
  Validators,
  FormBuilder} from '@angular/forms';
import { BasedatosService } from 'src/app/services/basedatos.service';
import { Usuarios } from 'src/app/interfaces/model';
import { InteractionService } from 'src/app/services/interaction.service';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  Usuarios: Usuarios = {
    rol: '',
    nombre: '',
    correo: '',
    password: '',
    confirmaPass: '',
    id: '',
    
}


  formularioRegistro: FormGroup;
  newUsuario: Usuario = <Usuario>{};
  

  constructor(private registroService: RegistroserviceService,
              private alertController: AlertController, 
              private database: BasedatosService,
              private interaction: InteractionService,
              private navController: NavController,
              private fb:FormBuilder) { 
                  this.formularioRegistro = this.fb.group({
                      'rol': new FormControl("", Validators.required),
                      'nombre': new FormControl("",[Validators.required, Validators.minLength(3)]),
                      'correo': new FormControl("",[Validators.required, Validators.email, Validators.minLength(7)]),
                      'password': new FormControl("",[Validators.required, Validators.minLength(6)]),
                      'confirmaPass': new FormControl("",[Validators.required, Validators.minLength(6)])
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
     
      this.Usuarios = {
        rol: form.rol,
        nombre: form.nombre,
        correo: form.correo,
        password: form.password,
        confirmaPass: form.confirmaPass,
        id: '',
        
    }
     this.newUsuario.rol = form.rol;
     this.newUsuario.nomUsuario = form.nombre,
     this.newUsuario.correoUsuario = form.correo, 
     this.newUsuario.passUsuario=form.password, 
     this.newUsuario.repassUsuario=form.confirmaPass
     if(this.newUsuario.passUsuario == this.newUsuario.repassUsuario){
      this.interaction.presentLoading('Creando Usuario...')
      const path = 'Usuarios'
      const id = this.database.getId();
      this.Usuarios.id = id;
      this.database.createDoc(this.Usuarios,path, id).then( () => {

      });
      this.registroService.addDatos(this.newUsuario).then(dato => { 
      this.newUsuario = <Usuario>{};
      this.interaction.closeLoading();
      this.interaction.Alerta('Usuario Creado Exitosamente');  
      this.navController.navigateRoot('login');
    }); 
    }else{
      const alert = await this.alertController.create({
        header: 'Contraseña Incorrecta',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
      return;
     
    }
     
  }

  
/*
  async showToast(msg){
    const toast = await this.toastController.create({
      icon: 'person',
      message: msg, 
      duration: 2000
    });
    toast.present();
  }
   */




}
