import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Reserva, Usuarios, Vehiculo } from '../interfaces/model';
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

  deletedoc(path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
}

  updateDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }

//funciones basicas de crud
getCollection<tipo>(path: string) {
  const collection = this.firestore.collection<tipo>(path);
  return collection.valueChanges();
}


getDoc<tipo>(path: string, id: string) {
  const collection = this.firestore.collection<tipo>(path);
  return collection.doc(id).valueChanges();
}

formatDate(date: Date): string{
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

/*primera prueba de conexion con base de datos 
  CrearUsuario(){
    this.firestore.collection('Chofer')
  }
*/

  guardarReserva(reserva:Reserva): Promise<any> {
    return this.firestore.collection('Reservas').add(reserva);
  }
  obtenerReservas(): Observable<any>{
    return this.firestore.collection('Reservas', ref => ref.orderBy('fechaReserva','asc')).snapshotChanges()
  }
  

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
    this.vehiculo$.next(vehiculo);
  }
  //este metodo obtiene los datos de la tarjeta para cuando se haga un suscribe

  getVehiculoEdit(): Observable<Vehiculo> {
    return this.vehiculo$.asObservable();
  }

  //metodo para alternar entre registrar by editar vehiculo
  editarVehiculo(id: string, vehiculo: any): Promise<any> {
    return this.firestore.collection('Vehiculos').doc(id).update(vehiculo);
  }






  getId() {
    return this.firestore.createId();
  }

}


/*Para conseguir armar un crud en ionic con firebase ver video de juan pablo code y ademas revisar el sgte link de github
https://github.com/juanpablo-jpho/gasapp
*/