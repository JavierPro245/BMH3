import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/interfaces/model';
import { BasedatosService } from 'src/app/services/basedatos.service';

@Component({
  selector: 'app-pasajero-reserva',
  templateUrl: './pasajero-reserva.page.html',
  styleUrls: ['./pasajero-reserva.page.scss'],
})
export class PasajeroReservaPage implements OnInit {


  listReserva: Reserva[] = [];

  constructor(private database: BasedatosService) { }

  ngOnInit() {
    this.obtenerReserva();
  }

  obtenerReserva(){
    this.database.obtenerReservas().subscribe(doc => {
      this.listReserva = [];
      doc.forEach((element: any) => {
        this.listReserva.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
        /*Accediendo a todos los id de firestore
        console.log(element.payload.doc.id);
        console.log(element.payload.doc.data());
        */
      });
      console.log(this.listReserva);
    })
  }

}
