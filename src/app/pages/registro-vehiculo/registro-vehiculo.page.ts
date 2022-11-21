import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesdatosService, Datos } from 'src/app/services/servicesdatos.service';
import { Platform, ToastController, IonList, MenuController } from '@ionic/angular';
import { BasedatosService } from 'src/app/services/basedatos.service';
import { Vehiculo, Usuarios } from 'src/app/interfaces/model';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms';
@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './registro-vehiculo.page.html',
  styleUrls: ['./registro-vehiculo.page.scss'],
})
export class RegistroVehiculoPage implements OnInit {
  correo: string = '';
  chofer = localStorage.getItem('nombre');
  datos : Datos[] = [];
  newDato: Datos = <Datos>{};
  @ViewChild('myList') myList: IonList;

  form: FormGroup;


  constructor(private menuController: MenuController, 
              private serviceDatos: ServicesdatosService, 
              private plt: Platform, 
              private database: BasedatosService,
              private auth: AuthService,
              private interaction: InteractionService,
              private toastController: ToastController,
              private fb: FormBuilder) {
              

                this.form =this.fb.group({
                  'patente': new FormControl('',[Validators.required, Validators.minLength(6)]),
                  'marca': new FormControl('',[Validators.required, Validators.minLength(3)]),
                  'modelo': new FormControl('',[Validators.required, Validators.minLength(3)]),
                  'año': new FormControl('',[Validators.required, Validators.maxLength(4)]),
                  'color': new FormControl('',[Validators.required, Validators.minLength(3)]),
                  'capacidad': new FormControl('',[Validators.required, Validators.maxLength(2)]),
                });



              this.plt.ready().then(()=>{ 
                this.loadDatos();
              });

              this.auth.stateUser().subscribe( res => {
                if(res){
                   this.getDatosUser(res.uid)
                }
              });
    }

  ngOnInit() {
    
  }
  
  registrarVehiculo(){
    const vehiculo: Vehiculo = {
      patente: this.form.value.patente,
      marca: this.form.value.marca,
      modelo: this.form.value.modelo ,
      year: this.form.value.año,
      color: this.form.value.color,
      capacidad: this.form.value.capacidad,
      chofer: this.chofer
    }
    console.log('Los datos a ingresar son:', vehiculo);
    this.database.guardarVehiculo(vehiculo).then(() => {
      console.log('Vehiculo Ingresado');
    }, error => {
      console.log('No se pudo Ingresar Vehiculo', error)
    })
  }

  async crearVehiculo(){
     await this.interaction.presentLoading('Registrando Vehiculo...')
    const vehiculo: Vehiculo = {
        patente: 'HHPJ68',
        marca: 'NISSAN',
        modelo: '307',
        year: 2015,
        color: 'Blanco',
        capacidad: 5,
        chofer: this.chofer
      }
      const path = 'Vehiculos'
      
      this.database.createDoc(vehiculo,path,'jaja');
      await this.interaction.closeLoading();
      this.interaction.Alerta('Vehiculo Ingresado Exitosamente');
    }
    


  //invocamos al método getDatos() del servicio
  loadDatos(){
    this.serviceDatos.getDatos().then(datos=>{ 
      this.datos = datos;
    })
  }

  //creamos un objeto del tipo interface Datos, invocamos al método del servicio
  async addDatos(){
    
      const vehiculo: Vehiculo = {
        patente: 'YW3357',
        marca: 'Peugeot',
        modelo: '307',
        year: 2005,
        color: 'Blanco',
        capacidad: 5,
        chofer: this.chofer
      }
      const path = 'Vehiculos'
      const id = this.database.getId();
      this.database.createDoc(vehiculo,path,id);
      this.interaction.Alerta('Datos Agregados!');
    }
  

  async showToast(msg){
    const toast = await this.toastController.create({ 
      message : msg,
      duration: 2000
    })
    toast.present();
  }

   //update
   updateDatos(dato: Datos ){
    dato.color = `UPDATED: ${dato.color}`;
    dato.modified = Date.now();
    this.serviceDatos.updateDatos(dato).then(item=>{
      this.showToast('¡Vehículo actualizado!')
      this.myList.closeSlidingItems();
      this.loadDatos();
    });
  } 

  //delete
  deleteDatos(dato: Datos){
    this.serviceDatos.deleteDatos(dato.patente).then(item=>{
      this.showToast('¡Vehículo eliminado!');
      this.myList.closeSlidingItems();
      this.loadDatos();
    });
  }


  /*datos usuario */
  getDatosUser(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.database.getDoc<Usuarios>(path,id).subscribe( res => {
      if(res) {
        this.correo = res.correo;
        this.chofer = res.nombre;
      }
    });
  }
}
