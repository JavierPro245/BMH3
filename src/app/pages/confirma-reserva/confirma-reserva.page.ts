import { Component, OnInit } from '@angular/core';
import { NavController, PickerController } from '@ionic/angular';
import { Reserva } from 'src/app/interfaces/model';
import { BasedatosService } from 'src/app/services/basedatos.service';

@Component({
  selector: 'app-confirma-reserva',
  templateUrl: './confirma-reserva.page.html',
  styleUrls: ['./confirma-reserva.page.scss'],
})
export class ConfirmaReservaPage implements OnInit {
  loading = false;
  Reserva: Reserva = {
    comuna: '',
    destino: '',
    capacidad: 0,
    pasajero: localStorage.getItem('nombre'),
    pago: '',
    fechaReserva: new Date(),

}

  constructor(private pickerCtrl: PickerController,
              private navCtrl: NavController,
              private database: BasedatosService) { }

  ngOnInit() {
  }

  async generarReserva(){
  
    this.loading = true;
    this.database.formatDate(this.Reserva.fechaReserva);
    this.database.guardarReserva(this.Reserva).then(() => {
      this.loading = false;
      console.log('Reserva ingresada');
      this.navCtrl.navigateRoot('/pasajero-reserva')
      
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


}
