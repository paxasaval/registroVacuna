import { Paciente } from './../models/paciente';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-vacuna',
  templateUrl: './registro-vacuna.component.html',
  styleUrls: ['./registro-vacuna.component.css']
})
export class RegistroVacunaComponent implements OnInit {

  paciente: Paciente = {}


  constructor(private route:Router) { }

  
  ngOnInit(): void {
  }

  findPaciente(){
    this.paciente.id = 'hola enstic'
    this.paciente.nombres="encontrado"  
    this.route.navigate(['/registro_form'], { queryParams: { idPaciente: this.paciente.id}})
    console.log(this.paciente.nombres)
  }

}
