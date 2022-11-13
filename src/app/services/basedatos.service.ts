import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
@Injectable({
  providedIn: 'root'
})
export class BasedatosService {

  constructor(private firestore: AngularFirestore) { }
/*se utiliza ppara crear tosa la coleccion*/
  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
}



  CrearUsuario(){
    this.firestore.collection('Chofer')
  }

  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }



}


/*Para conseguir armar un crud en ionic con firebase ver video de juan pablo code y ademas revisar el sgte link de github
https://github.com/juanpablo-jpho/gasapp
*/