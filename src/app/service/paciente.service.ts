import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacientesCollection!: AngularFirestoreCollection<Paciente>;
  pacientes!: Observable<Paciente[]>;
  pacientesDoc!: AngularFirestoreDocument<Paciente>;
  pacientesTotales!: any[];
  pacienteBuscado!: Paciente;

  constructor(public db: AngularFirestore) {
    this.pacientesCollection = this.db.collection('Paciente');
    this.pacientes = this.pacientesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Paciente;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
   }

  getAllPaciente(){
    return this.pacientes;
  }
  getPacienteById(paciente: Paciente){
    return this.db.collection('Paciente', ref => ref.where("c_i", "==", paciente.c_i)).valueChanges();
  }
  postPaciente(){
    
  }
  /*findResourceByID(id: string) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME);
    return this.resourcesCollection.doc(id).valueChanges();
  }*/
 
}
