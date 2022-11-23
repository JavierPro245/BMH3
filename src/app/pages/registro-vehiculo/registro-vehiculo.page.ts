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
  titulo = 'Registrar Vehiculo'
  id: string | undefined;



  @ViewChild('myList') myList: IonList;

  listVehiculo: Vehiculo[] = [];



  form: FormGroup;
  loading = false;

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
    this.obtenerVehiculo();
    //para rellenar el formulario y con la info a modificar se hace todo esto
    this.database.getVehiculoEdit().subscribe(data => {
      console.log(data);
      this.id = data.id;
      this.titulo = 'Editar Vehiculo';
      this.form.patchValue({
        patente: data.patente,
        marca: data.marca,
        modelo: data.modelo,
        año: data.year,
        color: data.color,
        capacidad: data.capacidad
      })
    })
  }
  
  //metodo que llama a la funcion agregar o editar vehiculo

  guardarVehiculo(){

    if(this.id === undefined){
      //creamos un nuevo vehiculo
      this.agregarVehiculo();

    }else {
      //editamos un vehiculo
      this.editarVehiculos(this.id);

    }

  }
  //metodo que crea el vehiculo
  agregarVehiculo(){
    const vehiculo: Vehiculo = {
      patente: this.form.value.patente,
      marca: this.form.value.marca,
      modelo: this.form.value.modelo ,
      year: this.form.value.año,
      color: this.form.value.color,
      capacidad: this.form.value.capacidad,
      chofer: this.chofer,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    console.log('Los datos a ingresar son:', vehiculo);
    this.database.guardarVehiculo(vehiculo).then(() => {
      this.loading = false;
      console.log('Vehiculo Ingresado');
      
      this.form.reset();
    }, error => {
      this.loading = false;
      console.log('No se pudo Ingresar Vehiculo', error);
    })
  }
  //trae los valores para ser modificados
  editarVehiculos(id: string) {
    const vehiculo: any = {
      patente: this.form.value.patente,
      marca: this.form.value.marca,
      modelo: this.form.value.modelo ,
      year: this.form.value.año,
      color: this.form.value.color,
      capacidad: this.form.value.capacidad,
      chofer: this.chofer,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this.database.editarVehiculo(id,vehiculo).then(() =>{
      this.loading = false;
      this.titulo = 'Registrar Vehiculo';
      this.form.reset();
      this.id = undefined;
      this.interaction.Alerta('Vehiculo Modificado');
    }, error => {
      console.log(error);
    })
  }



  obtenerVehiculo(){
    this.database.obtenerVehiculos().subscribe(doc => {
      this.listVehiculo = [];
      doc.forEach((element: any) => {
        this.listVehiculo.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
        /*Accediendo a todos los id de firestore
        console.log(element.payload.doc.id);
        console.log(element.payload.doc.data());
        */
      });
      console.log(this.listVehiculo);
    })
  }
  //cuando el metodo retorne una promise se debe hacer un them al momento de utilizarlo
  async eliminarVehiculo(id: any){
    await this.interaction.presentLoading('Eliminando Vehiculo')
    this.database.eliminarVehiculo(id).then(() => {
      this.interaction.closeLoading();
    }, error  => {
      this.interaction.Alerta('Opps... Ocurrio un error');
      console.log(error);
    })
  }

  editarVehiculo(vehiculo: Vehiculo){
    this.database.addVehiculoEdit(vehiculo);
  }






//estos son los metodos alternativos los principales estan arriba

  async crearVehiculo(){
     await this.interaction.presentLoading('Registrando Vehiculo...');
    const vehiculo: Vehiculo = {
        patente: 'HHPJ68',
        marca: 'NISSAN',
        modelo: '307',
        year: 2015,
        color: 'Blanco',
        capacidad: 5,
        chofer: this.chofer,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
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
        chofer: this.chofer,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
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
