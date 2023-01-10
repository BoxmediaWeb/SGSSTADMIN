import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ApiService } from 'app/core/api/api.service';
import { MutacionDetalleDocumentoModalComponent } from 'app/modals/mutacionDetalleDocumentoModal/mutacion-detalle-documento-modal.component';
import { PlanearComponent } from 'app/pages/planear/planear.component';
import { RutaFormateoPipe } from 'app/pipes/ruta-formateo.pipe';
import { FileService } from 'app/servicios/file.service';
import { GuardadoService } from 'app/servicios/guardado.service';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { saveAs } from 'file-saver';
import { GeneralService } from '../general.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-vista-documento',
  templateUrl: './vista-documento.component.html',
  styleUrls: ['./vista-documento.component.scss']
})
export class VistaDocumentoComponent implements OnInit {
  @ViewChild('matDrawer') matDrawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  maestroIndice=this.route.snapshot.paramMap.get('id');
  dataMaestroDocumento:any[]=[];
  dataDetalleDocumento:any[]=[];
  maestroSeleccionado:any;
  detalleDocumentoSeleccionado:any;
  ruta=`${environment.serverUrl}/detalle_documento/`;
  linkDescarga:any;
  maestroDocumento: any;
  indice: any;
  ubicacionActual: string;
  ubicacion: any;
  dataListaDocumentos=[];

  constructor(
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private route: ActivatedRoute,
    private _httpClient: HttpClient,
    private _planearComponent: PlanearComponent,
    private _apiService: ApiService,
    private router: Router,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _fileService: FileService,
    private _rutaFormateoPipe: RutaFormateoPipe,
    public _guardadoServicer: GuardadoService,
    private _generalService:GeneralService,
    private _activatedRoute:ActivatedRoute
    )
  {
  }

  downloadDocumento(nombre_archivo): void {

    this._fileService
    .downloadDocumento(nombre_archivo)
    .subscribe(
      blob => saveAs(blob, nombre_archivo)
      ), error=>{
        console.log("Error al subir =>", error);
      }
  }

  selectMaestro(indice){
    this.indice=indice;
    this.detalleDocumentoSeleccionado=this.dataListaDocumentos[indice];
    this.detalleDocumentoSeleccionado;
    this.linkDescarga=this.detalleDocumentoSeleccionado.ubicacion;
    this.matDrawer.open();
    console.log("Seleccionado =>", indice);
  }

  getMaestroDocumento(){
    const nombreQuery ='maestrodocumentos';
    const queryParams=`ubicacion=${this.removeIndexEstandar(this.ubicacion,0)}&tipoDocumento=Documento`;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
      this.maestroDocumento = response[0];
     });
  }


  borrarDetalleDocumento(){
    const id = this.detalleDocumentoSeleccionado ?  `id: ${this.detalleDocumentoSeleccionado.id},` : '';
    const limpiar = `limpiar: 1,`;

    const nombreQuery='detalleDocumento';
    const queryParams=`${id}${limpiar}`;
    const queryProps='id';

    this._apiService.setData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {

        this.dataDetalleDocumento;
        this.detalleDocumentoSeleccionado=this.detalleDocumentoSeleccionado;
        this.linkDescarga=this.detalleDocumentoSeleccionado.ubicacion;

        this._snackBar.open('Borrado', null, {
          duration: 4000
        });
     },
     error => {
      console.log(error);

      this._snackBar.open('Error', null, {
        duration: 4000
      });
    }
     
     );
    }


  mutacionDetalleDocumentoModal(){
    const dialogRef = this._dialog.open(MutacionDetalleDocumentoModalComponent, {
      minWidth: '500px',
      data:{
        maestro:this.detalleDocumentoSeleccionado.maestroDocumento,
        detalleDocumento:this.detalleDocumentoSeleccionado
      }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      this.detalleDocumentoSeleccionado=this.detalleDocumentoSeleccionado;
      this.linkDescarga=this.detalleDocumentoSeleccionado.ubicacion;
      if(result.guardado==true){
        this.guardadoModal();
      }
  });

  }

  removeIndexEstandar(str,index){
    const valoresStr=str.split('_');
    return valoresStr[index];
  }

  getDetallesDocumento(){
    const nombreQuery ='detalledocumentos';
    const queryParams=`ubicacion=${this.removeIndexEstandar(this.ubicacionActual,0)}&tipoDocumento=Documento`;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
        this.dataListaDocumentos = response.rows;
        console.log("Esta es la lista de documentos =>", this.dataListaDocumentos);
     },
     error=>{
       console.log(error);
     }
     );

    /*
    const nombreQuery="detalledocumentos/getdetalledocumento"
    const queryParams=`id=${1}`
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
        console.log("Esta es la respuesta del detalle documento",response);
     },
     error=>{
       console.log(error);
     }
     );*/
  }

  guardadoModal(): void
  {
      const dialogRef = this._guardadoServicer.open();

      dialogRef.afterClosed().subscribe((result) => {
          console.log(result);
          if(result=="confirmed"){
          }else{
            console.log("Ha cancelado la operación");
          }
      });
  }

  download(nombre_archivo): void {
    const ubicacion = this._rutaFormateoPipe.transform(this.maestroIndice);

    this._fileService
    .download(ubicacion,nombre_archivo)
    .subscribe(
      blob => saveAs(blob, nombre_archivo)
      )
  }

  selectCotizacion() {
    this.router.navigate([`/planear/indice/${this.maestroIndice}`]);
  }

  ngOnInit(): void
  {

    /*this._generalService.getUbicacion().subscribe((data)=>{
      this.ubicacionActual = data;

      this.getDetallesDocumento();
    });*/

    this._generalService.getUbicacion().subscribe((data)=>{
      this.ubicacionActual = data;
      this.getDetallesDocumento();
    });
    
    this._activatedRoute.parent.params.subscribe(
      (params)=>{
        this.ubicacion = params.id;
      });
      
      this._fuseMediaWatcherService.onMediaChange$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(({matchingAliases}) => {

              if ( matchingAliases.includes('lg') )
              {
                  this.drawerMode = 'side';
                  this.drawerOpened = false;
              }
              else
              {
                  this.drawerMode = 'over';
                  this.drawerOpened = true;
              }
          });
      
    this.getMaestroDocumento();
    this.maestroDocumento;

    
  }

  ngOnDestroy(): void
  {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }
}
