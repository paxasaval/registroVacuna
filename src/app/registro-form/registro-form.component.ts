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
import { Registro } from '../models/registro';


@Component({
  selector: 'app-registro-form',
  templateUrl: './registro-form.component.html',
  styleUrls: ['./registro-form.component.css']
})
export class RegistroFormComponent implements OnInit {

  page = 0;
  //models
  registro: Registro = {};
  vacuna: Vacuna = {};
  vacunas: Vacuna[] = [];
  profesional: Profesional = {}
  paciente: Paciente = {};
  centro: Centro = {};
  profesionales: any[] = []
  aux: any[] = [];

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
        this.idPaciente = params['Paciente']
        console.log('Query param page: ', params);
        this.llenarCampos()

      });
  }

  guardarRegistro() {
    this.registro = {
      fecha_1_dosis: new Date(),
      fecha_2_dosis: new Date(),
      num_dosis_aplicadas: 1,
      id_profesional: this.profesional.id,
      id_paciente: this.paciente.id,
      id_vacuna: this.vacuna.id,
      id_centro: this.centro.id
    }
    //this.registroService.pushRegistro(this.registro)
  }
  llenarCampos() {
    this.paciente.c_i = this.idPaciente;
    this.pacienteService.getPacienteById(this.paciente).subscribe(
      result => {
        this.aux = result;
        this.paciente = this.aux[0];
        this.paciente.fecha_nacimiento= this.aux[0].fecha_nacimiento.toDate();
      }
    )
    /*this.vacunas = [
      {
       nombreVacuna: 'fizer'
      },
      {
        nombreVacuna: 'cinobac'
      }];*/
    /*this.paciente = {
      nombres: 'lsdfkssd',
      apellidos: 'kldsfja',
      c_i: 'sad;lkf;aldks',
      fecha_nacimiento: 'lwkdfadldkds',
      sexo:"sdlmfladsdkm"
    }*/
    console.log(this.vacunas)
    this.profesionalService.getAllProfesional().subscribe(
      result => {
        this.profesionales = result
        this.profesional = this.profesionales[0]
      },
      error => {
        console.log(error)
      }
    )



    this.vacunaService.getAllVacuna().subscribe(
      result => {
        this.vacunas = result
      }
    )
    /*
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
