import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
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

  tabChanged($event){
    //this.indice = $event.index;
    this._estandarService.setIndice($event.index);
    this._estandarService.setMaestroActual(this.dataMaestros[this.indice]);
    this.getListaDetalleDocumentos();
  }

  constructor(private _activatedRoute: ActivatedRoute,private _apiService:ApiService,private _estandarService:EstandarService,private _router:Router) { }

  getListaDetalleDocumentos(){
    const nombreQuery ='detalledocumentos';
    const queryParams=`ubicacion=${this.codigoEstandar}&index=${this.indice}&_tipoDocumento=Documento`;
  
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
      console.log("Respuestas de maestros =>", response);
      this.dataMaestros = response.filter((elemento)=>{return elemento.tipoDocumento!="Documento"});
      this.dataMaestroDocumentos = response.filter((elemento)=>{return elemento.tipoDocumento=="Documento"});
      this._estandarService.setMaestroActual(this.dataMaestros[this.indice]);
     });
  }

  getParamsRuta(){
    this._activatedRoute.parent.firstChild.paramMap.subscribe((params) => {
      this.seccion=params.get('seccion');
      this.codigoEstandar=params.get('codigoEstandar');
      //this.indice=params.get('indice');
      this._estandarService.setIndice(params.get('indice'));
    });
  }

  getMaestroActual(){
    this._estandarService.getMaestroActual().subscribe((maestro)=>{
      this.maestroActual = maestro;
    });
  }

  getIndice(){
    this._estandarService.getIndice().subscribe(async(indice)=>{
      this.indice = await indice;
    });
  }

  irVistaMaestro(){
    this._router.navigate([`/sgsst/${this.seccion}/formato-maestro/ver/${this.maestroActual.id}`]);
  }

  irVistaDetalleDocumento(){
    this._router.navigate([`/sgsst/${this.seccion}/detalle-documento/crear/${this.maestroActual.id}`]);
  }

  ngOnInit(): void {
    this.displayedColumns = ['vigencia','usuario','comentario','fecha','version','estado','acciones'];
    this.getParamsRuta();
    this.getIndice();
    this.getMaestroActual();
    this.getMaestrosDocumentos();
    this.getListaDetalleDocumentos();
  }

}
