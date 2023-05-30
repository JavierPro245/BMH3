
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.page.html',
  styleUrls: ['./inputs.page.scss'],
})
export class InputsPage implements OnInit {
  
  nombre: string='';

  usuario = {
    email:'',
    password:'',
  }

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertController.create({
    header: 'Registro con exito',
    subHeader: '',
    message: 'Te hemos enviado un mensaje a tu corre.',
    buttons: ['ACEPTAR']
    });
    await alert.present();
    }

  onSubmit(){
    console.log('submit');
    console.log(this.usuario);
  }

}