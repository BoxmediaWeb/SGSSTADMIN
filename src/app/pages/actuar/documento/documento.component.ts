import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { FileService } from 'app/servicios/file.service';
import { environment } from 'environments/environment';
import { filter, Observable, Subject } from 'rxjs';
import { ActuarComponent } from '../actuar.component';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent implements OnInit {
  documento=this.route.snapshot.paramMap.get('documento');
  maestroIndice=this.route.snapshot.paramMap.get('id');
  dataMaestroDocumento: any = [];
  ruta="http://127.0.0.1:8000/detalle_documento/E1.1.1_TJTNSk88Tk.pdf#zoom=90&pagemode=none&scrollbar=0&toolbar=0&statusbar=1&messages=0&navpanes=0";

  urlRegresar=`${environment.serverUrl}/detalle_documento/${this.documento}`;

  objectUrl:any;
  contenidos:any=[];
  contenidos$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private _ActuarComponent: ActuarComponent,
    private _apiService: ApiService,
    private router: Router,
    private sanitizer: DomSanitizer
    ) {

  }

  toggleDrawer(): void
  {
    // Toggle the drawer
    this._ActuarComponent.matDrawer.toggle();
  }

  getMaestroDocumento(){
    const nombreQuery ='maestroDocumento';
    const queryParams=`ubicacion:"${this.maestroIndice}"`;
    const queryProps='id,nombre,codigo,ubicacion';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.dataMaestroDocumento = response.data.maestroDocumento[0];
        //this.dataNombre = response.data.maestroDocumento[0].nombre;
     });
  }
  
  selectCotizacion() {
    this.router.navigate([`/sgsst/verificar/indice/${this.maestroIndice}`]);
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getContenido(){
    const nombreQuery ='contenido';
    const queryParams=`ubicacion:"E.1.1.1"`;
    const queryProps='id,documento_id,tag,contenido,estilos,maestroDocumento{id}';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        var ret = decodeURIComponent(response.data.contenido);
        var ret = ret.replaceAll('-c0m1ll45-', '"');
        this.contenidos$.next(ret);
     });
  }

  ngOnInit(): void {
    this.getMaestroDocumento();
    this.dataMaestroDocumento;

    this.getContenido();

    this.contenidos$.subscribe((data:any)=>{
      this.contenidos = data
    });
  }

}
