import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesdatosService, Datos } from 'src/app/services/servicesdatos.service';
import { Platform, ToastController, IonList, MenuController } from '@ionic/angular';
import { BasedatosService } from 'src/app/services/basedatos.service';
import { Vehiculo, Usuarios } from 'src/app/interfaces/model';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { VehiculoPage } from '../vehiculo/vehiculo.page';



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
  titulo = 'Registrar Vehículo'
  id: string | undefined;



  @ViewChild('myList') myList: IonList;

  listVehiculo: Vehiculo[] = [];



  form: FormGroup;
  loading = false;
  newFile = '';
  newImage = '';


  vehiculo: Vehiculo = {
    patente: '',
    marca: '',
    modelo: '',
    year: 0,
    capacidad: 0,
    chofer: '',
    fechaCreacion: null,
    fechaActualizacion: null
  }

  constructor(private menuController: MenuController, 
              private serviceDatos: ServicesdatosService, 
              private plt: Platform, 
              private database: BasedatosService,
              private auth: AuthService,
              private interaction: InteractionService,
              private toastController: ToastController,
              private firestorageService: FirestorageService,  
              private fb: FormBuilder) {
              

                this.form =this.fb.group({
                  'patente': new FormControl('',[Validators.required, Validators.minLength(6)]),
                  'marca': new FormControl('',[Validators.required, Validators.minLength(3)]),
                  'modelo': new FormControl('',[Validators.required, Validators.minLength(3)]),
                  'año': new FormControl('',[Validators.required, Validators.maxLength(4)]),
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
      this.titulo = 'Editar Vehículo';
      this.form.patchValue({
        patente: data.patente,
        marca: data.marca,
        modelo: data.modelo,
        año: data.year,
        capacidad: data.capacidad
      })
    })
  }
  
  //metodo que llama a la funcion agregar o editar vehiculo funcion principal

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
  async agregarVehiculo(){
    this.vehiculo = {
      patente: this.form.value.patente,
      marca: this.form.value.marca,
      modelo: this.form.value.modelo ,
      year: this.form.value.año,
      capacidad: this.form.value.capacidad,
      chofer: this.chofer,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    console.log('Los datos a ingresar son:', this.vehiculo);
    this.database.guardarVehiculo(this.vehiculo).then(() => {
      this.loading = false;
      console.log('Vehículo ingresado');
      
      this.form.reset();
    }, error => {
      this.loading = false;
      console.log('No se pudo ingresar Vehículo', error);
    })
  }
  //trae los valores para ser modificados
  editarVehiculos(id: string) {
    this.vehiculo = {
      patente: this.form.value.patente,
      marca: this.form.value.marca,
      modelo: this.form.value.modelo ,
      year: this.form.value.año,
      capacidad: this.form.value.capacidad,
      chofer: this.chofer,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this.database.editarVehiculo(id,this.vehiculo).then(() =>{
      this.loading = false;
      this.titulo = 'Registrar Vehículo';
      this.form.reset();
      this.id = undefined;
      this.interaction.Alerta('Vehículo Modificado');
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
    await this.interaction.presentLoading('Eliminando vehículo')
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




//estos son los metodos alternativos los principales estan arriba

  async crearVehiculo(){
     await this.interaction.presentLoading('Registrando vehículo...');
    const vehiculo: Vehiculo = {
        patente: 'HHPJ68',
        marca: 'NISSAN',
        modelo: '307',
        year: 2015,
        capacidad: 5,
        chofer: this.chofer,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      }
      const path = 'Vehiculos'
      
      this.database.createDoc(vehiculo,path,'jaja');
      await this.interaction.closeLoading();
      this.interaction.Alerta('Vehículo ingresado exitosamente');
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
        capacidad: 5,
        chofer: this.chofer,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      }
      const path = 'Vehiculos'
      const id = this.database.getId();
      this.database.createDoc(vehiculo,path,id);
      this.interaction.Alerta('¡Datos Agregados!');
    }
  

  async showToast(msg){
    const toast = await this.toastController.create({ 
      message : msg,
      duration: 2000
    });
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
