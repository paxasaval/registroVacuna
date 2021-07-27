import { PacienteService } from './../service/paciente.service';
import { ProfesionalesService } from './../service/profesionales.service';
import { CentrosService } from './../service/centros.service';
import { VacunaService } from './../service/vacuna.service';
import { RegistroService } from '../service/registro.service';
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
  profesionales: any[] = [];
  centros: Centro[] = [];
  pacientes: Paciente[] = [];
  registros: Registro[] = [];

  registro: Registro = {};
  vacuna: Vacuna = {};
  profesional: Profesional = {}
  paciente: Paciente = {};
  centro: Centro = {};
  aux: any[] = [];

  radioButton!: string;
  radioOptions: string[] = ['Primera Dosis','Segunda Dosis']
  isDis: boolean[] = [false,true];

  button: string = 'Registrar'
  btn_dis: boolean = false;

  idPaciente = '';
  idProfesional = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vacunaService: VacunaService,
    private centroService: CentrosService,
    private profesionalService: ProfesionalesService,
    private pacienteService: PacienteService,
    private registroService: RegistroService) { }

  ngOnInit(): void {
    this.paciente.c_i = localStorage.getItem("paciente.c_i")!;
    this.profesional.c_i = localStorage.getItem("profesional.c_i")!;
    this.llenarCampos();
  }

  guardarRegistro() {
    if(this.button=='Registro'){
      this.registro = {
        fecha_1_dosis: new Date(),
        num_dosis_aplicadas: 1,
        id_profesional: this.profesional.id,
        id_paciente: this.paciente.id,
        id_vacuna: this.vacunas[0].id,
        id_centro: this.centros[0].id
      }
    }else{

    }

    //this.registroService.addRegistros(this.registro);
  }
  comprobrarDosis(){
    for (let r of this.registros){
      if (this.paciente.id === r.id_paciente){
        if(r.num_dosis_aplicadas == 1){
          this.isDis[0] = true;
          this.isDis[1] = false;
          this.button = 'Actualizar'
        }
        else if (r.num_dosis_aplicadas == 2){
          this.isDis[0] = true;
          this.isDis[1] = true;
          this.btn_dis=true
        }
      }
    }
  }
  isDisable(){
    this.isDis[0]=true;
  }
  llenarCampos() {
    this.pacienteService.getPacienteById(this.paciente).subscribe(
      result => {
        this.aux = result;
        this.paciente = this.aux[0];
        this.paciente.fecha_nacimiento= this.aux[0].fecha_nacimiento.toDate();
      }
    )
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
        //this.isDisable();
      }
    )
    this.profesionalService.getAllProfesional().subscribe(
      result => {
        this.profesionales = result;
        for (let p of this.profesionales){
            if(this.profesional.c_i === p.c_i){
              this.profesional.id = p.id;
            }
        }
      }
    )
    this.pacienteService.getAllPaciente().subscribe(
      result => {
        this.pacientes = result;
        for (let p of this.pacientes){
          if(this.paciente.c_i === p.c_i){
              this.paciente.id = p.id;
          }
        }
      }
    )
    this.registroService.getRegistros().subscribe(
      result => {
        this.registros = result;
        this.comprobrarDosis();
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
