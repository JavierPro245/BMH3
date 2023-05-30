import { Component, OnInit } from '@angular/core';
import { LoadingController, PopoverController } from '@ionic/angular';
import { MenuComponent } from 'src/app/menu/menu.component';
import { RutasI, UserI } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-crear-rutas',
  templateUrl: './crear-rutas.component.html',
  styleUrls: ['./crear-rutas.component.scss'],
})
export class CrearRutasComponent implements OnInit {

  uid: string = null
  info: UserI = null;

  usuarios: UserI[] = [];

  data: RutasI = {
    conductor:{
      nombre:'',
      patente:''
  },
  rutas:{
      avenida1: '',
      avenida2: '',
      avenida3: ''
  },
  avenidaOpcional1:'',
  avenidaOpcional2:'',
  id: '',
  }

  constructor(private  authservice: AuthService,private firestoreService: FirestoreService , private interaction : InteractionService,
              private loadingController: LoadingController, 
              private popoverController: PopoverController,) { }

  ngOnInit() {
    console.log('Sitio para crear rutas');
    this.getRutas();
    this.authservice.stateUser().subscribe( res => {
      console.log('en perfil - estado auteticacion -> ',res);
      this.getUid();

    });
    this.getUid(); 
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

  crearRuta(){

  
    this.interaction.showLoading('Creando..')

    const path = 'Rutas';
    const id = this.firestoreService.getId();
    this.data.id=id;
    this.firestoreService.createDoc(this.data,path, id).then((res)=>{
      console.log('Ruta creada exitosa');
      this.interaction.presentToast2('bottom','Ruta creada')
    })
    
  }
  getRutas(){
    this.firestoreService.getCollection2<UserI>('Usuarios').subscribe(res=>{
      console.log('Lectura a la base de datos', res);
      this.usuarios = res;
    })
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


}
