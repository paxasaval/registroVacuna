import { NoUserComponent } from './../no-user/no-user.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesional } from '../models/profesional';
import { ProfesionalesService } from '../service/profesionales.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profesionales: Profesional[] = [];
  profesional: Profesional = {};
  c_i = "";
  pass = "";
  aux: any[] = [];

  constructor(private route: Router,
    public profesionalesService: ProfesionalesService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.profesionalesService.getAllProfesional().subscribe(profesionales => {
      this.profesionales = profesionales;
    })
  }

  abrirDialog(): void {
    const nuevo_proceso = this.dialog.open(NoUserComponent);

    nuevo_proceso.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

  login() {
    var usuario = false;
    var password = false;
    this.profesional.c_i = this.c_i


    this.profesionalesService.getProfesionalByCI(this.profesional).subscribe(
      result => {
        this.aux = result;
        this.profesional = this.aux[0];
        console.log((this.aux[0]))
        if (this.aux[0] != undefined) {
          usuario = true;
          if (this.profesional != undefined) {
            if (this.profesional.contrasena! === this.pass) {
              password = true;
            }
            if (usuario && password) {
              localStorage.setItem("profesional.c_i", this.profesional.c_i!);
              localStorage.setItem("profesional.nombres", this.profesional.nombres!);
              this.profesionalesService.setUserSub();
              this.route.navigate(['/buscar_paciente']);
            }
          }

        }else{
          console.log('asdasd')
          this.profesionales = [];
          this.profesional={};
          this.c_i = "";
          this.pass = "";
          this.aux = [];
          this.abrirDialog();
        }
      }
    );
  }
}
