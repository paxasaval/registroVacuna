import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-registro',
  templateUrl: './confirm-registro.component.html',
  styleUrls: ['./confirm-registro.component.css']
})
export class ConfirmRegistroComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      idPaciente: string,
      nombresPaciente: string,
      apellidosPaciente: string,
      fechaNacimientoPaciente: Date,
      domicilio: string,
      sexo: string,
      idProfesional: string,
      nombresProfesional: string,
      apellidosProfesional: string,
      nombreVacuna: string,
      dosis: string,
      fecha_1_dosis: Date,
      fecha_2_dosis: Date,
      provincia: string,
      ciudad: string,
      recinto: string,
      btn_text: string
    }) { }

  ngOnInit(): void {
    var time = this.data.fecha_1_dosis as Date
    console.log(document.getElementById('print'))
  }
  confirmar() {
    if (this.data.btn_text == "Imprimir") {
      window.print()
      this.dialogRef.close()
    }else{
      this.dialogRef.close('confirmar')
    }
    //this.dialogRef.close()
  }
}
