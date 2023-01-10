import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { MutacionDetalleDocumentoModalComponent } from 'app/modals/mutacionDetalleDocumentoModal/mutacion-detalle-documento-modal.component';
import { PlanearComponent } from 'app/pages/planear/planear.component';
import { FileService } from 'app/servicios/file.service';
import { GuardadoService } from 'app/servicios/guardado.service';
import { filter } from 'rxjs';
import { saveAs } from 'file-saver';
import { E1p1Component } from '../e1p1/e1p1.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmacionService } from 'app/servicios/confirmacion.service';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.scss']
})
export class ContenedorComponent implements OnInit {
  
  dataMaestroDocumento:any[]=[];
  dataMaestroDocumento2:any[]=[];
  dataDetalleDocumento:any[]=[];
  dataDetalleDocumento2:any[]=[];
  dataMaestroTDoc:any[]=[];
  maestroDocumento:any;
  maestroDocumentoIndex = 0;

  ref_estandar=this.route.snapshot.paramMap.get('id');
  nombre_estandar=this.route.snapshot.paramMap.get('estandar');
  displayedColumns: string[] = ['usuario','comentario','fecha','version','estado','acciones'];
  event$;
  estandarActual: string;

  constructor(
    private route: ActivatedRoute,
    private _router:Router,
    private _apiService:ApiService,
    private _planearComponent: PlanearComponent,
    public _dialog: MatDialog,
    public _guardadoServicer: GuardadoService,
    private _fileService: FileService,
    private _snackBar: MatSnackBar,
    private _confirmacionServicer: ConfirmacionService,
    ) {

    //Evento testigo que se dispara cada vez que se actualiza la ruta
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      this.actualizarRutas();
    });

    //Evento testigo que se dispara cada vez que se actualiza la ruta
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
    });

  }

  //Funcion que es llamada por el testigo de la ruta para actualizar los valores
  actualizarRutas(){
    this.ref_estandar=this.route.snapshot.paramMap.get('id');
    this.getDetalleDocumento();
    this.dataDetalleDocumento;
    this.getMaestroDocumento();
    this.dataMaestroDocumento;
  }

  reestructurarTablaExcel(){
    this.displayedColumns = ['vigencia','usuario','comentario','fecha','version','estado','acciones'];

    if(this.dataMaestroDocumento && this.dataMaestroDocumento[this.maestroDocumentoIndex].tipo_documento=="Matriz"){
      this.displayedColumns = ['vigencia','usuario','comentario','fecha','version','acciones'];
    }else{
      this.displayedColumns = ['usuario','comentario','fecha','version','estado','acciones'];
    }
  }

  modalConfirmacionBorrar(registro): void
  {
      // Abrir un diálogo con texto genérico
      const dialogRef = this._confirmacionServicer.open();

      dialogRef.afterClosed().subscribe((result) => {
          console.log(result);
          if(result=="confirmed"){
            this.borrarDetalleDocumento(registro)
          }else{
            console.log("Ha cancelado la operación");
          }
      });
  }

  borrarDetalleDocumento(registro){
    this.setDetalleDocumento(registro);
  }

  setDetalleDocumento(registro){
    const id = registro.id?`id:${registro.id},`:'';

    const nombreQuery='detalleDocumento';
    const queryParams=`${id}eliminar:1`;
    const queryProps='id';

    this._apiService.setData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.actualizarRutas();

        this._snackBar.open('Elemento eliminado', null, {
          duration: 4000
        });

     });
  }



    /**
    * Toggle the drawer
  */
     toggleDrawer(): void
     {
       // Toggle the drawer
       this._planearComponent.matDrawer.toggle();
     }


  /*
     Modales
  */

     mutacionDetalleDocumentoModal(_index=null) {

      const maestro = this.dataMaestroDocumento[this.maestroDocumentoIndex];

      const dialogRef = this._dialog.open(MutacionDetalleDocumentoModalComponent, {
        minWidth: '500px',
        data:{
          maestro:maestro,
          detalleDocumento:null
        }
      });
    
      dialogRef.afterClosed().subscribe((result: any) => {
        if(result.guardado==true){
          this.guardadoModal();
        }
        this.actualizarRutas();
    });
    
    }

    guardadoModal(): void
    {
        // Abrir un diálogo con texto genérico
        const dialogRef = this._guardadoServicer.open();
  
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if(result=="confirmed"){
              //this.borrarDetalleDocumento(registro)
            }else{
              console.log("Ha cancelado la operación");
            }
        });
    }

  /*
    Geters hacia la API
  */

  getDetalleDocumento(){
    const nombreQuery ='detalleDocumento';
    const queryParams=`ubicacion:"${this.ref_estandar}",index_maestro:${this.maestroDocumentoIndex}, _tipo_documento:"Documento"`;
    const queryProps='id,usuario,vigencia,ubicacion,fecha,comentario,version,estado,maestroDocumento{id,ubicacion}';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.dataDetalleDocumento = response.data.detalleDocumento;
        this.reestructurarTablaExcel();
     },
     error=>{
       console.log(error);
     }
     );
  }

  getMaestroDocumento(){
    const nombreQuery ='maestroDocumento';
    const queryParams=`ubicacion:"${this.ref_estandar}",`;//_tipo_documento:"Documento"
    const queryProps='id,nombre,codigo,ubicacion,nombre_corto,tipo_documento';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
      this.dataMaestroDocumento = response.data.maestroDocumento.filter((elemento)=>{return elemento.tipo_documento!="Documento"});
      this.dataMaestroTDoc = response.data.maestroDocumento.filter((elemento)=>{return elemento.tipo_documento=="Documento"});

      this.getMaestroDocumento2();
      this.dataMaestroDocumento2;
     });
  }

  getMaestroDocumento2(){
    const nombreQuery ='maestroDocumento';
    const queryParams=`ubicacion:"${this.ref_estandar}", tipo_documento:"Documento"`;
    const queryProps='id,nombre,codigo,ubicacion,nombre_corto,tipo_documento';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
      this.dataMaestroDocumento2 = response.data.maestroDocumento;
     });
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    //console.log('tabChangeEvent => ', tabChangeEvent); 
    //console.log('index => ', tabChangeEvent.index);
    this.maestroDocumentoIndex = tabChangeEvent.index;
    this.reestructurarTablaExcel();
    this.getDetalleDocumento();
    this.dataDetalleDocumento;
  }

  irDocumento(ubicacion) {
    this._router.navigate([`/sgsst/${this.nombre_estandar}/indice/${this.ref_estandar}/documento/${ubicacion}`]);
  }

  irArchivos() {
    this._router.navigate([`/sgsst/${this.nombre_estandar}/indice/${this.ref_estandar}/archivos`]);
  }

  editarExcel(ubicacion) {
    const win = window.open(`${ubicacion}`, '_blank');
    // this.router.navigate(['/app/control', this.currentPatient.identification, this.currentRecord.identification,]);
    win.focus();
  }

  download(estandar, nombre_archivo, tipo_documento): void {

    const extencion = tipo_documento!='Matriz'?'.docx':'.xlsx';

    this._fileService
    .download(estandar,nombre_archivo)
    .subscribe(
      blob => saveAs(blob, nombre_archivo)
      ), error=>{
        console.log("Error al subir =>", error);
      }
  }

  ngOnInit(): void {
    this.getMaestroDocumento();
    this.dataMaestroDocumento;
    this.getDetalleDocumento();
    this.dataDetalleDocumento;

    this.event$
    =this._router.events
        .subscribe(
          (event: NavigationEvent) => {
            if(event instanceof NavigationStart) {
              this.estandarActual=event.url.replace('/sgsst/','');
            }
          });
  }

}