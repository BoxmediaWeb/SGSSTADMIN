import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ApiService } from 'app/core/api/api.service';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-planear',
  templateUrl: './planear.component.html',
  styleUrls: ['./planear.component.scss']
})
export class PlanearComponent implements OnInit {
  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
  drawerMode: 'side' | 'over';
  drawerOpened: boolean;
  menuData: FuseNavigationItem[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  selectedPanel;
  maestroDocumentos: any[] = [];
  detalleDocumentos: any[] = [];

  constructor(private _fuseMediaWatcherService: FuseMediaWatcherService, private _apiService: ApiService,private sanitizer: DomSanitizer) {

    this.menuData = [
      {
          id      : 'fuse-components.components',
          title   : 'Estándar 1',
          type    : 'group',
          children: [
              {
                  id   : 'fuse-components.components.alert',
                  title: 'E1.1.1 - Responsable del Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST', 
                  type : 'basic',
                  link : '/sgsst/planear/indice/E.1.1.1'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.2 - Responsabilidades en el Sistema de Gestión de Seguridad y Salud en el Trabajo – SG-SST',
                  type : 'basic',
                  link : '/sgsst/planear/indice/E.1.1.2'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.3 - Afiliación al Sistema General de Riesgos Laborales',
                  type : 'basic',
                  link : '/sgsst/planear/indice/E.1.1.3'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.4 - Pago de pensión trabajadores alto riesgo',
                  type : 'basic',
                  link : '/sgsst/planear/indice/E.1.1.4'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.5 - Conformación COPASST / Vigía',
                  type : 'basic',
                  link : '/sgsst/planear/indice/E.1.1.5'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.6 - Capacitación COPASST / Vigía',
                  type : 'basic',
                  link : '/sgsst/planear/indice/E.1.1.6'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.7 - Conformación Comité de Convivencia',
                  type : 'basic',
                  link : '/sgsst/planear/indice/E.1.1.7'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.8 - Conformación Comité de Convivencia',
                  type : 'basic',
                  link : '/sgsst/planear/indice/E.1.1.8'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.2.1 - Programa Capacitación promoción y prevención PYP',
                  type : 'basic',
                  link : '/sgsst/planear/indice/E.1.2.1'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.2.2 - Capacitación, Inducción y Reinducción en Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST, actividades de Promoción y Prevención PyP',
                  type : 'basic',
                  link : '/sgsst/planear/indice/E.1.2.2'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.2.3 - Responsables del Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST con curso (50 horas)',
                  type : 'basic',
                  link : '/sgsst/planear/indice/E.1.2.3'
              }
          ]
      },
      {
          id      : 'fuse-components.pipes',
          title   : 'Estándar 2',
          type    : 'group',
          children: [
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E2.1.1 - Política del Sistema de Gestión de Seguridad y Salud en el Trabajo SGSST firmada, fechada y comunicada al COPASST/Vigía',
                type : 'basic',
                link : '/sgsst/planear/indice/E.2.1.1'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E2.2.1 - Objetivos definidos, claros, medibles, cuantificables, con metas, documentados, revisados del SG-SST',
                type : 'basic',
                link : '/sgsst/planear/indice/E.2.2.1'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.3.1 - Evaluación e identificación de prioridades',
                type : 'basic',
                link : '/sgsst/planear/indice/E.2.3.1'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.4.1 - Plan que identifica objetivos, metas, responsabilidad, recursos con cronograma y firmado',
                type : 'basic',
                link : '/sgsst/planear/indice/E.2.4.1'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.5.1 - Archivo o retención documental del Sistema de Gestión en Seguridad y Salud en el Trabajo SG-SST',
                type : 'basic',
                link : '/sgsst/planear/indice/E.2.5.1'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.6.1 - Rendición sobre el desempeño',
                type : 'basic',
                link : '/sgsst/planear/indice/E.2.6.1'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.7.1 - Matriz legal',
                type : 'basic',
                link : '/sgsst/planear/indice/E.2.7.1'
              }, 
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.8.1 - Mecanismos de comunicación, auto reporte en Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST',
                type : 'basic',
                link : '/sgsst/planear/indice/E.2.8.1'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.9.1 - Identificación, evaluación, para adquisición de productos y servicios en Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST',
                type : 'basic',
                link : '/sgsst/planear/indice/E.2.9.1'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.10.1 - Evaluación y selección de proveedores y contratistas',
                type : 'basic',
                link : '/sgsst/planear/indice/E.2.10.1'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.11.1 - Evaluación del impacto de cambios internos y externos en el Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST',
                type : 'basic',
                link : '/sgsst/planear/indice/E.2.11.1'
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
        console.log("Estos son los maestros documentos:");
        console.log(response.data);
     });
}

getDetalleDocumento(){
  const nombreQuery ='detalleDocumento';
  const queryParams='search:""';
  const queryProps='id';

  this._apiService.getData(queryProps,queryParams,nombreQuery).
  subscribe((response) => {
      this.detalleDocumentos = response.data.detalleDocumentos;
      console.log("Estos son los maestros documentos:");
      console.log(response.data);
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
