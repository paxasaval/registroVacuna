import { ConfirmRegistroComponent } from './../confirm-registro/confirm-registro.component';
import { Alert2DosisComponent } from './../alert2-dosis/alert2-dosis.component';
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
import {MatDialog} from '@angular/material/dialog';




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

  selected = '';

  selected_recinto = '';

  idPaciente = '';
  idProfesional = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vacunaService: VacunaService,
    private centroService: CentrosService,
    private profesionalService: ProfesionalesService,
    private pacienteService: PacienteService,
    private registroService: RegistroService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.paciente.c_i = localStorage.getItem("paciente.c_i")!;
    this.profesional.c_i = localStorage.getItem("profesional.c_i")!;
    this.llenarCampos();
  }

  obtenerVacunaCentro(){
    this.vacuna.nombreVacuna = this.selected;
    for (let v of this.vacunas){
      if(this.vacuna.nombreVacuna === v.nombreVacuna){
          this.vacuna.id = v.id;
          this.vacuna = v;
      }
    }
    this.centro.recinto = this.selected_recinto;
    for (let c of this.centros){
      if(this.centro.recinto === c.recinto){
        this.centro.id = c.id;
        this.centro = c;
      }
    }
  }
  guardarRegistro() {
    if(this.button === 'Registrar'){
      this.obtenerVacunaCentro();
      this.registro = {
        fecha_1_dosis: new Date(),
        num_dosis_aplicadas: 1,
        id_profesional: this.profesional.id,
        id_paciente: this.paciente.id,
        id_vacuna: this.vacuna.id,
        id_centro: this.centro.id
      }
      //console.log(this.registro);
      this.registroService.addRegistros(this.registro);
    }else{
      this.registro.fecha_2_dosis = new Date(),
      this.registro.num_dosis_aplicadas = 2;
     //console.log(this.registro);
      this.registroService.updateRegistro(this.registro);
    }
    //console.log(this.selected_recinto)
    

    //this.registroService.addRegistros(this.registro);
  }

  openDialog(){
    //llamar funcion para llenar vacuna y recinto
   
    this.obtenerVacunaCentro();
    if(this.radioButton==='Primera Dosis'){
      this.registro.fecha_1_dosis = new Date()
    }else{
      this.registro.fecha_2_dosis = new Date()
    }
    const dialogRef = this.dialog.open(ConfirmRegistroComponent, {
      data: { 
        idPaciente: this.paciente.c_i,
        nombresPaciente: this.paciente.nombres,
        apellidosPaciente: this.paciente.apellidos,
        fechaNacimientoPaciente: this.paciente.fecha_nacimiento?.getDate(),
        domicilio: this.paciente.domicilio,
        sexo: this.paciente.sexo,
        idProfesional: this.profesional.c_i,
        nombresProfesional: this.profesional.nombres,
        apellidosProfesional: this.profesional.apellidos,
        nombreVacuna: this.vacuna.nombreVacuna,
        dosis: this.radioButton,
        fecha_1_dosis: this.registro.fecha_1_dosis,
        fecha_2_dosis: this.registro.fecha_2_dosis,
        provincia: this.centro.provincia,
        ciudad: this.centro.ciudad,
        recinto: this.centro.recinto,
        btn_text: 'Confirmar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result==='confirmar'){
        this.guardarRegistro();
        this.router.navigate(['/buscar_paciente'])
      }      
    });
  }

  comprobrarDosis(){
    for (let r of this.registros){
      if (this.paciente.id === r.id_paciente){
        if(r.num_dosis_aplicadas == 1){
          this.isDis[0] = true;
          this.isDis[1] = false;
          this.button = 'Actualizar'
          this.registro = r;
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
