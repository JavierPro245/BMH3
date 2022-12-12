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
import { AuthService } from 'src/app/services/auth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  res= null
  Usuarios: Usuarios = {
    rol: null,
    imagen: '',
    nombre: null,
    correo: null,
    password: null,
    confirmaPass: null,
    id: null,

}
  newImage = '';
  newFile = '';
  constructor(private registroService: RegistroserviceService,
              private alertController: AlertController, 
              private database: BasedatosService,
              private auth: AuthService,
              private interaction: InteractionService,
              private navController: NavController,
              private firestorageService: FirestorageService){

              }


  ngOnInit() {
  }

  async CrearUsuario(){

        console.log('Datos ->', this.Usuarios);
        

        if(this.Usuarios.password != this.Usuarios.confirmaPass){
          const alert = await this.alertController.create({
          header: 'Contraseña Incorrecta',
          message: 'Las contraseñas no coinciden',
          buttons: ['Aceptar'],
        });
    
        await alert.present();
        return;
        }else{

          this.res = await this.auth.registrarUser(this.Usuarios).catch( error =>{
            console.log('Error');
          });
          this.interaction.presentLoading('Creando Usuario...')
          console.log('Usuario Creado');
          const path = 'Usuarios'
          const id = this.res.user.uid;
          this.Usuarios.id= id;
          this.Usuarios.password= null;
          this.Usuarios.confirmaPass= null;

          const paths = 'Img_Usuarios';
          const name = this.Usuarios.nombre;
          const res = await this.firestorageService.uploadImage(this.newFile, paths, name);
          this.Usuarios.imagen = res;
          await this.database.createDoc(this.Usuarios,path, id);
          this.interaction.closeLoading();
          this.interaction.Alerta('Usuario Creado Exitosamente');  
          this.navController.navigateRoot('login');
        }

    }

    
  async newImageUpload(event: any){
    if (event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
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