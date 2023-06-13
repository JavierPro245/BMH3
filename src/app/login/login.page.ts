import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  uid: string = '';
  constructor(private MenuControler: MenuController,
              private firebaseauthService: FirebaseauthService) { 
                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res !== null){
                    this.uid = res.uid;
                  }
                });
              }

  async ngOnInit() {

    const uid = await this.firebaseauthService.getUid();
  }

  async Ingresar() {
    console.log("Ingresar");
    const uid = await this.firebaseauthService.getUid();
    console.log("UID", uid);
  }

}
