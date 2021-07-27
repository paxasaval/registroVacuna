import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Vacuna } from '../models/vacuna';

@Injectable({
  providedIn: 'root'
})
export class VacunaService {
  vacunasCollection!: AngularFirestoreCollection<Vacuna>;
  vacunas!: Observable<Vacuna[]>;
  vacunasDoc!: AngularFirestoreDocument<Vacuna>;
  
  constructor(public db: AngularFirestore) { 
    this.vacunasCollection = this.db.collection('Vacuna');
    this.vacunas = this.vacunasCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Vacuna;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }
  getAllVacuna(){
    return this.vacunas;
  }
  getVacunaById(vacuna : Vacuna){
    return this.db.collection('Vacuna', ref => ref.where("nombreVacuna", "==", vacuna.nombreVacuna)).valueChanges();
  }
}
