import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';


import { PopoverController } from '@ionic/angular';
import { MenuComponent } from 'src/app/menu/menu.component';
import { RutasI, ViajeI, ViajePasajeroI } from 'src/app/models/models';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
//@NgModule({
//  imports: [CommonModule],
 // declarations: [MyComponent]

//})//
export class PerfilPages implements OnInit {

  rutas: ViajePasajeroI[] = [];

  uid: string = null
  info: UserI = null;

  constructor(private authservice: AuthService,
              private firestoreService: FirestoreService,private interacion: InteractionService,private popoverController: PopoverController) { }

  async ngOnInit() {
    console.log('estoy en perfil');
    this.authservice.stateUser().subscribe( res => {
      console.log('en perfil - estado auteticacion -> ',res);
      this.getUid();

    });
    this.getUid();
    this.getRutas();
  
  }

  async getUid() {
    const uid = await this.authservice.getUid();
    if (uid){
      this.uid = uid;
      console.log('uid -> ', this.uid);
      this.getInfoUser();
    }else{
      console.log('no existe uid');
    }
  }


  getInfoUser(){
    const path = 'Usuarios';
    const id = this.uid;
    this.firestoreService.getDoc<UserI>(path, id).subscribe( res => {
      if (res) {
        this.info = res;

      }
      console.log('datos son -> ', res);

    })
  }

  /*---------------------------------------------------------------------------------*/

  async getUid1() {
    const uid = await this.authservice.getUid();
    if (uid){
      this.uid = uid;
      console.log('uid -> ', this.uid);
      this.getInfoUser();
    }else{
      console.log('no existe uid');
    }
  }


  getInfoUser1(){
    const path = 'Usuarios';
    const id = this.uid;
    this.firestoreService.getDoc<UserI>(path, id).subscribe( res => {
      if (res) {
        this.info = res;

      }
      console.log('datos son -> ', res);

    })
  }



  getRutas(){
    this.firestoreService.getCollection2<ViajePasajeroI>('ViajePasajero').subscribe(res=>{
      console.log('Lectura a la base de datos', res);
      this.rutas = res;
    })
  }

  async Tomar(rutas: ViajePasajeroI){
    const res = await this.interacion.presentAlert1('Solicitud','Vehiculo Tomado')
     console.log('Conductor tomado');
     if(res){
       const path = 'ViajePasajero';
       await this.firestoreService.deletedoc(path,rutas.id);
       this.interacion.presentToast('Vehiculo tomado con exito');
     }
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

}



