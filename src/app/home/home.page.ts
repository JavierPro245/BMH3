import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestorageService } from '../services/firestorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  uid: string = '';
  constructor(private menuContoller: MenuController,
              private firebaseauthService: FirebaseauthService,
              private FirestorageService: FirestorageService) { 
                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res !== null){
                    this.uid = res.uid;
                  }
                });
              }

  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
    console.log("UID", uid);
  }
  
  mostrarMenu(){
    this.menuContoller.open('first');
  }

}
