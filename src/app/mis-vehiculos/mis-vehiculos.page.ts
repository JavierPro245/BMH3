import { Component, OnInit, ViewChild } from '@angular/core';
import { Vehiculo } from '../interfaces/model';
import { Datos } from '../services/servicedatos.service';
import { IonList, MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { BasedatosService } from '../services/basedatos.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-mis-vehiculos',
  templateUrl: './mis-vehiculos.page.html',
  styleUrls: ['./mis-vehiculos.page.scss'],
})
export class MisVehiculosPage implements OnInit {
  loading = false;
  listVehiculo: Vehiculo[] = [];
  listVehiculos: Vehiculo[] = [];

  datos : Datos[] = [];
  newDato: Datos = <Datos>{};
  @ViewChild('myList') myList: IonList;
  res= null;
  constructor(private menuController: MenuController, 
              private plt: Platform,
              private database: BasedatosService, 
              private navCtrl: NavController,
              private interaction: InteractionService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.obtenerVehiculo();
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

  // editarVehiculos(id: string) {
  //   this.vehiculo = {
  //     patente: this.form.value.patente,
  //     marca: this.form.value.marca,
  //     modelo: this.form.value.modelo ,
  //     year: this.form.value.año,
  //     capacidad: this.form.value.capacidad,
  //     chofer: this.chofer,
  //     fechaActualizacion: new Date()
  //   }
  //   this.loading = true;
  //   this.database.editarVehiculo(id,this.vehiculo).then(() =>{
  //     this.loading = false;
  //     this.titulo = 'Registrar Vehículo';
  //     this.form.reset();
  //     this.id = undefined;
  //     this.interaction.Alerta('Vehículo Modificado');
  //   }, error => {
  //     console.log(error);
  //   })
  // }

  async eliminarVehiculo(id: any){
    await this.interaction.presentLoading('Eliminando vehículo')
    this.database.eliminarVehiculo(id).then(() => {
      this.interaction.closeLoading();
    }, error  => {
      this.interaction.Alerta('Opps... Ocurrio un error');
      console.log(error);
    })
  }

}

