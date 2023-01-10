import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/core/api/api.service';
import moment from 'moment';
import { Subject } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InputsComponent } from '../inputs/inputs.component';

@Component({
  selector: 'app-edit-maestro',
  templateUrl: './edit-maestro.component.html',
  styleUrls: ['./edit-maestro.component.scss']
})
export class EditMaestroComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,private _apiService: ApiService,private _snackBar: MatSnackBar,private route: ActivatedRoute,public _dialog: MatDialog,) { }


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

  getContenido(){
    const nombreQuery ='contenido';
    const queryParams=`search:""`;
    const queryProps='id,documento_id,tag,contenido,estilos';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.contenidos$.next(response.data.contenido);
     });
  }

  /*"node_modules/@fortawesome/fontawesome-free/css/all.css"*/

  ngOnInit(): void {
    this.getContenido();

    this.nombre_estandar=this.route.snapshot.paramMap.get('id');

    this.contenidos$.subscribe((data)=>{
      this.contenidos = data
    });
  }

  inputsModal(){
    const dialogRef = this._dialog.open(InputsComponent, {
      minWidth: '500px',
      maxHeight:'700px',
      data:{
      }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  setContenido(){
    const data = this.detalleDocumentoForm.value;
    let resultado_contenido = this.detalleDocumentoForm.value.texto.replace(/['"]+/g, '-c0m1ll45-');
    resultado_contenido = encodeURIComponent(resultado_contenido);
    const contenido = data.texto ? `contenido: "${encodeURIComponent(resultado_contenido)}",` : '';
    const documento_id = `documento_id: 1,`;
    const tag = `tag: "h2",`;
    const estilos = `estilos: "h2"`;
    const nombreQuery='contenido';
    const maestro = this.nombre_estandar ? `maestro_id: "${this.nombre_estandar}",` : '';
    const queryParams=`${documento_id}${tag}${contenido}${estilos}${maestro}`;


    const queryProps='id';


    this._apiService.setData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {

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
