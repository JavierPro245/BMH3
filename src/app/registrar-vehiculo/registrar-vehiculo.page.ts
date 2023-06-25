import { Component, OnInit } from '@angular/core';
import { Usuarios, Vehiculo } from '../interfaces/model';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, Platform, ToastController, AlertController, NavController } from '@ionic/angular';
import { BasedatosService } from '../services/basedatos.service';
import { AuthService } from '../services/auth.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-registrar-vehiculo',
  templateUrl: './registrar-vehiculo.page.html',
  styleUrls: ['./registrar-vehiculo.page.scss'],
})
export class RegistrarVehiculoPage implements OnInit {

  correo: string = '';
  chofer = '';
  



  listVehiculo: Vehiculo[] = [];
  res=null
  vehiculo : Vehiculo = {
    id: '',
    patente: '',
    marca: '',
    modelo: '',
    capacidad: 0,
    uid: '',
    chofer: '',
    fechaCreacion: null,
    fechaActualizacion: null,
}

  suscriberUserInfo: Subscription;

  constructor(private menuController: MenuController, 
              private navController : NavController,
              private plt: Platform, 
              private database: BasedatosService,
              private auth: AuthService,
              private interaction: InteractionService,
              private AlertController: AlertController,
              private toastController: ToastController) { 

              this.auth.stateUser().subscribe( res => {
                if(res){
                   this.getDatosUser(res.uid)
                }
              });
              }

  ngOnInit() {
  }

  getDatosUser(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.database.getDoc<Usuarios>(path,id).subscribe( res => {
      if(res) {
        this.correo = res.correo;
        this.vehiculo.uid = res.uid;
        this.vehiculo.chofer = res.nombre;
      }
    });
  }

  async guardarVehiculo(){
    console.log('Datos ->', this.vehiculo);
        

    if(this.vehiculo.patente == '' && this.vehiculo.marca == '' && this.vehiculo.modelo == '' && this.vehiculo.capacidad == 0){
      const alert = await this.AlertController.create({
      header: 'Verificar campos',
      message: 'Llenar todos los campos',
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;
    }else{
      this.interaction.presentLoading('Registrando Vehiculo...')
      console.log('Vehiculo ingresado');
      const path = 'Vehiculos'
      const id = this.database.getId();
      this.vehiculo.fechaCreacion= new Date();
      this.vehiculo.fechaActualizacion= new Date();

      // const paths = 'Img_Usuarios';
      // const name = this.Usuarios.nombre;
      // const res = await this.firestorageService.uploadImage(this.newFile, paths, name);
      // this.Usuarios.imagen = res;
      this.vehiculo.id = id;
      await this.database.createDoc(this.vehiculo,path, id);
      this.interaction.closeLoading();
      this.interaction.Alerta('Vehiculo Creado Exitosamente');  
      this.navController.navigateRoot('/mis-vehiculos');
    }
  }

}
