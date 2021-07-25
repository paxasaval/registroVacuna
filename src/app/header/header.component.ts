import { ProfesionalesService } from './../service/profesionales.service';
import { Profesional } from './../models/profesional';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profesional: Profesional= {
    nombres: 'Sofia Becerra'
  }

  constructor(private profesionalService: ProfesionalesService) { }

  ngOnInit(): void {

    /*
      this.profesionalService.getProfesionalById().subscribe(
        result => {
          console.log(result)
          this.profesional = result
        })


    */
    this.profesionalService.getProfesionalById()
  }


}
