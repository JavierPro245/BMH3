import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
interface Componente {
  icon:string;
  name:string;
  redirectTo:string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombre: string;
  constructor(private menuContoller: MenuController, navParams: NavParams) { 
    this.nombre = navParams.get('nombre');
  }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuContoller.open('first');
  }

}
