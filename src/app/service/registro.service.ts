import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Registro } from '../models/registro';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  registrosCollection!: AngularFirestoreCollection<Registro>;
  registros!: Observable<Registro[]>;
  registrosDoc!: AngularFirestoreDocument<Registro>;

  constructor(public db: AngularFirestore) {
    this.registrosCollection = this.db.collection('Registro');
    this.registros = this.registrosCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a =>{
        const data = a.payload.doc.data() as Registro;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
   }

   getRegistros(){
     return this.registros;
   }
   addRegistros(registro: Registro){
     this.registrosCollection.add(registro);
   }
   updateRegistro(registro: Registro){
     this.registrosDoc = this.db.doc(`Registro/${registro.id}`);
     this.registrosDoc.update(registro);
   }
}
