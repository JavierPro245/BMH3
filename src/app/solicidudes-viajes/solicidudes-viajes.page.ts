import { Component, OnInit, ViewChild } from '@angular/core';
import { Historial, Solicitud, Usuarios } from '../interfaces/model';
import { Datos } from '../services/servicedatos.service';
import { AlertController, IonList, IonModal, NavController } from '@ionic/angular';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { InteractionService } from '../services/interaction.service';
import { BasedatosService } from '../services/basedatos.service';

@Component({
  selector: 'app-solicidudes-viajes',
  templateUrl: './solicidudes-viajes.page.html',
  styleUrls: ['./solicidudes-viajes.page.scss'],
})
export class SolicidudesViajesPage implements OnInit {
  uid: string = '';
  loading = false;
  listSolicitud: Solicitud[] = [];
  listSolicitudes: Solicitud[] = [];
  datos : Datos[] = [];
  fechasolicitud: any = new Date();
  newDato: Datos = <Datos>{};
  @ViewChild('myList') myList: IonList;
  res= null;
  @ViewChild(IonModal) modal: IonModal | undefined;

  historial: Historial = {
    id: '',
    patenteVehiculo: '',
    marca: '',
    modelo: '',
    Pasajero: '',
    fechaViaje: null,
    uid: '',
}

  constructor(private firestoreService: BasedatosService,
              private interaction: InteractionService,
              private firebaseauthService: FirebaseauthService,
              private AlertController: AlertController,
              private navController: NavController) { 
                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res !== null){
                    this.uid = res.uid;
                    this.getDatosUser(this.uid);
                  }
                });
              }

  ngOnInit() {
    this.obtenerSolicitud();
    this.fechasolicitud = this.firestoreService.formatDate(this.fechasolicitud)
    
  }

  async confirmarSolicitud(ids){
    console.log('Datos ->', this.historial);
    const solicitud = await this.obtenerdatosSolicitud(ids);
    this.historial.fechaViaje= new Date();
    if(this.historial.modelo == '' && this.historial.fechaViaje == null){
      const alert = await this.AlertController.create({
      header: 'Verificar campos',
      message: 'Llenar todos los campos',
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;
    }else{
      this.interaction.presentLoading('Generando Viaje...')
      console.log('Solicitud Aceptada');
      const path = 'HistorialViajes'
      const id = this.firestoreService.getId();
      this.historial.id = id;
      this.historial.patenteVehiculo = localStorage.getItem('patente');
      this.historial.marca = localStorage.getItem('marca');
      this.historial.modelo = localStorage.getItem('modelo');
      this.historial.Pasajero = localStorage.getItem('pasajero');
      this.historial.uid = localStorage.getItem('uid');
      await this.firestoreService.createDoc(this.historial,path, id);
      this.firestoreService.deletedoc('Solicitudes',ids);
      this.interaction.closeLoading();
      this.interaction.Alerta('Viaje Aprobado');  
      
    }
  }

  obtenerSolicitud(){
    this.firestoreService.obtenerSolicitud().subscribe(doc => {
      this.listSolicitud = [];
      doc.forEach((element: any) => {
        this.listSolicitud.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        
     
        });
        /*Accediendo a todos los id de firestore
        console.log(element.payload.doc.id);
        console.log(element.payload.doc.data());
        */
      });
      console.log("Datos",this.listSolicitud);
      
      
    })
  }

  getDatosUser(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.firestoreService.getDoc<Usuarios>(path,id).subscribe( res => {
      if(res) {
        localStorage.setItem('uid',res.uid);
        
      }
    });
  }

  async obtenerdatosSolicitud(id: any){
    const path = 'Solicitudes';
    await this.interaction.presentLoading('Confirmando Viaje...')
    this.firestoreService.getDoc<Solicitud>(path,id).subscribe( res => {
      if(res) {
        localStorage.setItem('pasajero', res.Pasajero);
        localStorage.setItem('patente', res.patenteVehiculo);
        localStorage.setItem('marca', res.marca);
        localStorage.setItem('modelo', res.modelo);
      }
    });
  }

}
