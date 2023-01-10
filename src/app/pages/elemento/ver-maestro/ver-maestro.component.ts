import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/core/api/api.service';
import { environment } from 'environments/environment';
import { GeneralService } from '../general.service';
import jsPDF from 'jspdf';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-ver-maestro',
  templateUrl: './ver-maestro.component.html',
  styleUrls: ['./ver-maestro.component.scss']
})
export class VerMaestroComponent implements OnInit {

  @ViewChild('content') content:ElementRef;

  detalleDocumentoForm = this._formBuilder.group({
    fecha     : [moment().format('YYYY-MM-DD'), [Validators.required]],
    version     : ['1', [Validators.required]],
    comentario     : [, []],
    vigencia     : [, [Validators.required]],
    archivo     : [, [Validators.required]],
    enlace     : [, [Validators.required]],
    texto     : [, [Validators.required]],
  });

  nombreArchivoSeleccionado:string;
  archivoDocumento: any;

  idDetalleDocumento:any;

  tagVariableApertura = "$VARSGSST_"
  tagVariableCierre = "_$"

  loadedDocument = false;
  htmlContent:any;
  ubicacion_estandar:any;
  maestro_doc:any;

  total_inputs=0;

  variables_encontradas = 0;
  nombres_variables = [];
  cargar_variables = false;

  valoresVariables=[];

  midoc = new jsPDF();
  seccion_estandar: string;

  constructor(private _formBuilder: FormBuilder,private _generalService:GeneralService,private _apiService:ApiService, private _snackbar:MatSnackBar,private _router:Router,private route: ActivatedRoute) { }

  entradaForm = this._formBuilder.group({
    telefonos : this._formBuilder.array([])
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
    ]
  };


  get getArrayTelefonos(){
    return this.entradaForm.get('telefonos') as FormArray;
  }

  addArrayTelefonos(){
    const control = <FormArray>this.entradaForm.controls['telefonos'];
    control.push(this._formBuilder.group({telefono:[]}));
  }

  CambioInputArchivo(fileInputEvent: any) {
    this.nombreArchivoSeleccionado=fileInputEvent.target.files[0].name;
    this.archivoDocumento= fileInputEvent.target.files[0];
  }

  setValores(){
    const telefonos = this.entradaForm.value.telefonos;
    const apertura = '-000var_doc-';
    const cierre = '-var_doc000-';
    var reemplazador;
    var reemplazable;

    for (let index = 0; index < this.nombres_variables.length; index++) {
      
      reemplazador=telefonos[index].telefono;
      reemplazable=apertura+this.nombres_variables[index]+cierre;

      this.maestro_doc=this.maestro_doc.replace(reemplazable,reemplazador);
    }

  }

  generarInputs(){
    for (let index = 0; index < this.total_inputs; index++) {
      this.addArrayTelefonos();
    }
  }


 removeIndexEstandar(str,index){
  const valoresStr=str.split('_');
  return valoresStr[index];
 }

