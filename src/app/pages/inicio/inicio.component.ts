import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { ApiService } from 'app/core/api/api.service';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { EventoModalComponent } from 'app/modals/eventoModal/evento-modal.component';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  selectedProject: string = 'ACME Corp. Backend App';
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'abc', 'porcentaje'];
  dataEmpresas: any[] = [];
  menuData: FuseNavigationItem[];
  ultimosCambios: any[] = [];
  dataDetalleDocumentos: any[] = [];
  user: User;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  calendario:any[] = [];
  dataEventos:any[]=[];

  constructor(private _apiService: ApiService, private _router:Router, private _userService: UserService,public _dialog: MatDialog,private _navigationService:NavigationService) {

    this.calendario = [
      {
        nombre:"Asignación Responsable del SG-SST",
        fecha:"12-12-2020",
        estado:2
      },
      {
        nombre:"Manual de vresponsabilidades en SST",
        fecha:"12-12-2020",
        estado:1
      },
      {
        nombre:"Formato de asignación de recursos ",
        fecha:"12-12-2020",
        estado:1
      },
      {
        nombre:"Certificados de afiliación EPS,ARL,AFP  y  CCF",
        fecha:"12-12-2020",
        estado:2
      },
    ]

    this.ultimosCambios = [
      {
        archivo:'Nombre del archivo',
        hora:'12:40am',
        lugar:'Cúcuta, Colombia'
      },
      {
        archivo:'fddsdfsdfg.xls',
        hora:'12:40am',
        lugar:'Cúcuta, Colombia'
      },
      {
        archivo:'Este_es_mi_archivo.pdf',
        hora:'12:40am',
        lugar:'Cúcuta, Colombia'
      },
      {
        archivo:'matriz.xls',
        hora:'12:40am',
        lugar:'Cúcuta, Colombia'
      },
      {
        archivo:'ejemplo.pdf',
        hora:'12:40am',
        lugar:'Cúcuta, Colombia'
      },
      {
        archivo:'dhfghjjkghkhjyfytu.pdf',
        hora:'12:40am',
        lugar:'Cúcuta, Colombia'
      }
    ]

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
                  link : '/planear/e1p1'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.2 - Responsabilidades en el Sistema de Gestión de Seguridad y Salud en el Trabajo – SG-SST',
                  type : 'basic',
                  link : '/ui/fuse-components/components/card'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.3 - Afiliación al Sistema General de Riesgos Laborales',
                  type : 'basic',
                  link : '/ui/fuse-components/components/card'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.4 - Pago de pensión trabajadores alto riesgo',
                  type : 'basic',
                  link : '/ui/fuse-components/components/card'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.5 - Conformación COPASST / Vigía',
                  type : 'basic',
                  link : '/ui/fuse-components/components/card'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.6 - Capacitación COPASST / Vigía',
                  type : 'basic',
                  link : '/ui/fuse-components/components/card'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.7 - Conformación Comité de Convivencia',
                  type : 'basic',
                  link : '/ui/fuse-components/components/card'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.1.8 - Conformación Comité de Convivencia',
                  type : 'basic',
                  link : '/ui/fuse-components/components/card'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.2.1 - Programa Capacitación promoción y prevención PYP',
                  type : 'basic',
                  link : '/ui/fuse-components/components/card'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.2.2 - Capacitación, Inducción y Reinducción en Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST, actividades de Promoción y Prevención PyP',
                  type : 'basic',
                  link : '/ui/fuse-components/components/card'
              },
              {
                  id   : 'fuse-components.components.card',
                  title: 'E1.2.3 - Responsables del Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST con curso (50 horas)',
                  type : 'basic',
                  link : '/ui/fuse-components/components/card'
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
                title: '2.1.1 - Política del Sistema de Gestión de Seguridad y Salud en el Trabajo SGSST firmada, fechada y comunicada al COPASST/Vigía',
                type : 'basic',
                link : '/ui/fuse-components/pipes/find-by-key'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.2.1 - Objetivos definidos, claros, medibles, cuantificables, con metas, documentados, revisados del SG-SST',
                type : 'basic',
                link : '/ui/fuse-components/pipes/find-by-key'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.3.1 - Evaluación e identificación de prioridades',
                type : 'basic',
                link : '/ui/fuse-components/pipes/find-by-key'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.4.1 - Plan que identifica objetivos, metas, responsabilidad, recursos con cronograma y firmado',
                type : 'basic',
                link : '/ui/fuse-components/pipes/find-by-key'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.5.1 - Archivo o retención documental del Sistema de Gestión en Seguridad y Salud en el Trabajo SG-SST',
                type : 'basic',
                link : '/ui/fuse-components/pipes/find-by-key'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.6.1 - Rendición sobre el desempeño',
                type : 'basic',
                link : '/ui/fuse-components/pipes/find-by-key'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.7.1 - Matriz legal',
                type : 'basic',
                link : '/ui/fuse-components/pipes/find-by-key'
              }, 
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.8.1 - Mecanismos de comunicación, auto reporte en Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST',
                type : 'basic',
                link : '/ui/fuse-components/pipes/find-by-key'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.9.1 - Identificación, evaluación, para adquisición de productos y servicios en Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST',
                type : 'basic',
                link : '/ui/fuse-components/pipes/find-by-key'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.10.1 - Evaluación y selección de proveedores y contratistas',
                type : 'basic',
                link : '/ui/fuse-components/pipes/find-by-key'
              },
              {
                id   : 'fuse-components.pipes.find-by-key',
                title: '2.11.1 - Evaluación del impacto de cambios internos y externos en el Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST',
                type : 'basic',
                link : '/ui/fuse-components/pipes/find-by-key'
              }

          ]
      }
  ];

  }

  getEmpresa(){
    const nombreQuery ='empresas';
    const queryParams='';
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
        //this.dataEmpresas = response.data.empresa;
     });
  }

  getAvatar(usuario_avatar){
    return `${environment.serverUrl}/fotos_perfil/${usuario_avatar}`;
}
  
  getDetalleDocumento(){
    const nombreQuery ='detalledocumentos';
    const queryParams='_tipoDocumento=Documento';
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
        this.dataDetalleDocumentos = response.rows;
     });
  }

  getUsuario(){
    // Subscribe to the user service
    this._userService.user$
    .pipe((takeUntil(this._unsubscribeAll)))
    .subscribe((user: User) => {
      this.user = user;
    });
  }

  getModulos(){
    // Subscribe to the user service
    this._userService._modulos$
    .pipe((takeUntil(this._unsubscribeAll)))
    .subscribe((modulos) => {
    });
  }


  getEventos(){
    const nombreQuery ='eventos';
    const queryParams=``;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
      this.dataEventos = response.rows;
      console.log(response);
     },
     error=>{
       console.log(error);
     }
     );
  }

  eventoModal(){
    const dialogRef = this._dialog.open(EventoModalComponent, {
      minWidth: '500px',
      maxHeight:'700px',
      data:{
      }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getEventos();
      this.dataEventos;
    });
  }

  irCalendario() {
    this._router.navigate([`/calendario`]);
  }

  irDetalleDocumento(indice) {
    this._router.navigate([`/planear/indice/${indice}`]);
  }

  ngOnInit(): void {
    /*







*/

    this.getEmpresa();
    this.dataEmpresas;

    this.getDetalleDocumento();
    this.dataDetalleDocumentos;

    this.getEventos();
    this.dataEventos;

    this.getUsuario();
    this.user;
    
    this.getModulos();



    this._navigationService.navigation$.subscribe((data)=>{
    });

  }

}
