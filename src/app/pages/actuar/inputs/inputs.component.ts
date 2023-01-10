import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/core/api/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {

  agregar = false;

  entradaForm = this._formBuilder.group({
    nombre     : [, [Validators.required]],
    tipo     : [, [Validators.required]],
  });

  constructor(private _apiService: ApiService,private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  entradas$ = new Subject();
  entradas:any=[];


  inputs =[
    {
    nombre:"dfsdfdsfdsf",
    tipo:"texto",
    codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
    {
      nombre:"dfsdfdsfdsf",
      tipo:"texto",
      codigo:"0000459465465"
    },
  ];

  tipos = [
    {
      id:"1",
      nombre:"Tipo 1"
    }
  ];

  agregarCambio(){
    this.agregar = this.agregar==false?true:false;
  }

  getContenido(){
    const nombreQuery ='entrada';
    const queryParams=`search:""`;
    const queryProps='id,nombre,tipo';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.entradas$.next(response.data.entrada);
     });
  }

  
  setEvento(){
    const data = this.entradaForm.value;
    const nombre = data.nombre ?  `nombre: "${data.nombre}",` : '';
    const tipo = data.tipo ?  `tipo: "${data.tipo}",` : '';

    const nombreQuery='entrada';
    const queryParams=`${nombre}${tipo}`;
    const queryProps='id';

    this._apiService.setData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
      this.entradaForm.reset();
      this.agregar = false;
      this.getContenido();

        this._snackBar.open('Guardado', null, {
          duration: 4000
        });
     },
     error => {
      console.log(error);

      this._snackBar.open('Error', null, {
        duration: 4000
      });
    }
     
     );
    }

  ngOnInit(): void {

    this.entradas$.subscribe((data:any)=>{
      this.entradas = data
    });

    this.getContenido();
  }

}
