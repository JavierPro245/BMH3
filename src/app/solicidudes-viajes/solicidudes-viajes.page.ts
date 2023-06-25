import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud, Usuarios } from '../interfaces/model';
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

  confirmarSolicitud(){
    console.log('Confirmar Solicitud');
    this.navController.navigateRoot('/home');
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
        localStorage.setItem('pasajero',res.nombre);
        
      }
    });
  }

}
