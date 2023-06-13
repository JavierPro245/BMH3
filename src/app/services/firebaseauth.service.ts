import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuarios } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public auth: AngularFireAuth) { 
    this.getUid();
  }

  login(email: string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    return this.auth.signOut();
  }

  registrar(Usuario: Usuarios){
    return this.auth.createUserWithEmailAndPassword(Usuario.correo,Usuario.password);
  }

  async getUid(){
    const user = await this.auth.currentUser //nos retornara las credenciales
    if(user === null){
      return null;
    }else{
      return user.uid;
    }
  }

  stateAuth(){
    return this.auth.authState;
  }

}
