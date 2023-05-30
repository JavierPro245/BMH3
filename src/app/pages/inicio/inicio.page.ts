import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuController, NavController, PopoverController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RouterLinkDelegateDirective } from '@ionic/angular/directives/navigation/router-link-delegate';
import { MenuComponent } from 'src/app/menu/menu.component';

import { FirestoreService } from 'src/app/services/firestore.service';
//import{InicioPage} from '../inicio/inicio.page.spec';


//import { RegistroserviceService, Usuario } from '../../services/registroservice.service';


interface Componente{
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {


  handlerMessage = '';
  roleMessage = '';
  //usuarios : Usuario[] = []; 
  //newUsuario: Usuario = <Usuario>{};

 /* componentes: Componente[] = [

    {
      icon: 'paw-outline',
      name: 'Action sheet',
      redirecTo: '/action-sheet'
    },
    {
      icon: 'sunny-outline',
      name: 'Alert',
      redirecTo: '/alert'
    },
    {
      icon: 'beaker-outline',
      name: 'Avatar',
      redirecTo: '/avatar'
    },   
  ];*/

  constructor(public popoverController: PopoverController,
    private alertController: AlertController ,private menuController: MenuController,
    private navCtrl: NavController,
    private firestore: FirestoreService
    //private registroService: RegistroserviceService
    ) { }

  ngOnInit() {
  }

  async openMenu(ev: any){
    console.log('abrir menú');
    const menu = await this.popoverController.create({
      component: MenuComponent,
      translucent: true,
      event: ev
    });

    await menu.present();
  }



  async presentAlert() {
    
    localStorage.removeItem('ingresado')
    const alert = await this.alertController.create
    ({
    header: 'Cerrando Sesion',
    subHeader:'Hasta Pronto',
    buttons: [
    {
    text: 'Aceptar',
    handler:()=>{
    console.log ('Sesion Expirada!')
    
    
    }
    },
    //{
    //text: 'Cancelar',
   // handler:()=>this.navCtrl.push(),
    //role: 'cancel',
    //cssClass: 'rojo',
    
    //}
    ]
    });
    await alert.present()

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
}

//async presentAlertPrompt() {
//  const alert = await this.alertController.create({
//    header: 'Por favor completa con tu imformacion',
//    buttons: ['Iniciar'],
//    inputs: [
//      {
//        placeholder: 'usuario.email',
//      },
//      {
//        placeholder: 'password',
//        type: 'password',
//        attributes: {
//          password: 20,
//        },
//      }
//    ],
//  });

//  await alert.present();
//}



}