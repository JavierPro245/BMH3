import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Usuarios, Vehiculo } from '../interfaces/model';
@Injectable({
  providedIn: 'root'
})
export class BasedatosService {

  constructor(private firestore: AngularFirestore) { }
/*se utiliza para crear toda la coleccion*/
  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
}


/*primera prueba de conexion con base de datos 
  CrearUsuario(){
    this.firestore.collection('Chofer')
  }
*/


  guardarVehiculo(vehiculo:Vehiculo): Promise<any> {
    return this.firestore.collection('Vehiculos').add(vehiculo);
  }

  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }


  getDoc<tipo>(path: string, id: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  


}


/*Para conseguir armar un crud en ionic con firebase ver video de juan pablo code y ademas revisar el sgte link de github
https://github.com/juanpablo-jpho/gasapp
*/