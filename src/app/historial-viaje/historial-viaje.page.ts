import { Component, OnInit, ViewChild } from '@angular/core';
import { Historial, Solicitud } from '../interfaces/model';
import { Datos } from '../services/servicedatos.service';
import { AlertController, IonList, IonModal, NavController } from '@ionic/angular';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { InteractionService } from '../services/interaction.service';
import { BasedatosService } from '../services/basedatos.service';

@Component({
  selector: 'app-historial-viaje',
  templateUrl: './historial-viaje.page.html',
  styleUrls: ['./historial-viaje.page.scss'],
})
export class HistorialViajePage implements OnInit {
  uid: string = '';
  loading = false;
  listHistorial: Historial[] = [];
  listHistorials: Historial[] = [];
  fechaviaje: any = new Date();
  datos : Datos[] = [];
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
    this.obtenerHistorial();
    this.fechaviaje = this.firestoreService.formatDate(this.fechaviaje)
  }

  getDatosUser(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.firestoreService.getDoc<Solicitud>(path,id).subscribe( res => {
      if(res) {
        this.historial.uid = res.uid;
        this.historial.Pasajero = res.Pasajero;
        
      }
    });
  }
  obtenerHistorial(){
    this.firestoreService.obtenerHistorial().subscribe(doc => {
      this.listHistorial = [];
      doc.forEach((element: any) => {
        this.listHistorial.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        
     
        });
        /*Accediendo a todos los id de firestore
        console.log(element.payload.doc.id);
        console.log(element.payload.doc.data());
        */
      });
      console.log("Datos",this.listHistorial);
      
      
    })
  }

}
