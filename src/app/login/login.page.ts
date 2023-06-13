import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private MenuControler: MenuController,
              private firebaseauthService: FirebaseauthService) { }

  async ngOnInit() {

    const uid = await this.firebaseauthService.getUid();
    console.log("UID", uid);

  }

  async Ingresar() {
    console.log("Ingresar");
    const uid = await this.firebaseauthService.getUid();
    console.log("UID", uid);
  }

}
