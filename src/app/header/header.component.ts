import { ProfesionalesService } from './../service/profesionales.service';
import { Profesional } from './../models/profesional';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profesional: Profesional= {};

  constructor(private profesionalService: ProfesionalesService) { }

  ngOnInit(): void {

    this.profesionalService.$userSub.subscribe(()=>{
      this.profesional.c_i = localStorage.getItem('profesional.c_i')!;
      this.profesional.nombres = localStorage.getItem('profesional.nombres')!;
    })
  }


}
