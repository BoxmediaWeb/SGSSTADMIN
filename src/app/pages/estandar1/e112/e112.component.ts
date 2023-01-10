import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { MutacionDetalleDocumentoModalComponent } from 'app/modals/mutacionDetalleDocumentoModal/mutacion-detalle-documento-modal.component';
import { PlanearComponent } from 'app/pages/planear/planear.component';
import { ConfirmacionService } from 'app/servicios/confirmacion.service';
import { FileService } from 'app/servicios/file.service';
import moment from 'moment';
import { filter } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-e112',
  templateUrl: './e112.component.html',
  styleUrls: ['./e112.component.scss']
})
export class E112Component implements OnInit {
  maestroIndice=this.route.snapshot.paramMap.get('id');
  displayedColumns: string[] = ['usuario','comentario','fecha','version','estado','acciones'];
  detalleDocumentos: any[] = [];
  dataMaestroDocumento: any = [];
  titulo:string;
  formato:string;
  dataNombre: any;
  ubicacion: any;

  archivos=[
    {
      nombre:"ANR-SST-009 MATRIZ DE ROLES Y RESPONSABILIDADES",
      nombre_corto: "Matriz De Roles Y Responsabilidades",
      extension:"xlsx",
      tipo:"Matriz"
    },
    {
      nombre:"MAN-SST-001 Manual de Responsabilidades en Seguridad y Salud en el Trabajo SST",
      nombre_corto: "Manual De Responsabilidades",
      extension:"pdf",
      tipo:"Manual"
    },
    {
      nombre:"PRC-SST-020 Procedimiento de Evaluación de Competencias y Responsabilidades",
      nombre_corto: "Procedimiento De Evaluación",
      tipo:"Procedimiento",
      extension:"docx"
    },
  ];

  matriz_falsa=[
    {
      usuario:"Fernando Andrés Salas Velasco",
      comentario:"nuevo archivo subido",
      ultima_actualizacion:"2022-03-18",
      version:"1.0",
      estado:1
    }
  ];

  constructor(
    private _planearComponent: PlanearComponent,
    private _apiService: ApiService,
    private _confirmacionServicer: ConfirmacionService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router:Router,
    private _snackBar: MatSnackBar,
    private _fileService: FileService
  ) { }

  editarExcel() {
    const win = window.open(`https://docs.google.com/spreadsheets/d/1cG7cxFlSO42c70Aqy4Wzex8qBfyyaIWB/edit#gid=1626524711`, '_blank');
    // this.router.navigate(['/app/control', this.currentPatient.identification, this.currentRecord.identification,]);
    win.focus();
  }

    /**
    * Toggle the drawer
  */
  toggleDrawer(): void
  {
    // Toggle the drawer
    this._planearComponent.matDrawer.toggle();
  }

  getDetalleDocumento(){
    const nombreQuery ='detalleDocumento';
    const queryParams=`id_maestro:${this.maestroIndice}`;
    const queryProps='id,usuario,ubicacion,fecha,comentario,version,estado,maestroDocumento{id,ubicacion}';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.detalleDocumentos = response.data.detalleDocumento;
     });
  }

  getMaestroDocumento(){
    const nombreQuery ='maestroDocumento';
    const queryParams=`id:${this.maestroIndice}`;
    const queryProps='id,nombre,codigo,ubicacion';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.dataMaestroDocumento = response.data.maestroDocumento[0];
        this.dataNombre = response.data.maestroDocumento[0].nombre;
     });
  }

  setTitulo(nuevoTitulo){
    this.titulo=nuevoTitulo;
  }

  setFormato(nuevoFormato){
    this.formato=nuevoFormato;
  }

  ngOnInit(): void {
    this.getDetalleDocumento();
    this.detalleDocumentos;

    this.getMaestroDocumento();
    this.dataMaestroDocumento;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      this.actualizarRutas();
    });
  }



  borrarDetalleDocumento(registro){
    this.setDetalleDocumento(registro);
  }

  
  setDetalleDocumento(registro){
    console.log("Me devolvió este registro", registro);
    const id = registro.id?`id:${registro.id},`:'';

    const nombreQuery='detalleDocumento';
    const queryParams=`${id}eliminar:1`;
    const queryProps='id';

    this._apiService.setData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        console.log("Respuesta de la mutación:");
        console.log("Eliminación: ", response);

        this.actualizarRutas();

        this._snackBar.open('Elemento eliminado', null, {
          duration: 4000
        });

     });
  }

  setEstadoDetalleDocumento(registro){
    console.log("Me devolvió este registro", registro);
    const id = registro.id?`id:${registro.id},`:'';
    const fecha = `fecha:"${moment().format('YYYY-MM-DD')}",`;

    const nombreQuery='detalleDocumento';
    const queryParams=`${id}${fecha}estado:2`;
    const queryProps='id';

    this._apiService.setData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        console.log("Respuesta de la mutación:");
        console.log("Eliminación: ", response);

        this.actualizarRutas();

        this._snackBar.open('Elemento eliminado', null, {
          duration: 4000
        });

     });
  }


  actualizarRutas(){
    this.maestroIndice=this.route.snapshot.paramMap.get('id');
    this.getMaestroDocumento();
    this.dataMaestroDocumento;
    this.getDetalleDocumento();
    this.detalleDocumentos;
    console.log("Indice del maestro", this.maestroIndice);
  }


  mutacionDetalleDocumentoModal(registro=null) {

    const dialogRef = this.dialog.open(MutacionDetalleDocumentoModalComponent, {
      minWidth: '400px',
      data:{
        maestro:this.dataMaestroDocumento,
        detalleDocumento:registro
      }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      this.actualizarRutas();
  });
  
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

  modalConfirmacionEstado(registro): void
  {

      if(registro.estado!=2){

        // Abrir un diálogo con texto genérico
        const dialogRef = this._confirmacionServicer.open();

        dialogRef.afterClosed().subscribe((result) => {
          console.log(result);
          if(result=="confirmed"){
            this.setEstadoDetalleDocumento(registro)
          }else{
            console.log("Ha cancelado la operación");
          }
        });
      }
  }

  irDocumento(ubicacion) {
    this.router.navigate([`/planear/indice/${this.maestroIndice}/${ubicacion}`]);
  }

  download(estandar, nombre_archivo): void {
    this._fileService
    .download(estandar,nombre_archivo)
    .subscribe(
      blob => saveAs(blob, nombre_archivo)
      )
  }

}
