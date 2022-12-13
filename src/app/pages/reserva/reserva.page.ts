import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Reserva } from 'src/app/interfaces/model';
import { BasedatosService } from 'src/app/services/basedatos.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  listReserva: Reserva[] = [];

  constructor(private navController: NavController,
              private database: BasedatosService) { }
  rol= localStorage.getItem('rolUsuario');
  ngOnInit() {
    if (localStorage.getItem('rolUsuario')== 'pasajero'){
      this.navController.navigateRoot('/pasajero-reserva');
    }else{
      this.navController.navigateRoot('/reserva');
    }
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

  confirmarReserva(){
    
  }
}
