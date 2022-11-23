import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Usuarios, Vehiculo } from '../interfaces/model';
@Injectable({
  providedIn: 'root'
})
export class BasedatosService {
private vehiculo$ = new Subject<any>();


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

  //ingresar vehiculos desde un reactiveform a firestore
  guardarVehiculo(vehiculo:Vehiculo): Promise<any> {
    return this.firestore.collection('Vehiculos').add(vehiculo);
  }
  //listar los vehiculos get obtiene todos los datos snapshotChanges cualquier dato que se ingresa a la coleccion lo veremos inmediatamente
  obtenerVehiculos(): Observable<any>{
    return this.firestore.collection('Vehiculos', ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges()
  }

  eliminarVehiculo(id: string): Promise<any> {
    return this.firestore.collection('Vehiculos').doc(id).delete();
  }
  //metodo para actualizar datos y que al momento de actualizar se rellene solo el formulario
  //este metodo lo utiliza la parte de listar vehiculos
  addVehiculoEdit(vehiculo: Vehiculo){
    this.vehiculo$.next(vehiculo)
  }
  //este metodo obtiene los datos de la tarjeta para cuando se haga un suscribe

  getVehiculoEdit(): Observable<Vehiculo> {
    return this.vehiculo$.asObservable();
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