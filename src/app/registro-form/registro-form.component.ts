import { PacienteService } from './../service/paciente.service';
import { ProfesionalesService } from './../service/profesionales.service';
import { CentrosService } from './../service/centros.service';
import { VacunaService } from './../service/vacuna.service';
import { Profesional } from './../models/profesional';
import { Vacuna } from './../models/vacuna';
import { Paciente } from './../models/paciente';
import { Centro } from './../models/centro';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-registro-form',
  templateUrl: './registro-form.component.html',
  styleUrls: ['./registro-form.component.css']
})
export class RegistroFormComponent implements OnInit {

  page = 0;
  //models
  vacunas: Vacuna[] = [];
  profesional: Profesional = {}
  paciente: Paciente = {};
  centro: Centro = {};

  idPaciente = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vacunaService: VacunaService,
    private centroService: CentrosService,
    private profesionalService: ProfesionalesService,
    private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.idPaciente = params['idPaciente']
        console.log('Query param page: ', this.idPaciente);
        this.llenarCampos()

    });
 }
 llenarCampos(){
   this.vacunas = [
     {
      nombreVacuna: 'fizer'
     },
     {
       nombreVacuna: 'cinobac'
     }];
    this.paciente = {
      nombres: 'lsdfkssd',
      apellidos: 'kldsfja',
      c_i: 'sad;lkf;aldks',
      fecha_nacimiento: 'lwkdfadldkds',
      sexo:"sdlmfladsdkm"
    }
    console.log(this.vacunas)
  /* 
    this.vacunaService.getAllVacuna().subscribe(
      result =>{
        this.vacunas = result
      }
    )
    this.centroService.getCentroById().subscribe(
      result =>{
        this.centro = result
      }
    )
    this.profesionalService.getProfesionalById().subscribe(
      result =>{
        this.profesional = result
      }
    )
    this.pacienteService.getPacienteById().subscribe(
      result => {
        this.paciente = result
      }
    )
  */
 }
}