 getMaestroArchivo()
  {
    const nombreQuery="maestrodocumentos/getarchivomaestro"
    const queryParams=`estandar=${this.ubicacion_estandar}`
    
    this._apiService.getQuery(nombreQuery,queryParams).subscribe(
      (response: any) => {

          this.htmlContent = response.mensaje;
          this.loadedDocument = true;

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

  
 getDetalleDocumentoArchivo()
 {
   const nombreQuery="detalledocumentos/getdetalledocumento"
   const queryParams=`id=${this.idDetalleDocumento}`


   this._apiService.getQuery(nombreQuery,queryParams).subscribe(
     (response: any) => {

         this.htmlContent = response.archivo;

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

  guardarDetalleDocumento()
  {
    const nombreQuery="detalledocumentos/setdetalledocumento";

    const detalleDocumento=this.detalleDocumentoForm.value;

    const dataQuery = {
      estandar:this.removeIndexEstandar(this.ubicacion_estandar,0),
      indice:this.removeIndexEstandar(this.ubicacion_estandar,1),
      valor:`${this.htmlContent}`,
      fecha:detalleDocumento.fecha,
      version:detalleDocumento.version,
      comentario:detalleDocumento.comentario
    }

    this._apiService.postQuery(nombreQuery,dataQuery).subscribe(
      (response: any) => {
          
          this._snackbar.open('Imágen guardada', null, {
            duration: 4000
          });

          this.irLista();
      },
      error => {
        console.log(error);

        this._snackbar.open('Error', null, {
          duration: 4000
        });
      }
    );
 }

 editarDetalleDocumento(){
  const nombreQuery=`detalledocumentos/setdetalledocumento`;
  const detalleDocumento=this.detalleDocumentoForm.value;
  const queryParams = `id=${this.idDetalleDocumento}`;

  const dataQuery = {
    estandar:this.removeIndexEstandar(this.ubicacion_estandar,0),
    indice:this.removeIndexEstandar(this.ubicacion_estandar,1),
    valor:`${this.htmlContent}`,
    fecha:detalleDocumento.fecha,
    version:detalleDocumento.version,
    comentario:detalleDocumento.comentario
  }
  
    this._apiService.postQuery(nombreQuery,dataQuery,queryParams).subscribe(
      (response: any) => {
          
          this._snackbar.open('Imágen guardada', null, {
            duration: 4000
          });

          this.irLista();
      },
      error => {
        console.log(error);

        this._snackbar.open('Error', null, {
          duration: 4000
        });
      }
    );
 }

 crearDetalleDocumento()
  {
    const nombreQuery="detalledocumentos";
    var listaVariables = [];

    for (let index = 0; index < this.nombres_variables.length; index++) {
      listaVariables.push({
        nombre:this.nombres_variables[index],
        valor:this.entradaForm.value.telefonos[index].telefono,
        detalleDocumentoId:15
      });
    }

    var prueba = listaVariables.map((data)=>{
      return {
        nombre:data.nombre,
        valor:data.valor,
        detalleDocumento: 16
      }
    });

    const dataQuery = {
      fecha:this.detalleDocumentoForm.value.fecha,
      nombreEstandar: this.removeIndexEstandar(this.ubicacion_estandar,0),
      indexEstandar: this.removeIndexEstandar(this.ubicacion_estandar,1),
      version:this.detalleDocumentoForm.value.version,
      comentario:this.detalleDocumentoForm.value.comentario,
      usuario:"Andrés Salas",
      estado:"1",
      docVariables:listaVariables
    }

    this._apiService.postQuery(nombreQuery,dataQuery).subscribe(
      (response: any) => {
          
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

getLabelsInputs(_indice){
  return this.nombres_variables[_indice];
}

saveImagenUsuario(archivo)
{
  this._apiService.setMaestroArchivo(archivo, this.ubicacion_estandar).subscribe(
    (response: any) => {
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

public guardarPdf() {
  let DATA: any = this.content.nativeElement;
  
  this.midoc.html(DATA, {
    callback:(doc)=>{
      var data = new Blob([doc.output()], {
        type: 'application/pdf'
      });
    }
  }).save('mi_archivo.pdf');
  
}

getVariablesDetalleDocumento(){
  const nombreQuery=`detalledocumentos/${this.idDetalleDocumento}`
  const queryParams=``
  
  this._apiService.getQuery(nombreQuery,queryParams).subscribe(
    (response: any) => {
        
       this.valoresVariables = response.DocVariables;
       this.replaceValoresVariables();

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

replaceValoresVariables(){

  let textoDoc=this.htmlContent;

  this.valoresVariables.map((data)=>{
    var nombreVariableOriginal=`${this.tagVariableApertura}${data.nombre}${this.tagVariableCierre}`;
    textoDoc = textoDoc.replace(nombreVariableOriginal,data.valor);
  });

  this.htmlContent = textoDoc;
}

buscarVariablesEnContenido(varText,indice){
  this.htmlContent.includes(varText, indice);
}

print(){
  window.print();
}

printDocumento() {
  var divToPrint = document.getElementById('imprimible');
  var newWin = window.open('', 'Print-Window');
  newWin.document.open();
  newWin.document.write('<html><link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" media="print"/><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
  newWin.document.close();
  setTimeout(function() {
    newWin.close();
  }, 10);
}

irLista(){
  this._router.navigate([`/estandar/${this.seccion_estandar}/${this.removeIndexEstandar(this.ubicacion_estandar,0)}`]);
}

  ngOnInit(): void {

    this.route.params.subscribe( (params) =>{
      this.idDetalleDocumento = params.idDetalleDocumento?params.idDetalleDocumento:null;

      this._generalService.getUbicacion().subscribe((data)=>{

        this.ubicacion_estandar = data;

        if(!this.idDetalleDocumento){
          this.maestro_doc;
          this.getMaestroArchivo();
          this.htmlContent;
        }else{
          this.getDetalleDocumentoArchivo();
          this.htmlContent;
        }

      });


      /*if(!this.idDetalleDocumento) {
        this._generalService.getUbicacion().subscribe((data)=>{
          this.ubicacion_estandar = data;
          this.maestro_doc;
          this.getMaestroArchivo();
          this.htmlContent;
        });
      }else{
        this.getDetalleDocumentoArchivo();
        this.htmlContent;
      }*/

    }
    );

    this._generalService.getSeccion().subscribe((data)=>{
      this.seccion_estandar=data;
    });

  }

}
