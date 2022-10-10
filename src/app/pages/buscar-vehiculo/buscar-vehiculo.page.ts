import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ServicesdatosService, Datos } from 'src/app/services/servicesdatos.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
@Component({
  selector: 'app-buscar-vehiculo',
  templateUrl: './buscar-vehiculo.page.html',
  styleUrls: ['./buscar-vehiculo.page.scss'],
})
export class BuscarVehiculoPage implements OnInit {

  datos : Datos[] = [];
  newDato: Datos = <Datos>{};
  @ViewChild('myList') myList: IonList;


  constructor(private menuController: MenuController, 
              private serviceDatos: ServicesdatosService, 
              private plt: Platform, 
              private toastController: ToastController) {
                this.plt.ready().then(()=>{ 
                  this.loadDatos();
                })
              }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
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

}
