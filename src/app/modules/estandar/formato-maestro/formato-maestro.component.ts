import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from 'app/core/api/api.service';
import moment from 'moment';
import { EstandarService } from '../estandar.service';

@Component({
  selector: 'app-formato-maestro',
  templateUrl: './formato-maestro.component.html',
  styleUrls: ['./formato-maestro.component.scss']
})
export class FormatoMaestroComponent implements OnInit {
  idMaestro: string;
  dataMaestro: any;
  funcionalidadMaestro: string;
  maestroActual: any;
  contenidoMaestro: any;
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

  

  constructor(private _activatedRoute: ActivatedRoute,private _apiService:ApiService,private _estandarService:EstandarService,private _formBuilder: FormBuilder,private _snackbar:MatSnackBar,private _router:Router,private _snackBar: MatSnackBar) { }

  
  guardarMaestro(){
    const nombreQuery = "maestrodocumentos/setarchivomaestro";

    var valorMaestro ={
      estandar:`${this.maestroActual.ubicacion}`,
      valor:this.contenidoMaestro
    };

    this._apiService.postQuery(nombreQuery, valorMaestro).subscribe(
      (response: any) => {
        this.irVistaListaDetalleDocumentos();
      },
      error => {
        console.log(error);

        this._snackBar.open('Error', null, {
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
    const nombreQuery =`maestrodocumentos/${this.idMaestro}`;
  
    this._apiService.getQuery(nombreQuery,'').
    subscribe(async(response) => {
      this.dataMaestro = await response;
      this._estandarService.setMaestroActual(this.dataMaestro);
     });
  }

  getParamsRuta(){
    this._activatedRoute.parent.firstChild.paramMap.subscribe((params) => {
      this.seccion=params.get('seccion');
      this.idMaestro=params.get('idMaestro');
      this.funcionalidadMaestro=params.get('funcionalidadMaestro');
    });
  }

  getContenidoMaestro(){
    if (this.funcionalidadMaestro=='ver' || this.funcionalidadMaestro=='editar') {
      const nombreQuery="maestrodocumentos/getarchivomaestro"
      const queryParams=`estandar=${this.maestroActual.ubicacion}`;
      
      this._apiService.getQuery(nombreQuery,queryParams).subscribe(
        async (response: any) => {
          this.contenidoMaestro = await response.mensaje;
          
          /*this.detalleDocumentoCrearForm.patchValue({
            contenido: this.contenidoMaestro});*/
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

  ngOnInit(): void {
    this.getParamsRuta();
    this.getMaestrosDocumento();
    this.getMaestroActual();
    this.getContenidoMaestro();
  }

}
