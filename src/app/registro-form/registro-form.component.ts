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
  vacunas: Vacuna[] = [];
  profesionales: any[] = []
  centros: Centro[] = [];

  registro: Registro = {};
  vacuna: Vacuna = {};
  profesional: Profesional = {}
  paciente: Paciente = {};
  centro: Centro = {};
  aux: any[] = [];

  idPaciente = '';
  idProfesional = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vacunaService: VacunaService,
    private centroService: CentrosService,
    private profesionalService: ProfesionalesService,
    private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.paciente.c_i = localStorage.getItem("paciente.c_i")!;
    this.profesional.c_i = localStorage.getItem("profesional.c_i")!;
    this.llenarCampos();
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
    this.pacienteService.getPacienteById(this.paciente).subscribe(
      result => {
        this.aux = result;
        this.paciente = this.aux[0];
        this.paciente.fecha_nacimiento= this.aux[0].fecha_nacimiento.toDate();
      }
    )
    console.log(this.vacunas)
    this.profesionalService.getProfesionalByCI(this.profesional).subscribe(
      result => {
        this.aux = result;
        this.profesional = this.aux[0];
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
    this.centroService.getAllCentro().subscribe(
      result => {
        this.centros = result;
        console.log(this.centros)
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
