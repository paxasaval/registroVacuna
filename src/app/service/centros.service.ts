import { Injectable } from '@angular/core';
import { Centro } from '../models/centro';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CentrosService {

  centrosCollection!: AngularFirestoreCollection<Centro>;
  centros!: Observable<Centro[]>;


  constructor(public db: AngularFirestore) {
    this.centrosCollection = this.db.collection('Centro');
    this.centros = this.centrosCollection.snapshotChanges().pipe(map(actions =>{
      return actions.map(a => {
        const data = a.payload.doc.data() as Centro;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
   }
  getAllCentro(){
    return this.centros;
  }
  getCentrobyName(centro: Centro){
    return this.db.collection('Centro', ref => ref.where("recinto", "==",centro.recinto)).valueChanges();
  }
}
