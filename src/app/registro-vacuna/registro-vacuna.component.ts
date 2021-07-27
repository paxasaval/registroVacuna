import { Paciente } from './../models/paciente';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from './../service/paciente.service';


@Component({
  selector: 'app-registro-vacuna',
  templateUrl: './registro-vacuna.component.html',
  styleUrls: ['./registro-vacuna.component.css']
})
export class RegistroVacunaComponent implements OnInit {

  paciente: Paciente = {}; 
  pacienteNuevo: Paciente = {};
  aux: any[] = [];

  constructor(private route:Router,
    private pacienteService: PacienteService) { 
    
  }

  
  ngOnInit(): void {
  }



  findPaciente(){
    this.pacienteService.getPacienteById(this.paciente).subscribe(
      result =>{
        this.aux = result;
        this.paciente = this.aux[0];
        if(this.paciente.c_i != undefined){
          localStorage.setItem("paciente.c_i", this.paciente.c_i);
          this.route.navigate(['/registro_form']);
        }
      }
    );
  }
}
