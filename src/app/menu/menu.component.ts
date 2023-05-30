import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  login: boolean = false;
  rol: 'pasajero' | 'conductor'= null;

  constructor(private firestore: FirestoreService, private interaction: InteractionService, private auth: AuthService, private router: Router, public popoverController: PopoverController) { 


    this.auth.stateUser().subscribe( res => {
      if (res) {
           console.log('Está logeado');
           this.login = true;
           this.getDatosUser(res.uid)
      } else {
        console.log('No está logeado');
        this.login = false;
      //  this.router.navigate(['/login'])
        
      }   
 })
  }
  ngOnInit() {}

  ira(){
    console.log('Click en home');
    this.router.navigate[('/alumno')]
    this.popoverController.dismiss();
  }


  loginApp(){
    this.login =true;
  }

  logout(){
    this.auth.logut();
    this.interaction.presentToast('Sesión cerrada');
    this.router.navigate(['/login'])

  }

  getDatosUser(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<UserI>(path, id).subscribe( res => {
        console.log('datos -> ', res);
        if (res) {
          this.rol = res.perfil
        }
    })
  }
}
