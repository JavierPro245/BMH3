import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, IonModal, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
// import { Data, Vehiculo } from '../interfaces/interfaces';
import { BasedatosService } from '../services/basedatos.service';
import { Solicitud, Usuarios, Vehiculo } from '../interfaces/model';
import { Datos } from '../services/servicedatos.service';
import { InteractionService } from '../services/interaction.service';
import { FirebaseauthService } from '../services/firebaseauth.service';
@Component({
  selector: 'app-solicitar-vehiculo',
  templateUrl: './solicitar-vehiculo.page.html',
  styleUrls: ['./solicitar-vehiculo.page.scss'],
})
export class SolicitarVehiculoPage implements OnInit {
  uid: string = '';
  loading = false;
  listVehiculo: Vehiculo[] = [];
  listVehiculos: Vehiculo[] = [];

  datos : Datos[] = [];
  newDato: Datos = <Datos>{};
  @ViewChild('myList') myList: IonList;
  res= null;
  @ViewChild(IonModal) modal: IonModal | undefined;
  
  public data = ['Maipú', 'Providencia', 'Santiago'];
  public results = [...this.data];

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
  }
  comuna: '' | undefined;

  solicitud : Solicitud  = {
    id: '',
    patenteVehiculo: '',
    marca: '',
    modelo: '',
    Pasajero: '',
    fechaSolicitud: null,
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
    this.obtenerVehiculo();
  }
  obtenerVehiculo(){
    this.firestoreService.obtenerVehiculos().subscribe(doc => {
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

  async generarSolicitud(id){
    console.log('Datos ->', this.solicitud);
    const vehiculo = await this.obtenerdatosVehiculo(id);
    this.solicitud.fechaSolicitud= new Date();
    if(this.solicitud.modelo == '' && this.solicitud.fechaSolicitud == null){
      const alert = await this.AlertController.create({
      header: 'Verificar campos',
      message: 'Llenar todos los campos',
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;
    }else{
      this.interaction.presentLoading('Enviando solicitud...')
      console.log('Solicitud Aceptada');
      const path = 'Solicitudes'
      const id = this.firestoreService.getId();
      this.solicitud.id = id;
      this.solicitud.patenteVehiculo = localStorage.getItem('patente');
      this.solicitud.marca = localStorage.getItem('marca');
      this.solicitud.modelo = localStorage.getItem('modelo');
      await this.firestoreService.createDoc(this.solicitud,path, id);
      this.interaction.closeLoading();
      this.interaction.Alerta('Solicitud Realizada Exitosamente');  
      this.navController.navigateRoot('/home');
    }
  }

  getDatosUser(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.firestoreService.getDoc<Usuarios>(path,id).subscribe( res => {
      if(res) {
        this.solicitud.uid = res.uid;
        this.solicitud.Pasajero = res.nombre;
      }
    });
  }

  async obtenerdatosVehiculo(id: any){
    const path = 'Vehiculos';
    await this.interaction.presentLoading('Generando solicitud...')
    this.firestoreService.getDoc<Vehiculo>(path,id).subscribe( res => {
      if(res) {
        localStorage.setItem('patente', res.patente);
        localStorage.setItem('marca', res.marca);
        localStorage.setItem('modelo', res.modelo);
      }
    });
  }

}
