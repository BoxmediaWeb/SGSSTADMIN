import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/core/api/api.service';

@Component({
  selector: 'app-editar-password',
  templateUrl: './editar-password.component.html',
  styleUrls: ['./editar-password.component.scss']
})
export class EditarPasswordComponent implements OnInit {

  passwordForm = this._formBuilder.group({
    password_1       : [, [Validators.required]],
    password_2       : [, [Validators.required]],
  },
  {
    validator: this.ComparePassword("password_1", "password_2")
  });


  ComparePassword(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
  
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  setUser(){
    const nombreQuery =`user/${this.data.userId}`;

    const dataUsuario = {
      password_1:this.passwordForm.value.password_1
    }

    /*this._apiService.setData(nombreQuery,dataUsuario).
    subscribe((response) => {
      console.log("Esta es la respuesta de la data =>", response);
      this.cerrarModal();
     },
     error=>{
       console.log(error);
     }
     );*/
  }

  cerrarModal(){
    this.dialogRef.close({});
  }

  constructor(private _formBuilder: FormBuilder, private _apiService: ApiService,public dialogRef: MatDialogRef<EditarPasswordComponent>,@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

}
