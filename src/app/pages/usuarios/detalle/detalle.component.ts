import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ApiService } from 'app/core/api/api.service';
import { ConfirmacionService } from 'app/servicios/confirmacion.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  dataUsers: any[] = [];
  dataPerfiles: any[] = [];

  search_nombre="";
  limit=10;
  offset=0;
  items_totales=0;
  pagina = 1;

  displayedColumns: string[] = ['id','avatar','name', 'nick','email','rol','acciones'];
  dataRoles: any;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _apiService: ApiService,
    private _router:Router,
    private _snackBar: MatSnackBar,
    private _confirmacionServicer: ConfirmacionService,
  ) { }
  
  getUser(){
    const nombreQuery='users';
    const queryParams=``;

    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
        this.dataUsers = response.rows;
        console.log("Data usuarios=>",response);
     }, error => {
       console.log("El error es", error);
     });
  }


  getPerfil(){
    const nombreQuery='perfil';
    const queryParams=`search:""`;
    const queryProps=`id,nombres,user{id}`;

    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.dataPerfiles = response.data.user;
        console.log("Data de los perfiles=>",response.data.perfil);
     }, error => {
       console.log("El error es", error);
     });
  }


  modalConfirmacionBorrar(usuario): void
  {
      // Abrir un diálogo con texto genérico
      const dialogRef = this._confirmacionServicer.open();

      dialogRef.afterClosed().subscribe((result) => {
          console.log(result);
          if(result=="confirmed"){
            this.deleteUser(usuario)
          }else{
            console.log("Ha cancelado la operación");
          }
      });
  }


  irEditar(element) {
    var tipoRuta:string;

    switch (element.role) {
      case 'conductor':
        tipoRuta = "conductores"
        break;

      case 'cliente':
        tipoRuta = "clientes"
        break;

      case 'vendedor':
        tipoRuta = "vendedores"
        break;

    }

    this._router.navigate([`/usuarios/editar/usuarios/${element.id}`]);
  }


  deleteUser(user){
    const nombreQuery =`users/${user.id}`;
    const queryParams = '';
    
  
    this._apiService.deleteQuery(nombreQuery,'').
    subscribe((response) => {
      console.log("Esta es la respuesta de la data =>", queryParams);
      this.getUser();
     },
     error=>{
       console.log(error);
     }
     );
  }

  

  irAVista(vista) {
    this._router.navigate([`usuarios/crear/usuarios`]);
  }

  irPerfil(user) {
    this._router.navigate([`usuarios/editar/${user.id}`]);
  }

  getAvatar(avatar){
    return `${environment.serverUrl}/fotos_perfil/${avatar}`;
  }

  pageChange(evt: PageEvent){
    this.limit = evt.pageSize;
    this.offset = evt.pageSize * evt.pageIndex;
    this.getUser();
    this.dataUsers;
  }

  getImgAvatar(avatar):string{
    return `${environment.NodeServerUrl}/images/avatars/${avatar}`;
  }

  ngOnInit(): void {
    this.getUser();
    this.dataUsers;

    //this.getPerfil();
    //this.dataPerfiles;
  }

}
