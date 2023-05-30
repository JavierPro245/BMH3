import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../pages/Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private httpclient: HttpClient) { }


  getTopHeadLines(){
    return (this.httpclient.get<RespuestaTopHeadLines>('https://api.victorsanmartin.com/feriados/en.json'));

  }
}
