import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from 'app/core/api/api.service';
import { EstandarService } from '../estandar.service';
import moment from 'moment';

@Component({
  selector: 'app-detalle-documento',
  templateUrl: './detalle-documento.component.html',
  styleUrls: ['./detalle-documento.component.scss']
})
export class DetalleDocumentoComponent implements OnInit {
  idDinamico: string;
  dataMaestro: any;
  funcionalidadDetalleDocumento: string;
  maestroActual: any;
  contenidoDetalleDocumento: any;
  seccion: string;

  detalleDocumentoForm = this._formBuilder.group({
    fecha     : [moment().format('YYYY-MM-DD'), [Validators.required]],
    version     : ['1', [Validators.required]],
    comentario     : [, []],
    vigencia     : [, [Validators.required]],
    archivo     : [, [Validators.required]],
    enlace     : [, [Validators.required]],
    texto     : [, [Validators.required]],
  });

  detalleDocumentoCrearForm = this._formBuilder.group({
    contenido     : [, [Validators.required]],
  });

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '1000px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: 'Calibri',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        /*{class: 'comic-sans-ms', name: 'Comic Sans MS'}*/
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]/*,
    uploadUrl: 'v1/image',
    upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]*/
  };
  indice: number;

  constructor(private _activatedRoute: ActivatedRoute,private _apiService:ApiService,private _estandarService:EstandarService,private _formBuilder: FormBuilder,private _snackbar:MatSnackBar,private _router:Router,private _snackBar: MatSnackBar) { }


  crearDetalleDocumento()
  {
    const nombreQuery="detalledocumentos/setdetalledocumento";

    //const detalleDocumento=this.detalleDocumentoForm.value;

    const dataQuery = {
      estandar:this.maestroActual.ubicacion,
      indice:this.indice,
      valor:`${this.contenidoDetalleDocumento}`,
      fecha:"12-12-2020",
      version:"2.0",
      comentario:"blablablablablabla"
    }

    this._apiService.postQuery(nombreQuery,dataQuery).subscribe(
      (response: any) => {
        this.irVistaListaDetalleDocumentos();
      },
      error => {
        console.log(error);

        this._snackbar.open('Error', null, {
          duration: 4000
        });
      }
    );
 }

  irVistaCrearMaestro(){
    this._router.navigate([`/sgsst/${this.seccion}/formato-maestro/crear/${this.maestroActual.id}`]);
  }

  irVistaEditarMaestro(){
    this._router.navigate([`/sgsst/${this.seccion}/formato-maestro/editar/${this.maestroActual.id}`]);
  }

  irVistaListaDetalleDocumentos(){
    this._router.navigate([`/sgsst/${this.seccion}/${this.maestroActual.ubicacion}/0`]);
  }

  getMaestrosDocumento(){
    const nombreQuery =`maestrodocumentos/${this.idDinamico}`;
  
    this._apiService.getQuery(nombreQuery,'').
    subscribe(async(response) => {
      this.dataMaestro = await response;
      this._estandarService.setMaestroActual(this.dataMaestro);
     });
  }

  getParamsRuta(){
    this._activatedRoute.parent.firstChild.paramMap.subscribe((params) => {
      this.seccion=params.get('seccion');
      this.idDinamico=params.get('idDinamico');
      this.funcionalidadDetalleDocumento=params.get('funcionalidadDetalleDocumento');
    });
  }

  getContenidoMaestro(){
    if (this.funcionalidadDetalleDocumento=='crear') {
      /*En esta vista el id es el del maestro*/
      const nombreQuery="maestrodocumentos/getarchivomaestro"
      const queryParams=`estandar=${this.maestroActual.ubicacion}`;
      
      this._apiService.getQuery(nombreQuery,queryParams).subscribe(
        async (response: any) => {
          this.contenidoDetalleDocumento = await response.mensaje;
          
          this.detalleDocumentoCrearForm.patchValue({
            contenido: this.contenidoDetalleDocumento});
        },
        error => {
          console.log(error);
  
          this._snackbar.open('Error', null, {
            duration: 4000
          });
        }
      );
    } else if(this.funcionalidadDetalleDocumento=='editar'){
      /*En esta vista el id es el del detalleDocumento*/
      const nombreQuery="detalledocumentos/getdetalledocumento"
      const queryParams=`id=${this.idDinamico}`
   
   
      this._apiService.getQuery(nombreQuery,queryParams).subscribe(
        (response: any) => {
   
            this.contenidoDetalleDocumento = response.archivo;
   
            this._snackbar.open('Imágen guardada', null, {
              duration: 4000
            });
        },
        error => {
          console.log(error);
   
          this._snackbar.open('Error', null, {
            duration: 4000
          });
        }
      );
    }
  }

  getMaestroActual(){
    this._estandarService.getMaestroActual().subscribe((maestro)=>{
      this.maestroActual=maestro;
    });
  }

  getIndice(){
    this._estandarService.getIndice().subscribe(async(indice)=>{
      this.indice = await indice;
    });
  }

  ngOnInit(): void {
    this.getParamsRuta();
    this.getIndice();
    this.getMaestrosDocumento();
    this.getMaestroActual();
    this.getContenidoMaestro();
  }

}
