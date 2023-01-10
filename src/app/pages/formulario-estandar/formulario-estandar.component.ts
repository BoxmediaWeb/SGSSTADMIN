import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/core/api/api.service';
import moment from 'moment';
import { Subject } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-formulario-estandar',
  templateUrl: './formulario-estandar.component.html',
  styleUrls: ['./formulario-estandar.component.scss']
})

export class FormularioEstandarComponent implements OnInit {

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

  constructor(private _formBuilder: FormBuilder,private _apiService: ApiService,private _snackBar: MatSnackBar) { }


  getContenido(){
    const nombreQuery ='contenido';
    const queryParams=`search:""`;
    const queryProps='id,documento_id,tag,contenido,estilos';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        console.log("Estto viene de la tabla contenido => ", response.data.contenido);
        this.contenidos$.next(response.data.contenido);
     });
  }

  /*"node_modules/@fortawesome/fontawesome-free/css/all.css"*/

  ngOnInit(): void {
    this.getContenido();

    this.contenidos$.subscribe((data)=>{
      this.contenidos = data
    });
  }

  setContenido(){
    const data = this.detalleDocumentoForm.value;
    console.log("Este es el valor del formulario", this.detalleDocumentoForm.value.texto.replace(/<[^>]+>/g, ''));
    let resultado_contenido = this.detalleDocumentoForm.value.texto.replace(/['"]+/g, '-c0m1ll45-');
    resultado_contenido = encodeURIComponent(resultado_contenido);
    const contenido = data.texto ? `contenido: "${encodeURIComponent(resultado_contenido)}",` : '';
    const documento_id = `documento_id: 1,`;
    const tag = `tag: "h2",`;
    //const contenido = `contenido: "h2"`;
    const estilos = `estilos: "h2"`;
    const nombreQuery='contenido';
    const queryParams=`${documento_id}${tag}${contenido}${estilos}`;


    console.log("Decodificado---->", resultado_contenido = decodeURIComponent(resultado_contenido));
    console.log("Decodificado---->", resultado_contenido.replace('-c0m1ll45-','"'));

    const queryProps='id';

    console.log("Esots son los queryparams", queryParams);

    this._apiService.setData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {

      console.log("La respuesta del servidor --->", response);
        this._snackBar.open('Guardado', null, {
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