import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { DetalleDocumentoModalComponent } from 'app/modals/detalle-documento-modal/detalle-documento-modal.component';
import { EstandarService } from '../estandar.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {
  @ViewChild('matDrawer') matDrawer: MatDrawer;
  drawerMode: 'over';
  drawerOpened: boolean = false;
  dataMaestro: any;
  seccion: string;
  maestroId: string;
  maestroActual: any;
  dataListaDocumentos: any;
  indice: number;
  documentoSeleccionado: any;
  linkDescarga: any;


  limpiarDocumento(){
    const nombreQuery =`detalledocumentos/limpiardocumento/${this.documentoSeleccionado.id}`;
    const queryParams=``;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe(async (response) => {
      this.getListaDetalleDocumentos();
      this.drawerOpened = await false;
     },
     error=>{
       console.log(error);
       console.log("Este es el valor del error =>", error);
     }
     );
  }

  getListaDetalleDocumentos(){
    const nombreQuery ='detalledocumentos';
    const queryParams=`ubicacion=${this.maestroActual.ubicacion}&tipoDocumento=Documento`;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe(async (response) => {
        console.log("Respuesta =>", response);
        this.dataListaDocumentos = await response.rows;
     },
     error=>{
       console.log(error);
     }
     );
  }

  getMaestrosDocumento(){
    const nombreQuery =`maestrodocumentos/${this.maestroId}`;

    console.log("nombreQuery=>",nombreQuery);
  
    this._apiService.getQuery(nombreQuery,'').
    subscribe(async(response) => {
      this.dataMaestro = await response;
      this._estandarService.setMaestroActual(this.dataMaestro);
     });
  }

  getParamsRuta(){
    this._activatedRoute.parent.firstChild.paramMap.subscribe(async(params) => {
      this.seccion=await params.get('seccion');
      this.maestroId=await params.get('maestroId');
      this.getMaestrosDocumento();
      this.getListaDetalleDocumentos();
    });
  }

  getMaestroActual(){
    this._estandarService.getMaestroActual().subscribe(async(maestro)=>{
      this.maestroActual= await maestro;
    });
  }

  selectMaestro(indice){
    this.indice=indice;
    this.documentoSeleccionado=this.dataListaDocumentos?.filter((data)=>{return data.id==indice})[0];
    this.linkDescarga=this.documentoSeleccionado.ubicacion;
    this.matDrawer.open();
  }

  mutacionDetalleDocumentoModal(){
    const dialogRef = this._dialog.open(DetalleDocumentoModalComponent, {
      minWidth: '500px',
      data:{
        detalleDocumento:this.documentoSeleccionado
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getListaDetalleDocumentos();
    });
  }
  

  constructor(private _apiService:ApiService,private _estandarService:EstandarService,private _activatedRoute: ActivatedRoute,public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMaestroActual();
    this.getParamsRuta();
  }

}
