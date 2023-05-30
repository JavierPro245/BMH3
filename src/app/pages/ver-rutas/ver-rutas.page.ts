import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MenuComponent } from 'src/app/menu/menu.component';
import { RutasI, UserI, ViajeI } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-ver-rutas',
  templateUrl: './ver-rutas.page.html',
  styleUrls: ['./ver-rutas.page.scss'],
})
export class VerRutasPage implements OnInit {

buttonDisabled :boolean=false;

rutas: ViajeI[] = [];
datos: UserI[]=[];

info: UserI = null;
uid: string = null



constructor(private authservice: AuthService,private firestore :FirestoreService,
  private interacion: InteractionService,private popoverController: PopoverController) { 

  }

  asientos : number = 5;
 

  CantAsientos(){
    this.asientos  -=1;
    
    

  }

  async ngOnInit() {
    console.log('estoy en perfil');
    this.authservice.stateUser().subscribe( res => {
      console.log('en perfil - estado auteticacion -> ',res);
      this.getUid();

    });
    this.getUid(); 
    this.getRutas();
    this.CantAsientos();
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
    this.firestore.getDoc<UserI>(path, id).subscribe( res => {
      if (res) {
        this.info = res;

      }
      console.log('datos son -> ', res);

    })
  }

 


  getRutas(){
    this.firestore.getCollection2<ViajeI>('Viaje').subscribe(res=>{
      console.log('Lectura a la base de datos', res);
      this.rutas = res;
    })
  }

  async Tomar(rutas: ViajeI){
    const res = await this.interacion.presentAlert1('Solicitud','Monto a pagar $2.000')
     console.log('Conductor tomado');
     if(res){
       const path = 'Viaje';
       await this.firestore.getDoc(path,rutas.id);
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
