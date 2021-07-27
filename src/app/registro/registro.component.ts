import { ConfirmRegistroComponent } from './../confirm-registro/confirm-registro.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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
