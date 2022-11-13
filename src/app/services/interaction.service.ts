import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  loading: any;

  constructor(private alertController: AlertController,
              private loadingController: LoadingController) { 

              }

  async Alerta(mensaje: string){
    let alert = this.alertController.create({
      message: mensaje,
      buttons: ['Aceptar']
      
    
    });
    await (await alert).present();
    return;
  }

  async presentLoading(mensaje: string){
    this.loading = await this.loadingController.create({
      cssClass: 'my-customs-class',
      message: mensaje,
      duration: 1000,
      
    });
    await this.loading.present();
  }

  async closeLoading(){
    await  this.loading.dismiss();
    
  }

}
