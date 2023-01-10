import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-variable-confirmacion',
  templateUrl: './variable-confirmacion.component.html',
  styleUrls: ['./variable-confirmacion.component.scss']
})
export class VariableConfirmacionComponent implements OnInit {

  variablesDocumentos = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<VariableConfirmacionComponent>) { }

  cerrarModal(){
    this.dialogRef.close({});
  }

  cerrarModalGuardar(){
    this.dialogRef.close({generar:true});
  }

  ngOnInit(): void {
    this.variablesDocumentos = this.data.listaVariables;
  }

}
