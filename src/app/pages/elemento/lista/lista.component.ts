import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { MutacionDetalleDocumentoModalComponent } from 'app/modals/mutacionDetalleDocumentoModal/mutacion-detalle-documento-modal.component';
import { PlanearComponent } from 'app/pages/planear/planear.component';
import { ConfirmacionService } from 'app/servicios/confirmacion.service';
import { FileService } from 'app/servicios/file.service';
import { GuardadoService } from 'app/servicios/guardado.service';
import { filter, Subject } from 'rxjs';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  v2 = false;
  cargandoMaestros=false;
  indice = 0;
  estandarActual:any;
  ubicacionActual:any;
  dataDoc=["dfsdf"];
  dataListaDocumentos:any=[];
  dataMaestroArchivos:any[]=[];
  dataMaestroDocumentos:any[]=[];
  displayedColumns: string[];

  irCrearDocumento(){
    this._router.navigate([`/estandar/${this.estandarActual}/${this.ubicacionActual}_${this.indice}/ver-maestro/${this.indice}`]);
  }

  irEditarMaestro(){
    this._router.navigate([`/estandar/${this.estandarActual}/${this.ubicacionActual}_${this.indice}/generar-maestro`]);
  }

  irDocumento(detalleDocumento){
    this._router.navigate([`/estandar/${this.estandarActual}/${this.ubicacionActual}_${this.indice}/detalle-documento/${detalleDocumento.id}`]);
  }
  
  irDocumentoPDF(detalleDocumento){
    this._router.navigate([`/estandar/${this.estandarActual}/${this.ubicacionActual}_${this.indice}/pdf-documento/${detalleDocumento.id}`]);
  }

  irVistaDocumento(){
    this._router.navigate([`/estandar/${this.estandarActual}/${this.ubicacionActual}_${this.indice}/vista-documento`]);
  }

  getMaestrosDocumentos(){
    const nombreQuery ='maestrodocumentos';
    const queryParams=`ubicacion=${this.ubicacionActual}`;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
      this.dataMaestroArchivos = response.filter((elemento)=>{return elemento.tipoDocumento!="Documento"});
      this.dataMaestroDocumentos = response.filter((elemento)=>{return elemento.tipoDocumento=="Documento"});
      this.cargandoMaestros = false;
     });
  }

  removeIndexEstandar(str){
    const valoresStr=str.split('_');
    return valoresStr[0];
  }

  getDetallesDocumento(){
    const nombreQuery ='detalledocumentos';
    const queryParams=`ubicacion=${this.removeIndexEstandar(this.ubicacionActual)}&index=${this.indice}&_tipoDocumento=Documento`;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
        this.dataListaDocumentos = response.rows;
     },
     error=>{
       console.log(error);
     }
     );
  }

  borrarDetallesDocumento(detalleDocumento){
    const nombreQuery =`detalledocumentos/${detalleDocumento.id}`;
    const queryParams=``;
  
    this._apiService.deleteQuery(nombreQuery,queryParams).
    subscribe((response) => {
      this.getDetallesDocumento();
      this.dataListaDocumentos;
     },
     error=>{
      console.log(error);
     }
     );
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.navegacionTabletas(tabChangeEvent);
  }

  navegacionTabletas(tabChangeEvent: MatTabChangeEvent = null){
    this.indice = tabChangeEvent ?  tabChangeEvent.index : 0;

    this._generalService.setIndice(this.indice);

    this.getDetallesDocumento();
    this.dataListaDocumentos;
  }

  
  mutacionDetalleDocumentoModal(){
    const dialogRef = this._dialog.open(MutacionDetalleDocumentoModalComponent, {
      minWidth: '500px',
      data:{
        maestro:this.ubicacionActual,
        indice:this.indice
      }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      /*this.detalleDocumentoSeleccionado=this.detalleDocumentoSeleccionado;
      this.linkDescarga=this.detalleDocumentoSeleccionado.ubicacion;
      if(result.guardado==true){
        this.guardadoModal();
      }

      this.getDetallesDocumento();
      this.dataListaDocumentos;
      this.selectMaestro(this.detalleDocumentoSeleccionado.id);*/
  });

  }

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
    private _generalService:GeneralService
    ) {
  }

  modalConfirmacionBorrar(registro): void
  {
      const dialogRef = this._confirmacionServicer.open();

      dialogRef.afterClosed().subscribe((result) => {
          if(result=="confirmed"){
            this.borrarDetalleDocumento(registro)
          }else{
          }
      });
  }

  borrarDetalleDocumento(registro){
    const nombreQuery ='detalledocumentos';
    const queryParams=`id=${registro.id}`;
    
    this._apiService.deleteQuery(nombreQuery,queryParams).
    subscribe((response) => {
    });
  }

  ngOnInit(): void {

    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      this.indice=0;
      this._generalService.setIndice(this.indice);
      this.ubicacionActual=event.url.split('/').slice(-1).pop();
      this.getDetallesDocumento();
      this.dataListaDocumentos;
    });

    this._generalService.getSeccion().subscribe((data)=>{
      this.estandarActual = data;

      this._generalService.getUbicacion().subscribe((data)=>{
        this.ubicacionActual = data;

        this.cargandoMaestros = true;
        this.getMaestrosDocumentos();
        this.dataMaestroArchivos;
        this.dataMaestroDocumentos;
        this.cargandoMaestros;

      });

    });

    this.displayedColumns = ['vigencia','usuario','comentario','fecha','version','estado','acciones'];

    this.getDetallesDocumento();
    this.dataListaDocumentos;

  }
  
}
function saveAs(blob: Blob, nombre_archivo: any): void {
  throw new Error('Function not implemented.');
}