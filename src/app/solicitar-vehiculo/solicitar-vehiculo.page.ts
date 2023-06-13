import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
// import { Data, Vehiculo } from '../interfaces/interfaces';
import { BasedatosService } from '../services/basedatos.service';
@Component({
  selector: 'app-solicitar-vehiculo',
  templateUrl: './solicitar-vehiculo.page.html',
  styleUrls: ['./solicitar-vehiculo.page.scss'],
})
export class SolicitarVehiculoPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal | undefined;
  
  public data = ['Maipú', 'Providencia', 'Santiago'];
  public results = [...this.data];

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
  }
  comuna: '' | undefined;
  loading = false;

  @ViewChild('myList') myList: IonList | undefined;
  res= null;
  constructor(private firestoreService: BasedatosService) { }

  ngOnInit() {
  }

  guardarVehiculo(){ 
    const data = {
      nombre: 'prueba2',
      Vehiculo: 'Toyota',
    };
    const path = 'vehiculos';
    const id = '0rt5t1';
    this.firestoreService.createDoc(data, path, id).then( res => {
      console.log('vehiculo guardado')
    }).catch( error => {
      console.log('error al guardar el vehiculo', error);
    });
  }

}
