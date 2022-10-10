import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/interfaces/interfaces';
import { FeriadosService } from 'src/app/services/feriados.service';
@Component({
  selector: 'app-feriados',
  templateUrl: './feriados.page.html',
  styleUrls: ['./feriados.page.scss'],
})
export class FeriadosPage implements OnInit {

  noticias: Data[] = [];

  constructor(private feriadosService: FeriadosService) { }

  ngOnInit() {
    this.feriadosService.getTopHeadLines().subscribe(resp => {
      console.log('feriados',resp);
      this.noticias = resp.data;
    });
  }

}
