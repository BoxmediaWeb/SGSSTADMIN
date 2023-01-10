import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/core/api/api.service';
import { RolesComponent } from '../roles/roles.component';

@Component({
  selector: 'app-crear-role',
  templateUrl: './crear-role.component.html',
  styleUrls: ['./crear-role.component.scss']
})
export class CrearRoleComponent implements OnInit {

  eventoForm = this._formBuilder.group({
    nombre     : [, [Validators.required]],
    descripcion     : [, [Validators.required]]
  });

  constructor(private _formBuilder: FormBuilder, private _apiService: ApiService,private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<RolesComponent>) { }

  guardar(){
    var data = this.eventoForm.value;

    const datRole = {
      nombre : data.nombre,
      descripcion : data.descripcion,
    }

    const nombreQuery='roles';

    this._apiService.postQuery(nombreQuery,datRole).
    subscribe((response) => {
        console.log("Respuesta de la mutación:");
        console.log(response);

        this.cerrarModal();

        this._snackBar.open('Guardado', null, {
          duration: 4000
        });

        //this.cerrarModal();
     },
     error => {
      console.log(error);

      this._snackBar.open('Error', null, {duration: 4000});
      });
  }

  cerrarModal(){
    this.dialogRef.close({});
  }

  ngOnInit(): void {
  }

}
