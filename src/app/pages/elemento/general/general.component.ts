import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { MutacionDetalleDocumentoModalComponent } from 'app/modals/mutacionDetalleDocumentoModal/mutacion-detalle-documento-modal.component';
import { ConfirmacionService } from 'app/servicios/confirmacion.service';
import { FileService } from 'app/servicios/file.service';
import { GuardadoService } from 'app/servicios/guardado.service';
import { BehaviorSubject, filter } from 'rxjs';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  ubicacion_estandar="";
  seccion_estandar="";
  indice:number;

  dataMaestroGeneral:any[]=[];
  dataMaestro:any[]=[];
  dataMaestroTDocumento:any[]=[];


  toggleDrawer(): void
  {
  }

  irArchivos() {
    this._router.navigate([`/estandar/${this.seccion_estandar}/${this.ubicacion_estandar}/archivos`]);
  }

  irDocumentos(){
    this._router.navigate([`/estandar/${this.seccion_estandar}/vista-documento`]);
  }

  removeIndexEstandar(str){
    const valoresStr=str.split('_');
    return valoresStr[0];
   }
  

  getMaestroDocumento(){
    const nombreQuery ='maestrodocumentos';
    const queryParams=`ubicacion=${this.removeIndexEstandar(this.ubicacion_estandar)}`;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
      this.dataMaestroGeneral = response;
      this.dataMaestro = response.filter((elemento)=>{return elemento.tipoDocumento!="Documento"});
      this.dataMaestroTDocumento = response.filter((elemento)=>{return elemento.tipoDocumento=="Documento"});
     });
  }

  actualizarRutas(){
    this.getMaestroDocumento();
  }

  constructor(
    private route: ActivatedRoute,
    private _router:Router,
    private _apiService:ApiService,
    public _dialog: MatDialog,
    public _guardadoServicer: GuardadoService,
    private _generalService: GeneralService
    ){}

  getUbicacionDeUrl(_url){
    const data_url = _url.split('/');
    data_url.map((data)=>{
      if(data.includes("E.")){
        this._generalService.setUbicacion(data);
      }
    });
  }


  ngOnInit(): void {

    this.route.parent.firstChild.paramMap.subscribe((params) => {
      this._generalService.setUbicacion(params.get('id'));
    });

    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        this.getUbicacionDeUrl(event.url);
      });

    this._generalService.getUbicacion().subscribe((data)=>{
      this.ubicacion_estandar = data;
      this.getMaestroDocumento();
    });

    this._generalService.getIndice().subscribe((data)=>{
      this.indice = data;
    });

  }


}

