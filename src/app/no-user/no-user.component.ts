import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-no-user',
  templateUrl: './no-user.component.html',
  styleUrls: ['./no-user.component.css']
})
export class NoUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NoUserComponent>,) { }

  ngOnInit(): void {
  }

  cancelar() {
    console.log('asdas')
    this.dialogRef.close();
  }

}
