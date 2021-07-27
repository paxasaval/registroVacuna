import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesional } from '../models/profesional';
import { ProfesionalesService } from '../service/profesionales.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profesionales: Profesional[] = [];
  profesional: Profesional = {} ;
  c_i = "";
  pass = "";
  aux: any[] = [];

  constructor(private route:Router, public profesionalesService: ProfesionalesService) { }

  ngOnInit(): void {
    this.profesionalesService.getAllProfesional().subscribe(profesionales => {
      this.profesionales = profesionales;
    })
  }

  login(){
    var usuario = false;
    var password = false;

    this.profesional.c_i = this.c_i;

    this.profesionalesService.getProfesionalByCI(this.profesional).subscribe(
      result =>{
        this.aux = result;
        this.profesional = this.aux[0];
        if(this.profesional.c_i != undefined){
          usuario = true;
          if (this.profesional.contrasena === this.pass){
            password = true;
          }
          if (usuario && password){
            localStorage.setItem("profesional.c_i", this.profesional.c_i);
            localStorage.setItem("profesional.nombres", this.profesional.nombres!);
            this.route.navigate(['/registro_vacuna']);
          }
        }
      }
    );
  }
}
