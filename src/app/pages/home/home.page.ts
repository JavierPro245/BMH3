import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

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
  nombre= localStorage.getItem("nombre")
  constructor(private menuContoller: MenuController) { 
   
  }

  ngOnInit() {
    
  }
  
  mostrarMenu(){
    this.menuContoller.open('first');
  }


}
