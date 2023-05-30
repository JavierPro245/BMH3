import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { MenuComponent } from 'src/app/menu/menu.component';
import { NoticiasService } from '../../services/noticias.service';
import { Data } from '../Interfaces/interfaces';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  noticias: Data[] = [];

  constructor(private menuController: MenuController, private noticiasService: NoticiasService, private popoverController: PopoverController) { }

  ngOnInit() {
    this.noticiasService.getTopHeadLines().subscribe(resp => {
      console.log('noticias', resp);
      this.noticias.push(...resp.data);
    })

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

  mostrarMenu()
  {
    this.menuController.open('first');
  }



}
