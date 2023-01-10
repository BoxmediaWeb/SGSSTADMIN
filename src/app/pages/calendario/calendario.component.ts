import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ApiService } from 'app/core/api/api.service';
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EventoModalComponent } from 'app/modals/eventoModal/evento-modal.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  eventos=[];
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild('matDrawer') drawer: MatDrawer;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private emisor:Subject<any> = new Subject<any>();
  private eventosFecha$:Subject<any> = new Subject<any>();

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  fecha_seleccionada:any;
  eventosFecha:any[]=[];
  dataEventos:any[]=[];

  calendarOptions: CalendarOptions;


  actualizarDatosFecha(){
    this.eventosFecha$.next(
      this.dataEventos.filter(
        data=>{
          return data.fecha.split(" ").slice(0, 1).shift()==this.fecha_seleccionada;
        }
      ));
  }

  clickFecha(evento){
    this.fecha_seleccionada=evento.dateStr;

    this.actualizarDatosFecha();
    this.drawer.toggle();
  }

  semana:any=[
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ];
  
  constructor(private _apiService:ApiService,private _fuseMediaWatcherService: FuseMediaWatcherService,private _changeDetectorRef: ChangeDetectorRef,public _dialog: MatDialog) { }

  eventoModal(evento=null){
    const dialogRef = this._dialog.open(EventoModalComponent, {
      minWidth: '500px',
      maxHeight:'700px',
      data:{
        fechaSeleccionada:evento?null:this.fecha_seleccionada,
        evento:evento
      }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getEventos();
      this.eventos;

      /*
      this.getEventosSeleccionado();
      this.eventosFecha;*/

      this.drawer.toggle();
      //this.actualizarDatosFecha();

    });
  }

  getEventosSeleccionado(){
    const nombreQuery ='eventos';
    const queryParams=`fecha=${moment(this.fecha_seleccionada).format('YYYY-MM-DD')}`;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
      //this.eventosFecha = response.data.evento;
      this.eventosFecha$.next(response.rows);

     },
     error=>{
       console.log(error);
     }
     );
  }

  getEventos(){
    const nombreQuery ='eventos';
    const queryParams=``;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {

        this.dataEventos=response.rows;
        let _evt = [];

        this.dataEventos.map(
          function(evento){
            const evt = {
              title:evento.nombre,
              date:evento.fecha,
              time:evento.horaInicio,
              eventOrder:"time",
              backgroundColor:evento.estado==1?"#fed7aa":evento.estado==2?"#bfdbfe":evento.estado==3?"#fecaca":evento.estado==4?"#bbf7d0":"",
              textColor:evento.estado==1?"#9a3412":evento.estado==2?"#1e40af":evento.estado==3?"#991b1b":evento.estado==4?"#166534":"",
              borderColor:evento.estado==1?"#9a3412":evento.estado==2?"#1e40af":evento.estado==3?"#991b1b":evento.estado==4?"#166534":""
            };
            _evt.push(evt);
          }
        );

        this.emisor.next(_evt);
        
        this.calendarOptions={
          locale: 'es',
          headerToolbar: {
            left: 'prev,next,today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
            //timeGridDay
          },
          contentHeight: 'auto',
          nowIndicator: true,
          //slotMinTime: '06:00:00',
          initialView: 'dayGridMonth',
          //weekends: true,
          //editable: false,
          //selectable: true,
          //selectMirror: true,
          //eventOverlap: false,
          eventTimeFormat: {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit'
          },
          buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            list: 'Lista'
          },
          events: this.eventos,
          dateClick: this.clickFecha.bind(this)
        };
     },
     error=>{
       console.log(error);
     }
     );
  }

  
  ngOnInit(): void {
    this.getEventos();
    this.eventos;

    this.emisor.subscribe(
      valor =>{
        this.eventos = valor
      }
    );

    this.eventosFecha$.subscribe(
      valor =>{
        this.eventosFecha = valor
      }
    );

  
  // Subscribe to media changes
  this._fuseMediaWatcherService.onMediaChange$
  .pipe(takeUntil(this._unsubscribeAll))
  .subscribe(({matchingAliases}) => {

      // Set the drawerMode and drawerOpened
      if ( matchingAliases.includes('lg') )
      {
          this.drawerMode = 'side';
          this.drawerOpened = true;
      }
      else
      {
          this.drawerMode = 'over';
          this.drawerOpened = false;
      }

      // Mark for check
      this._changeDetectorRef.markForCheck();
  });

    setTimeout(() => {
      this.calendarComponent.getApi().render();
    });
  }

}
