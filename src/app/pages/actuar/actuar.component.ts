import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ApiService } from 'app/core/api/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-actuar',
  templateUrl: './actuar.component.html',
  styleUrls: ['./actuar.component.scss']
})
export class ActuarComponent implements OnInit {
  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
  drawerMode: 'side' | 'over';
  drawerOpened: boolean;
  menuData: FuseNavigationItem[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  selectedPanel;
  maestroDocumentos: any[] = [];
  detalleDocumentos: any[] = [];

  constructor(private _fuseMediaWatcherService: FuseMediaWatcherService, private _apiService: ApiService) {

    this.menuData = [
      {
          id      : 'fuse-components.components',
          title   : 'Estándar 7',
          type    : 'group',
          children: [
              {
                  id   : 'fuse-components.components.alert',
                  title: 'E.7.1.1 - Definir acciones de Promoción y Prevención con base en resultados del Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST', 
                  type : 'basic',
                  link : '/sgsst/actuar/indice/E.7.1.1'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.7.1.2 - Toma de medidas correctivas, preventivas y de mejora',
                  type : 'basic',
                  link : '/sgsst/actuar/indice/E.7.1.2'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.7.1.3 - Ejecución de acciones preventivas, correctivas y de mejora de la investigación de incidentes, accidentes de trabajo y enfermedad laboral',
                  type : 'basic',
                  link : '/sgsst/actuar/indice/E.7.1.3'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.7.1.4 - Implementar medidas y acciones correctivas de autoridades y de ARL',
                  type : 'basic',
                  link : '/sgsst/actuar/indice/E.7.1.4'
              }
          ]
      }
    ]; 

  }

  ngOnInit(): void {
    // Subscribe to media query change
    this._fuseMediaWatcherService.onMediaChange$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(({matchingAliases}) => {

    // Set the drawerMode and drawerOpened
    if ( matchingAliases.includes('md') )
    {
      this.drawerMode = 'side';
      this.drawerOpened = true;
    }
    else
    {
      this.drawerMode = 'over';
      this.drawerOpened = false;
    }
    });
    this.getDetalleDocumento();
    this.getMaestroDocumento();
  }

  
  setTituloChild(){
  }

  getMaestroDocumento(){
    const nombreQuery ='maestroDocumento';
    const queryParams='search:""';
    const queryProps='id,codigo,seccion,estandar,nombre,nombre_corto,ubicacion,tipo_documento,enlace_modelo,sistema,observaciones,estado,detalleDocumento{id}';

    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.maestroDocumentos = response.data.maestroDocumentos;
     });
}

getDetalleDocumento(){
  const nombreQuery ='detalleDocumento';
  const queryParams='search:""';
  const queryProps='id';

  this._apiService.getData(queryProps,queryParams,nombreQuery).
  subscribe((response) => {
      this.detalleDocumentos = response.data.detalleDocumentos;
   });
}


      /**
     * On destroy
     */
       ngOnDestroy(): void
       {
           // Unsubscribe from all subscriptions
           this._unsubscribeAll.next(null);
           this._unsubscribeAll.complete();
       }



}
