import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, MenuController, NavController } from '@ionic/angular';
import { ServicesdatosService, Datos } from 'src/app/services/servicesdatos.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { BasedatosService } from 'src/app/services/basedatos.service';
import { Reserva, Vehiculo } from 'src/app/interfaces/model';
import { OverlayEventDetail } from '@ionic/core/components';
import { InteractionService } from 'src/app/services/interaction.service';
import { PickerController } from '@ionic/angular';
@Component({
  selector: 'app-buscar-vehiculo',
  templateUrl: './buscar-vehiculo.page.html',
  styleUrls: ['./buscar-vehiculo.page.scss'],
  
})
export class BuscarVehiculoPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  public data = ['Maipú', 'Providencia', 'Santiago'];
  public results = [...this.data];

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
  }
  comuna: '';
  loading = false;
  listVehiculo: Vehiculo[] = [];
  listVehiculos: Vehiculo[] = [];

  datos : Datos[] = [];
  newDato: Datos = <Datos>{};
  @ViewChild('myList') myList: IonList;
  res= null;
  Reserva: Reserva = {
    comuna: '',
    destino: '',
    capacidad: 0,
    pasajero: localStorage.getItem('nombre'),
    pago: '',
    fechaReserva: new Date(),

}

  constructor(private menuController: MenuController, 
              private serviceDatos: ServicesdatosService, 
              private plt: Platform,
              private database: BasedatosService, 
              private navCtrl: NavController,
              private interaction: InteractionService,
              private pickerCtrl: PickerController,
              private toastController: ToastController) {
                this.plt.ready().then(()=>{ 
                  this.loadDatos();
                })
              }

  ngOnInit() {
    this.obtenerVehiculo();
  }

  mostrarMenu(){
    this.menuController.open('first');
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

  async generarReserva(){
  
    this.loading = true;
    this.database.formatDate(this.Reserva.fechaReserva);
    this.database.guardarReserva(this.Reserva).then(() => {
      this.loading = false;
      console.log('Reserva ingresada');
    }, error => {
      this.loading = false;
      console.log('No se pudo ingresar Reserva', error);
    })
  }

  async openPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'comunas',
          options: [
            {
              text: 'Cerrillos',
              value: 'Cerrillos',
            },
            {
              text: 'Cerro Navia',
              value: 'Cerro Navia',
            },
            {
              text: 'Conchalí',
              value: 'Conchalí',
            },
            {
              text: 'El Bosque',
              value: 'El Bosque',
            },
            {
              text: 'Estación Central',
              value: 'Estación Central,',
            },
            {
              text: 'Huechuraba',
              value: 'Huechuraba',
            },
            {
              text: 'Independencia',
              value: 'Independencia',
            },
            {
              text: 'La Cisterna',
              value: 'La Cisterna',
            },
            {
              text: 'La Florida',
              value: 'La Florida',
            },
            {
              text: 'La Granja',
              value: 'La Granja',
            },
            {
              text: 'La Pintana',
              value: 'La Pintana',
            },
            {
              text: 'La Reina',
              value: 'La Reina',
            },
            {
              text: 'Las Condes',
              value: 'Las Condes',
            },
            {
              text: 'Lo Barnechea',
              value: 'Lo Barnechea',
            },
            {
              text: 'Lo Espejo',
              value: 'Lo Espejo',
            },
            {
              text: 'Lo Prado',
              value: 'Lo Prado',
            },
            {
              text: 'Macul',
              value: 'Macul',
            },
            {
              text: 'Maipú',
              value: 'Maipú',
            },
            {
              text: 'Ñuñoa',
              value: 'Ñuñoa',
            },
            {
              text: 'Pedro Aguirre Cerda',
              value: 'Pedro Aguirre Cerda',
            },
            {
              text: 'Peñalolén',
              value: 'Peñalolén',
            },
            {
              text: 'Providencia',
              value: 'Providencia',
            },
            {
              text: 'Pudahuel',
              value: 'Pudahuel',
            },
            {
              text: 'Quilicura',
              value: 'Quilicura',
            },
            {
              text: 'Quinta Normal',
              value: 'Quinta Normal',
            },
            {
              text: 'Recoleta',
              value: 'Recoleta',
            },
            {
              text: 'Renca',
              value: 'Renca',
            },
            {
              text: 'San Joaquín',
              value: 'San Joaquín',
            },
            {
              text: 'San Miguel',
              value: 'San Miguel',
            },
            {
              text: 'San Ramón',
              value: 'San Ramón',
            },
            {
              text: 'Santiago',
              value: 'Santiago',
            },
            {
              text: 'Vitacura',
              value: 'Vitacura',
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            window.alert(`You selected: ${value.comunas.value}`);
            this.Reserva.comuna = value.comunas.value
          },
        },
      ],
    });

    await picker.present();
  }


  //invocamos al método getDatos() del servicio
  loadDatos(){
    this.serviceDatos.getDatos().then(datos=>{ 
      this.datos = datos;
    })
  }

  //creamos un objeto del tipo interface Datos, invocamos al método del servicio
  addDatos(){
    this.newDato.modified=Date.now();
    this.serviceDatos.addDatos(this.newDato).then(dato => { 
      this.newDato = <Datos>{};
      this.showToast('Datos Agregados!');
      this.loadDatos();
    })
  }

  async showToast(msg){
    const toast = await this.toastController.create({ 
      message : msg,
      duration: 2000
    })
    toast.present();
  }

  //modal
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.generarReserva();
    this.interaction.Alerta('Reservado exitosamente');  
    this.navCtrl.navigateRoot('/pasajero-reserva');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role == 'confirm') {
      this.navCtrl.navigateRoot('/pasajero-reserva');
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


   //update
   /*
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

  
*/



}
