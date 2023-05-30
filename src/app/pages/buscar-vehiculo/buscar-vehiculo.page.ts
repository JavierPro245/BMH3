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

  constructor(private menuController: MenuController, 
              private serviceDatos: ServicesdatosService, 
              private plt: Platform,
              private database: BasedatosService, 
              private navCtrl: NavController,
              private interaction: InteractionService,
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
  
  confirmarReserva(){
    this.navCtrl.navigateRoot('/confirma-reserva')
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
