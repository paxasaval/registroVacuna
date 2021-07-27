import { NoUserComponent } from './../no-user/no-user.component';
import { Vacuna } from './../models/vacuna';
import { Registro } from './../models/registro';
import { Centro } from './../models/centro';
import { Profesional } from './../models/profesional';
import { RegistroService } from './../service/registro.service';
import { PacienteService } from './../service/paciente.service';
import { ProfesionalesService } from './../service/profesionales.service';
import { CentrosService } from './../service/centros.service';
import { VacunaService } from './../service/vacuna.service';
import { Paciente } from './../models/paciente';
import { ConfirmRegistroComponent } from './../confirm-registro/confirm-registro.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

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
  bandera: boolean = false;

  idPaciente = '';


  constructor(private dialog: MatDialog,
    private vacunaService: VacunaService,
    private centroService: CentrosService,
    private profesionalService: ProfesionalesService,
    private pacienteService: PacienteService,
    private registroService: RegistroService,
    ) { }

  ngOnInit(): void {
    this.llenarCollections();
  }

  openDialogError() {
    const dialogRef = this.dialog.open(NoUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  findPaciente(ob: Event){
    console.log(this.idPaciente)
    this.fetchPaciente();
    //ejecutar
  }
  openInfo(){
    if(this.bandera){
      this.openDialog()
    }else{
      this.openDialogError()
    }
  }

  fetchPaciente(){
    this.bandera=false;
    /*this.paciente.c_i = this.idPaciente
    /*this.pacienteService.getPacienteById(this.paciente).subscribe(
      result => {
        let aux: any[] = result;
        if(aux[0] != undefined){
          this.paciente = aux[0]
          this.bandera = true;
          //ejecutar fetch(s)
          //this.openDialog()
        }else{
          //this.openDialogError()
        }
      }
    )*/
    this.paciente.c_i = this.idPaciente;
    this.pacienteService.getAllPaciente().subscribe(
      result => {
        this.pacientes = result;
        for (let p of this.pacientes){
          if(this.paciente.c_i === p.c_i){
              this.paciente.id = p.id;
              this.paciente = p;
              this.bandera = true;
              this.fetchRegistro();
              this.fetchVacuna();
              this.fetchProfesional();
              this.fetchRecinto();
          }else{
              //this.bandera = false
              this.idPaciente = ''
          }
        }
      }
    )
  }
  fetchRegistro(){
    //Aqui llenar objeto registro usando datos del paciente en obj paciente
    for(let r of this.registros){
      if(r.id_paciente === this.paciente.id){
        this.registro = r;
      }
    }
  }
  fetchVacuna(){
    //Aqui llenar obj Vacuna
    for (let v of this.vacunas){
      if(v.id === this.registro.id_vacuna){
        this.vacuna = v;
      }
    }
  }
  fetchRecinto(){
    //Aqui llenar obj Recinto
    for (let c of this.centros){
      if(c.id === this.registro.id_centro){
        this.centro = c;
      }
    }
  }
  fetchProfesional(){
    //Aqui llenar obj profesional usar localstorage
    for(let p of this.profesionales){
      if(p.id === this.registro.id_profesional){
        this.profesional = p;
      }
    }
  }
  llenarCollections(){
    this.profesionalService.getAllProfesional().subscribe(
      result => {
        this.profesionales = result;
      }
    )
    this.registroService.getRegistros().subscribe(
      result => {
        this.registros = result;
      }
    )
    this.pacienteService.getAllPaciente().subscribe(
      result => {
        this.pacientes = result;
      }
    )
    this.centroService.getAllCentro().subscribe(
      result => {
        this.centros = result;
      }
    )
    this.vacunaService.getAllVacuna().subscribe(
      result => {
        this.vacunas = result;
      }
    )
  }

  openDialog(){
    //llamar funcion para llenar vacuna y recinto
   
    //this.obtenerVacunaCentro();
    const dialogRef = this.dialog.open(ConfirmRegistroComponent, {
      
      data: { 
        btn_text: 'Imprimir',
        
        idPaciente: this.paciente.c_i,
        nombresPaciente: this.paciente.nombres,
        apellidosPaciente: this.paciente.apellidos,
        fechaNacimientoPaciente: this.paciente.fecha_nacimiento,
        domicilio: this.paciente.domicilio,
        sexo: this.paciente.sexo,
        idProfesional: this.profesional.c_i,
        nombresProfesional: this.profesional.nombres,
        apellidosProfesional: this.profesional.apellidos,
        nombreVacuna: this.vacuna.nombreVacuna,
        dosis: "Nro dosis",
        fecha_1_dosis: this.registro.fecha_1_dosis,
        fecha_2_dosis: this.registro.fecha_2_dosis,
        provincia: this.centro.provincia,
        ciudad: this.centro.ciudad,
        recinto: this.centro.recinto
      }
      
    });

}
}
