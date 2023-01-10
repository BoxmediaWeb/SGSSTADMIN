import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { CrearRoleComponent } from '../crear-role/crear-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  dataModulos:any[]=[];
  dataRoles:any[]=[];
  modulosActivados = {}

  constructor(private _apiService: ApiService, private _router:Router,public _dialog: MatDialog) { }

  getModulos(){
    const nombreQuery='modulos';
    const queryParams=``;

    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
        this.dataModulos = response.rows;

        response.rows.map((data)=>{
          this.modulosActivados[`${data.titulo}`]=true;
        });
        
        console.log("Módulos activados =>",this.modulosActivados);

     }, error => {
       console.log("El error es", error);
     });
  }

  getRoles(){
    const nombreQuery='roles';
    const queryParams=``;

    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
        this.dataRoles = response.rows;
        console.log("roles devueltos", response);

     }, error => {
       console.log("El error es", error);
     });
  }

  guardar(){
    console.log("Estos son los permisos almacenados =>", this.modulosActivados);
  }

  irPermisos(role){
    this._router.navigate([`usuarios/permiso/role/${role.id}`]);
  }

  crearRolesModal(){
    const dialogRef = this._dialog.open(CrearRoleComponent, {
      maxWidth: '700px',
      //height: '100%',
      panelClass: "dialog-responsive",
      data:{
      }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getRoles();
      this.dataRoles;
    });
  }

  ngOnInit(): void {
    this.getRoles();
    this.dataRoles;

    this.getModulos();
    this.dataModulos;
  }

}
