import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ApiService } from 'app/core/api/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.scss']
})
export class VerificarComponent implements OnInit {
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
          title   : 'Estándar 6',
          type    : 'group',
          children: [
              {
                  id   : 'fuse-components.components.alert',
                  title: 'E.6.1.1 - Indicadores estructura, proceso y resultado', 
                  type : 'basic',
                  link : '/sgsst/verificar/indice/E.6.1.1'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.6.1.2 - La empresa adelanta auditoría por lo menos una vez al año',
                  type : 'basic',
                  link : '/sgsst/verificar/indice/E.6.1.2'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.6.1.3 - Revisión anual por la alta dirección, resultados y alcance de la auditoría',
                  type : 'basic',
                  link : '/sgsst/verificar/indice/E.6.1.3'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.6.1.4 - Planificar auditoría con el COPASST',
                  type : 'basic',
                  link : '/sgsst/verificar/indice/E.6.1.4'
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
