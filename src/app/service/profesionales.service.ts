import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Profesional } from './../models/profesional';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalesService {

  profesionalCollection!: AngularFirestoreCollection<Profesional>;
  profesionales!: Observable<Profesional[]>;
  profesionalesDoc!: AngularFirestoreDocument<Profesional>;
  userSub = new Subject();
  $userSub = this.userSub.asObservable();

  constructor(public db: AngularFirestore) {
    this.profesionalCollection = this.db.collection('Profesional');
    this.profesionales = this.profesionalCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Profesional;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
   }

  getAllProfesional(){
    return this.profesionales;
  }
  getProfesionalByCI(profesional: Profesional){
    return this.db.collection('Profesional', ref => ref.where("c_i", "==", profesional.c_i)).valueChanges();
  }

  setUserSub(){
    this.userSub.next();
  }
  postProfesional(){

  }
}
