import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController, PopoverController } from '@ionic/angular';
import { MenuController} from '@ionic/angular';
import { MenuComponent } from 'src/app/menu/menu.component';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {

  constructor(private actionSheetController: ActionSheetController,
    private menuController: MenuController,
    private alertController: AlertController,
    private navCtrl: NavController,
    private popoverController: PopoverController) { }

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

  mostrarMenu(){
    this.menuController.open('first');
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
}

  onClick() {
    this.presentActionSheet();
   }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Mis Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Mi perfil',
        role: 'destructive',
        icon: 'person-outline',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          console.log('Delete clicked');
          this.navCtrl.navigateRoot('perfil')
        }
      }, {
        text: 'Programar Viaje',
        icon: 'car-outline',
        data: 10,
        handler: () => {
          console.log('Share clicked');
          this.navCtrl.navigateRoot('mapa')
        }
        
      },
      {
        text: 'Solicitudes de Viajes',
        icon: 'id-card-outline',
        data: 10,
        handler: () => {
          console.log('Share clicked');
          this.navCtrl.navigateRoot('ver-rutas-pasajero')
        }
        
      },
       /*{
        text: 'Telefonos de emergencia',
        icon: 'call-outline',
        data: 'Data value',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Configuraciones',
        icon: 'build-outline',
        handler: () => {
          console.log('Favorite clicked');
        }
      },*/ {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'rojo',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}