import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { environment } from 'environments/environment';
import { filter } from 'rxjs';
import { CrearRoleComponent } from '../crear-role/crear-role.component';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})
export class PermisosComponent implements OnInit {
  dataModulos:any[]=[];
  modulosActivados = {}
  roleId: string;
  dataRoles: any;
  dataPermisos: any[];

  constructor(private _apiService: ApiService,private _router:Router,private _activatedRoute: ActivatedRoute) { }


  getModulos(){
    const nombreQuery=`modulos`;
    const queryParams=``;

    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
        this.dataModulos = response.rows;

        response.rows.map((data)=>{
          this.modulosActivados[`${data.title}`]=false;
        });

        this.getModulosCreados();

        console.log("Módulos activados =>",this.modulosActivados);

     }, error => {
       console.log("El error es", error);
     });
  }

  geRoles(){
    const nombreQuery=`roles/${this.roleId}`;
    const queryParams=``;

    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
        console.log("Roles devueltos devueltos =>", response);
        this.dataModulos = response.Modulos
        this.dataPermisos = response.Permisos

     }, error => {
       console.log("El error es", error);
     });
  }

  getModulosCreados(){
    const nombreQuery=`login/authuser`;
    const queryParams=``;

    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {

      response.Role.Modulos.map((data)=>{
        if(this.modulosActivados[data.title] !== 'undefined'){
          this.modulosActivados[data.title]=true;
        }
      });

     }, error => {
       console.log("El error es", error);
     });
  }

  
  editarPermisos(){
    const nombreQuery =`roles/resetpermisos/${this.roleId}`;

    var permisos=[];
    
    this.dataPermisos.map((data)=>{
      permisos.push({});
    });



    var dataRoles = {
    }

    this._apiService.postQuery(nombreQuery,dataRoles).
    subscribe((response) => {
      console.log("Editar usuarios",response);
     },
     error=>{
       console.log(error);
     }
     );
  }

  guardar(){
    this.editarPermisos();
  }

  ngOnInit(): void {
    //this.getModulos();
    //this.dataModulos;

    this._activatedRoute.parent.firstChild.paramMap.subscribe((params) => {
      this.roleId=params.get('id');
      this.geRoles();
      this.dataRoles;
    });


  }

}
