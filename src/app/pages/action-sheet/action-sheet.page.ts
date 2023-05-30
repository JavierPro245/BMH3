import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController, PopoverController } from '@ionic/angular';
import { MenuController} from '@ionic/angular';
import { MenuComponent } from 'src/app/menu/menu.component';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.page.html',
  styleUrls: ['./action-sheet.page.scss'],
})
export class ActionSheetPage implements OnInit {

  constructor(private actionSheetController: ActionSheetController,
     private menuController: MenuController,
     private alertController: AlertController,
     private navCtrl: NavController,
     private firestore: FirestoreService,
     private auth : AuthService,
     private interaction: InteractionService,
     private router: Router,
     private popoverController:PopoverController ) { }

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

  async logout(){
    this.auth.logut();
    this.interaction.presentAlert();
    this.router.navigate(['/login']);
    console.log('Sesion expirada')

   
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
          this.router.navigate(['/perfil']);
        }
      },
      {
        text: 'Realizar Viaje',
        icon: 'flag-outline',
        cssClass : 'blue',
        handler: () => {
          console.log('Favorite clicked');
          this.navCtrl.navigateRoot('mapa') 
        }
      }, {
    /*    text: 'Mis viajes',
    //    icon: 'car-outline',
    //    data: 10,
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Telefonos de emergencia',
        icon: 'call-outline',
        data: 'Data value',
        handler: () => {
          console.log('Play clicked');
        }
      }, {*/
        text: 'Logout',
        icon: 'log-out-outline',
        handler: () => {
          console.log('Favorite clicked');
          this.navCtrl.navigateRoot('login') 
        }
      },

      

      
       {
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


  getPasajeros(){
    this.firestore.getCollection();
  }

}