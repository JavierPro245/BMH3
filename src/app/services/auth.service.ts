import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuarios } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authfirebase: AngularFireAuth) { }

  login(correo: string, password:string){
    return this.authfirebase.signInWithEmailAndPassword(correo, password)
  }

  logout(){
    this.authfirebase.signOut();
  }

  registrarUser(Usuario: Usuarios){
    return this.authfirebase.createUserWithEmailAndPassword(Usuario.correo, Usuario.password);
  }

  stateUser(){
    return this.authfirebase.authState
  }

}
