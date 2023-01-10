import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ApiService } from 'app/core/api/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.scss']
})
export class ContenedorComponent implements OnInit {
  panels: any[] = [];
  dataUsers: any[] = [];
  dataRoles: any[] = [];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _apiService: ApiService,
    private _router:Router,
  ) { }



  getUser(){
    const nombreQuery='user';
    const queryParams=`search:""`;
    const queryProps=`id,name,email,avatar`;

    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.dataUsers = response.data.user;
        console.log("Data usuarios=>",response.data.user);
     }, error => {
       console.log("El error es", error);
     });
  }

  getRole(){
    const nombreQuery='role';
    const queryParams=`search:""`;
    const queryProps=`id,nombre,descripcion`;

    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.dataRoles = response.data.role;
        console.log("Lista de roles =>", response.data.role);
     }, error => {
       console.log("El error es", error);
     });
  }

  pageChange(event: PageEvent) {
}

  ngOnInit(): void {
    this.getUser();
    this.dataUsers;

    this.getRole();
    this.dataRoles;
  }

}
