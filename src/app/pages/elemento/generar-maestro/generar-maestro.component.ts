import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from 'app/core/api/api.service';
import { InputsComponent } from 'app/pages/actuar/inputs/inputs.component';
import { filter, Subject } from 'rxjs';
import { GeneralService } from '../general.service';
import { InputsModalComponent } from '../inputs-modal/inputs-modal.component';

import * as pdfMake from "pdfmake/build/pdfmake";  
import * as pdfFonts from "pdfmake/build/vfs_fonts";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { VariableConfirmacionComponent } from '../variable-confirmacion/variable-confirmacion.component';


declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generar-maestro',
  templateUrl: './generar-maestro.component.html',
  styleUrls: ['./generar-maestro.component.scss']
})
export class GenerarMaestroComponent implements OnInit {

  @ViewChild('content') content:ElementRef;

  ubicacion_estandar:any;
  seccion_estandar="";
  htmlContent:any;

  tagVariableApertura = "$VARSGSST_"
  tagVariableCierre = "_$"

  cadena_prueba = "dsfsdfsdfsdfsdfsdfds reemplazar dsfsdfsdfsdfsdfsdfds dsfsdfsdfsdfsdfsdfds dsfsdfsdfsdfsdfsdfdsdsfsdfsdfsdfsdfsdfdsdsfsdfsdfsdfsdfsdfdsdsfsdfsdfsdfsdfsdfds";

  dom:any;

  midoc = new jsPDF();

  valor:string;
  variables_encontradas: any;
  nombres_variables=[];

  cargar_variables=false;

  total_inputs = 0;

  constructor(private _formBuilder: FormBuilder,private _apiService: ApiService,private _snackBar: MatSnackBar,private route: ActivatedRoute,public _dialog: MatDialog, private _router:Router,private _generalService:GeneralService) { }
  
  nombre_estandar=this.route.snapshot.paramMap.get('estandar');
  
  nombre_empresa="Nombre de la empresa";
  nombre_documento = "NOMBRE DEL DOCUMENTO SG-SST";
  codigo="0001";
  fecha="12-12-2020";
  version="01";
  pagina="4";
  contenidos:any=[];
  contenidos$ = new Subject();
  doc:string;

  a = "&";


  detalleDocumentoForm = this._formBuilder.group({
    texto     : [, [Validators.required]],
  });


  stringToHTML(str){
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  };


  get telefonos(){
    return this.detalleDocumentoForm.get('telefonos') as FormArray;
  }

  agregarTelefono(){
    const telefonoFormGroup = this._formBuilder.group({telefono:'',descripcion:''});
    this.telefonos.push(telefonoFormGroup);
  }



  ngOnInit(): void {

    this.nombre_estandar=this.route.snapshot.paramMap.get('id');

    this._generalService.getSeccion().subscribe((data)=>{
      this.seccion_estandar=data;
    });

    this._generalService.getUbicacion().subscribe((data)=>{
      this.ubicacion_estandar=data;
    });

    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        this.procesarDataRuta(event.url);
        });

    this.contenidos$.subscribe((data)=>{
      this.contenidos=data
    });
  }

  procesarDataRuta(_url){
    const data_url = _url.split('/');
  }

  limpiarString(){
    //const texto = this.detalleDocumentoForm.value.texto;
    let resultado_contenido = this.htmlContent.replace(/['"]+/g, '-c0m1ll45-');
    resultado_contenido = encodeURIComponent(resultado_contenido);
    this.valor = resultado_contenido;
    return resultado_contenido;
  }

  public guardarPdf() {
    let DATA: any = this.content.nativeElement;
    const ht = `${this.htmlContent}`;
    const mijson = JSON.stringify({"documento":this.limpiarString()});
    const blob = new Blob([mijson], {type: "application/json"});
    this.saveImagenUsuario(blob);

  }





  saveImagenUsuario(archivo)
  {
    
    this._apiService.setMaestroArchivo(archivo, this.ubicacion_estandar).subscribe(
      (response: any) => {
          this._snackBar.open('Imágen guardada', null, {
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

  irLista() {
    this._router.navigate([`/estandar/${this.seccion_estandar}/${this.ubicacion_estandar}`]);
  }


  guardarMaestro(){
    const nombreQuery = "maestrodocumentos/setarchivomaestro";

    var valorMaestro ={
      estandar:this.ubicacion_estandar,
      valor:this.htmlContent
    };

    this._apiService.postQuery(nombreQuery, valorMaestro).subscribe(
      (response: any) => {

          this._snackBar.open('Imágen guardada', null, {
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
}
