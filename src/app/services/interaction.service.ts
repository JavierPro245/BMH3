import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private alertController: AlertController) { }
    
  async presentToast(mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentToast2(position: 'top' | 'middle' | 'bottom',mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position:position,
      color:'dark',
    });
    toast.present();
  }


  async showLoading(mensaje:string) {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000,
      spinner: 'circles',
    });

    loading.present();
  }

  async closeloading() {
    const loading = await this.loadingCtrl.dismiss({
      duration: 1000,
      spinner: 'circles',
    });

    loading.valueOf();
  }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sesion Finalizada',
      //subHeader: subHeader,
      //message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentAlert1(texto : string , subtitulo: string) {

    let aceptar = false;

 
      const alert = await this.alertController.create({
        cssClass:'my-custom-class',
        header: texto,
        subHeader: subtitulo,
        buttons: [
          {
            text: 'Cancelar',
            role:'cancel'
          },{
            text: 'Ok',
            handler:()=>{
              aceptar = true;
            }
          }
        ],
      });

      await alert.present();
      await alert.onDidDismiss();
      return aceptar
    ;


  }





}
