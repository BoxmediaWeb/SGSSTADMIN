import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { DetalleDocumentoModalComponent } from 'app/modals/detalle-documento-modal/detalle-documento-modal.component';
import { EstandarService } from '../estandar.service';

@Component({
  selector: 'app-lista-detalle-documentos',
  templateUrl: './lista-detalle-documentos.component.html',
  styleUrls: ['./lista-detalle-documentos.component.scss']
})
export class ListaDetalleDocumentosComponent implements OnInit {
  dataListaDocumentos=[];
  displayedColumns: string[];
  codigoEstandar: string;
  indice: any;
  dataMaestros: any;
  dataMaestroDocumentos: any;
  maestroActual: any;
  seccion: string;

  goToLink(url: string){
    window.open(url, "_blank");
  }

  tabChanged($event){
    this.indice = $event.index;
    this._estandarService.setMaestroActual(this.dataMaestros[this.indice]);
    this.getMaestrosDocumentos();
  }

  constructor(private _activatedRoute: ActivatedRoute,private _apiService:ApiService,private _estandarService:EstandarService,private _router:Router,public _dialog: MatDialog) { }

  getListaDetalleDocumentos(){
    const nombreQuery ='detalledocumentos';
    const queryParams=`maestroId=${this.maestroActual.id}&_tipoDocumento=Documento`;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe(async (response) => {
        this.dataListaDocumentos = await response.rows;
     },
     error=>{
       console.log(error);
     }
     );
  }

  getMaestrosDocumentos(){
    const nombreQuery ='maestrodocumentos';
    const queryParams=`ubicacion=${this.codigoEstandar}`;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
      this.dataMaestros = response.filter((elemento)=>{return elemento.tipoDocumento!="Documento"});
      this.dataMaestroDocumentos = response.filter((elemento)=>{return elemento.tipoDocumento=="Documento"});
      this._estandarService.setDocumentosLength(this.dataMaestroDocumentos.length);
      this._estandarService.setMaestroActual(this.dataMaestros[this.indice]);
     });
  }

  getParamsRuta(){
    this._activatedRoute.parent.firstChild.paramMap.subscribe((params) => {
      this.seccion=params.get('seccion');
      this.codigoEstandar=params.get('codigoEstandar');
      //this.indice=params.get('indice');
      this.getMaestroActual();
      this.getMaestrosDocumentos();
    });
  }

  getMaestroActual(){
    this._estandarService.getMaestroActual().subscribe(async(maestro)=>{
      this.maestroActual = await maestro;
      this.getListaDetalleDocumentos();
      this.editarDisplayedColumns();
    });
  }

  borrarDetalleDocumento(detalleDocumento){
    const nombreQuery =`detalledocumentos/${detalleDocumento.id}`;
    const queryParams=``;
  
    this._apiService.deleteQuery(nombreQuery,queryParams).
    subscribe((response) => {
      this.getListaDetalleDocumentos();
     },
     error=>{
      console.log(error);
     }
     );
  }

  irVistaDocumentos(){
    this._router.navigate([`/sgsst/${this.seccion}/documentos/${this.maestroActual.id}`]);
  }

  irVistaMaestro(){
    this._router.navigate([`/sgsst/${this.seccion}/formato-maestro/ver/${this.maestroActual.id}`]);
  }

  irVistaCrearDetalleDocumento(){
    this._router.navigate([`/sgsst/${this.seccion}/detalle-documento/crear/${this.maestroActual.id}`]);
  }

  irVistaVerDetalleDocumento(detalleDocumentoId){
    this._router.navigate([`/sgsst/${this.seccion}/detalle-documento/ver/${detalleDocumentoId}`]);
  }

  irVistaEditarDetalleDocumento(detalleDocumentoId){
    this._router.navigate([`/sgsst/${this.seccion}/detalle-documento/editar/${detalleDocumentoId}`]);
  }

    
  mutacionDetalleDocumentoModal(){
    const dialogRef = this._dialog.open(DetalleDocumentoModalComponent, {
      minWidth: '500px',
      data:{
        maestroDocumento:this.maestroActual
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getListaDetalleDocumentos();
    });
  }

  editarDisplayedColumns(){
    if (this.maestroActual.tipoDocumento=="Matriz") {
      this.displayedColumns = ['vigencia','usuario','comentario','fecha','version','estado','acciones'];
    } else {
      this.displayedColumns = ['usuario','comentario','fecha','estado','acciones'];
    }
  }

  ngOnInit(): void {
    this.indice=0;
    this.getParamsRuta();

    this._router.events.subscribe((event) => {
      this.indice=0;
    });
  }

}
