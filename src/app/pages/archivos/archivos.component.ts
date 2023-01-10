import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlanearComponent } from '../planear/planear.component';
import { ApiService } from 'app/core/api/api.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MutacionDetalleDocumentoModalComponent } from 'app/modals/mutacionDetalleDocumentoModal/mutacion-detalle-documento-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from 'app/servicios/file.service';
import { saveAs } from 'file-saver';
import { RutaFormateoPipe } from 'app/pipes/ruta-formateo.pipe';
import { environment } from 'environments/environment';
import { GuardadoService } from 'app/servicios/guardado.service';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArchivosComponent implements OnInit {
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

  /**
   * Constructor
   */
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
    public _guardadoServicer: GuardadoService
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
    //this.detalleDocumentoSeleccionado=maestro;
    this.indice=indice;
    this.detalleDocumentoSeleccionado=this.dataDetalleDocumento[indice];
    this.detalleDocumentoSeleccionado;
    this.linkDescarga=this.detalleDocumentoSeleccionado.ubicacion;
    this.matDrawer.open();
  }


  getDetalleDocumento(){
    const nombreQuery ='detalleDocumento';
    const queryParams=`ubicacion:"${this.maestroIndice}",tipo_documento:"Documento"`;
    const queryProps='id,usuario,ubicacion,fecha,comentario,version,estado,maestroDocumento{id,ubicacion,nombre_corto}';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.dataDetalleDocumento = response.data.detalleDocumento;
        this.linkDescarga=this.detalleDocumentoSeleccionado?this.detalleDocumentoSeleccionado.ubicacion:'';
        this.detalleDocumentoSeleccionado=this.dataDetalleDocumento[this.indice];
        this.linkDescarga=this.detalleDocumentoSeleccionado.ubicacion;
     });
  }

  getMaestroDocumento(){
    const nombreQuery ='maestroDocumento';
    const queryParams=`ubicacion:"${this.maestroIndice}", _tipo_documento:"Documento"`;
    const queryProps='id,nombre,codigo,ubicacion,nombre_corto,tipo_documento';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
      this.maestroDocumento = response.data.maestroDocumento[0];
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

        this.getDetalleDocumento();
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
      this.getDetalleDocumento();
      this.detalleDocumentoSeleccionado=this.detalleDocumentoSeleccionado;
      this.linkDescarga=this.detalleDocumentoSeleccionado.ubicacion;
      if(result.guardado==true){
        this.guardadoModal();
      }
      
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

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      // Subscribe to media changes
      this._fuseMediaWatcherService.onMediaChange$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(({matchingAliases}) => {

              // Set the drawerMode and drawerOpened if
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

    this.getDetalleDocumento();
    this.dataDetalleDocumento;
  }

  

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }
}
