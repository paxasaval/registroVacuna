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

  paciente: Paciente = {}
  profesional: Profesional = {}
  centro: Centro = {}
  registro: Registro = {}
  vacuna: Vacuna = {}

  idPaciente = '';


  constructor(private dialog: MatDialog,
    private vacunaService: VacunaService,
    private centroService: CentrosService,
    private profesionalService: ProfesionalesService,
    private pacienteService: PacienteService,
    private registroService: RegistroService,
    ) { }

  ngOnInit(): void {
  }

  openDialogError() {
    const dialogRef = this.dialog.open(NoUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  fetchPaciente(){
    this.paciente.c_i = this.idPaciente
    this.pacienteService.getPacienteById(this.paciente).subscribe(
      result => {
        let aux: any[] = result;
        if(aux[0] != undefined){
          this.paciente = aux[0]
          //ejecutar fetch(s)
          this.openDialog()

        }else{
          this.openDialogError()
        }
      }
    )
  }
  fetchRegistro(){
    //Aqui llenar objeto registro usando datos del paciente en obj paciente
  }
  fetchVacuna(){
    //Aqui llenar obj Vacuna
  }
  fetchRecinto(){
    //Aqui llenar obj Recinto
  }
  fetchProfesional(){
    //Aqui llenar obj profesional usar localstorage
  }
  

  openDialog(){
    //llamar funcion para llenar vacuna y recinto
   
    //this.obtenerVacunaCentro();
    const dialogRef = this.dialog.open(ConfirmRegistroComponent, {
      
      data: { 
        btn_text: 'Imprimir'
        /*
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
        recinto: this.centro.recinto
        */
      }
      
    });

}
}
