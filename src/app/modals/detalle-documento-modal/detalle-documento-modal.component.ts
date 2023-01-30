import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/core/api/api.service';
import moment from 'moment';

@Component({
  selector: 'app-detalle-documento-modal',
  templateUrl: './detalle-documento-modal.component.html',
  styleUrls: ['./detalle-documento-modal.component.scss']
})
export class DetalleDocumentoModalComponent implements OnInit {

  detalleDocumentoForm = this._formBuilder.group({
    fecha     : [moment().format('YYYY-MM-DD'), [Validators.required]],
    version     : ['1', []],
    comentario     : [, []],
    vigencia     : [, []],
    archivo     : [, []],
    ubicacion     : [, []],
  });
  archivoDocumentoSeleccionado: any;

  guardar(){
    if (this.data.maestroDocumento) {
      this.guardarDetalleDocumentoMatriz();
    }
    
    if(this.data.detalleDocumento) {
      this.guardarDocumentoArchivo();
    }
  }

  guardarDetalleDocumentoMatriz()
  {
    const nombreQuery = "detalledocumentos/matriz";
    const valores=this.detalleDocumentoForm.value;
    valores.maestroId = this.data.maestroDocumento.id;
    valores.estado = 1;

    this._apiService.postQuery(nombreQuery, valores).subscribe(
      (response: any) => {
        this.dialogRef.close()
      },
      error => {
        console.log(error);
 
        /*this._snackBar.open('Error', null, {
          duration: 4000
        });*/
      }
    );
 }

  CambioInputArchivo(fileInputEvent: any) {
    this.archivoDocumentoSeleccionado= fileInputEvent.target.files[0];
  }

 
 guardarDocumentoArchivo()
 {
   const nombreQuery = "detalledocumentos/upload";
   const valores=this.detalleDocumentoForm.value;
   const formData = new FormData();
   formData.append("documentoId", this.data.detalleDocumento.id);
   formData.append("version", valores.version);
   formData.append("comentario", valores.comentario);
   formData.append("fecha", valores.fecha);
   formData.append("archivoDocumento", this.archivoDocumentoSeleccionado);

   this._apiService.postQueryFile(nombreQuery, formData).subscribe(
     (response: any) => {
       
       this.dialogRef.close();
     },
     error => {
       console.log(error);
     }
   );
}

  constructor(private _formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DetalleDocumentoModalComponent>,private _apiService: ApiService) { }

  ngOnInit(): void {
    
  }

}
