import { NoUserComponent } from './../no-user/no-user.component';
import { Paciente } from './../models/paciente';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from './../service/paciente.service';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-registro-vacuna',
  templateUrl: './registro-vacuna.component.html',
  styleUrls: ['./registro-vacuna.component.css']
})
export class RegistroVacunaComponent implements OnInit {

  paciente: Paciente = {};
  pacienteNuevo: Paciente = {};
  aux: any[] = [];
  idPaciente: string ='';

  constructor(private route: Router,
    private pacienteService: PacienteService,
    private dialog: MatDialog) {

  }


  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(NoUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  findPaciente() {
    this.paciente.c_i = this.idPaciente
    this.pacienteService.getPacienteById(this.paciente).subscribe(
      result => {
        this.aux = result;
        if(this.aux[0] != undefined){
          this.paciente = this.aux[0];
          localStorage.setItem("paciente.c_i", this.paciente.c_i!);
          this.route.navigate(['/registro_form']);
        }
        else{
          this.openDialog()
        }
      },
      error => {
        console.log(error)

      }
    );
  }
}
