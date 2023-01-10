import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ApiService } from 'app/core/api/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hacer',
  templateUrl: './hacer.component.html',
  styleUrls: ['./hacer.component.scss']
})
export class HacerComponent implements OnInit {
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
          title   : 'Estándar 3',
          type    : 'group',
          children: [
              {
                  id   : 'fuse-components.components.alert',
                  title: 'E.3.1.1 - Evaluación Médica Ocupacional', 
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.1.1'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.1.2 - Actividades de Promoción y Prevención en Salud',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.1.2'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.1.3 -  Información al médico de los perfiles de cargo',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.1.3'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.1.4 - Realización de los exámenes médicos ocupacionales: preingreso, periódicos',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.1.4'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.1.5 - Custodia de Historias Clínicas',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.1.5'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.1.6 - Restricciones y recomendaciones médico laborales',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.1.6'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.1.7 - Estilos de vida y entornos saludables (controles tabaquismo, alcoholismo, farmacodependencia y otros)',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.1.7'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.1.8 - Agua potable, servicios sanitarios y disposición de basuras',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.1.8'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.1.9 - Eliminación adecuada de residuos sólidos, líquidos o gaseosos',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.1.9'
              },
              {
                id   : 'fuse-components.components.card',
                title: 'E.3.2.1 -  Reporte de los accidentes de trabajo y enfermedad laboral a la ARL, EPS y Dirección Territorial del Ministerio de Trabajo',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.3.2.1'
              },
              {
                id   : 'fuse-components.components.card',
                title: 'E.3.2.2 - Investigación de Accidentes, Incidentes y Enfermedad Laboral',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.3.2.2'
              },
              {
                id   : 'fuse-components.components.card',
                title: 'E.3.2.3 - Registro y análisis estadístico de Incidentes, Accidentes de Trabajo y Enfermedad Laboral',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.3.2.3'
              },
              {
                id   : 'fuse-components.components.card',
                title: 'E.3.3.1 - Medición de la severidad de los Accidentes de Trabajo y Enfermedad Laboral',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.3.3.1'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.3.2 - Medición de la frecuencia de los Incidentes, Accidentes de Trabajo y Enfermedad Laboral',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.3.2'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.3.3 - Medición de la mortalidad de Accidentes de Trabajo y Enfermedad Laboral',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.3.3'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.3.4 - Medición de la prevalencia de incidentes, Accidentes de Trabajo y Enfermedad Laboral',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.3.4'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.3.5 - Medición de la incidencia de Incidentes, Accidentes de Trabajo y Enfermedad Laboral',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.3.5'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E.3.3.6 - Medición del ausentismo por incidentes, Accidentes de Trabajo y Enfermedad Laboral',
                  type : 'basic',
                  link : '/sgsst/hacer/indice/E.3.3.6'
              }
          ]
      },
      {
          id      : 'fuse-components.pipes',
          title   : 'Estándar 4',
          type    : 'group',
          children: [
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E.4.1.1 -  Metodología para la identificación, evaluación y valoración de peligros',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.4.1.1'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E.4.1.2 - Objetivos definidos, claros, medibles, cuantificables, con metas, documentados, revisados del SG-SST',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.4.1.2'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E.4.1.3 - Evaluación e identificación de prioridades',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.4.1.3'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E.4.1.4 - Plan que identifica objetivos, metas, responsabilidad, recursos con cronograma y firmado',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.4.1.4'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E.4.2.1 - Archivo o retención documental del Sistema de Gestión en Seguridad y Salud en el Trabajo SG-SST',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.4.2.1'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E.4.2.2 - Rendición sobre el desempeño',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.4.2.2'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E.4.2.3 - Matriz legal',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.4.2.3'
              }, 
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E.4.2.4 - Mecanismos de comunicación, auto reporte en Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.4.2.4'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E.4.2.5 - Identificación, evaluación, para adquisición de productos y servicios en Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.4.2.5'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E.4.2.6 - Evaluación y selección de proveedores y contratistas',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.4.2.6'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.11.1 - Evaluación del impacto de cambios internos y externos en el Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.2.11.1'
              }
          ]
      },
      {
          id      : 'fuse-components.pipes',
          title   : 'Estándar 5',
          type    : 'group',
          children: [
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E.5.1.1 -  Se cuenta con el Plan de Prevención y Preparación ante emergencias',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.5.1.1'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: 'E.5.1.2 - Brigada de prevención conformada, capacitada y dotada',
                type : 'basic',
                link : '/sgsst/hacer/indice/E.5.1.2'
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
  }

}
