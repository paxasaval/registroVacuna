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
    
    /*var Pacientesss = this.db.collection("Paciente").valueChanges().where("c_i", "==", "1105666042")({
      nombres: "Antse"
    });
    Pacientesss.subscribe(
      result => {
        this.pacientesTotales = result;
        var aux: Paciente;
        for(let p of this.pacientesTotales){
          aux = p;
          if(aux.c_i === paciente.c_i){
            this.pacienteBuscado = aux;
          }
        }
        console.log(this.pacienteBuscado);
      }
    )
    
    /*this.pacientesDoc = this.db.doc(`Paciente/${paciente.c_i}`);
    this.pacientesDoc.get().subscribe(
      result => {
        console.log(result.data()+"resul")
      },
      error => {
        console.log(error)
      }
    );
    this.pacientesDoc as Paciente;
    console.log(this.pacientesDoc.c_i)
    //console.log(this.pacientesDoc.get().subscribe() +" consultado")*/
    return this.db.collection('Paciente', ref => ref.where("c_i", "==", paciente.c_i)).valueChanges();
  }
  postPaciente(){
    
  }
}
