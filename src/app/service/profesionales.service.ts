import { AngularFirestore } from '@angular/fire/firestore';
import { Profesional } from './../models/profesional';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProfesionalesService {

  constructor(private db: AngularFirestore) { }
  getAllProfesional(){
    return this.db.collection('Profesional').valueChanges()
  }
  getProfesionalById(){

  }
  postProfesional(){

  }
}
