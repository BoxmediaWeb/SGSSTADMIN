import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/core/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import moment from 'moment';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'f:/BOXMEDIA 2020-2021/DESARROLLO/SW_SG_SST/admin/src/app/core/user/user.types';

@Component({
  selector: 'app-mutacion-detalle-documento-modal',
  templateUrl: './mutacion-detalle-documento-modal.component.html',
  styleUrls: ['./mutacion-detalle-documento-modal.component.scss']
})
export class MutacionDetalleDocumentoModalComponent implements OnInit {

    nombreArchivoSeleccionado:string;
    guardado = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    detalleDocumentoForm = this._formBuilder.group({
      fecha     : [moment().format('YYYY-MM-DD'), [Validators.required]],
      version     : ['1', []],
      comentario     : [, []],
      vigencia     : [, []],
      archivo     : [, []],
      enlace     : [, []],
    });
  archivoDocumento: any;
  usuarioActual: import("f:/BOXMEDIA 2020-2021/DESARROLLO/SW_SG_SST/admin/src/app/core/user/user.types").User;
  user: User;

  constructor(private sanitizer:DomSanitizer, public dialogRef: MatDialogRef<MutacionDetalleDocumentoModalComponent>,private _formBuilder: FormBuilder,private _apiService: ApiService,private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any,private _userService: UserService) {
    if(this.data.detalleDocumento){
      this.detalleDocumentoForm.controls["archivo"].clearValidators();
    }
  }

  cerrarModal(){
    const guardado = this.guardado;
    this.dialogRef.close({
      guardado:guardado
    });
  }

  CambioInputArchivo(fileInputEvent: any) {
    this.nombreArchivoSeleccionado=fileInputEvent.target.files[0].name;
    this.archivoDocumento= fileInputEvent.target.files[0];
  }

  guardar(){
    if(this.data.detalleDocumento){
      this.saveDetalleDocumentoArchivo();
    }else{
      this.saveDetalleDocumentoMatriz();
    }
  }

  detectarCambio(event){
    this.archivoDocumento= event.target.files[0];
  }

  getUsuarioLogueado(){
    this._userService.user$
    .pipe((takeUntil(this._unsubscribeAll)))
    .subscribe((user: User) => {
        this.user = user;
    })

  }


  extraerBase64=async($event:any)=> new Promise((resolve, reject)=>{
    try{
      const unsafeImg= window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          blob:$event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error =>{
        resolve({
          blob:$event,
          image,
          base: null
        });
      };
      
    } catch(e){
      return null;
    }
  });


  saveDetalleDocumentoArchivo()
  {
    const nombreQuery = "detalledocumentos/upload";

    const valores=this.detalleDocumentoForm.value;
    const formData = new FormData();

    formData.append("ubicacion", this.data.detalleDocumento.ubicacion);
    formData.append("estandar", this.data.detalleDocumento.MaestroDocumento.ubicacion);
    formData.append("detalleDocumentoId", this.data.detalleDocumento.id);
    formData.append("version", valores.version);
    formData.append("comentario", valores.comentario);
    formData.append("fecha", valores.fecha);
    formData.append("archivoDetalleDocumento", this.archivoDocumento);

    this._apiService.postQueryFile(nombreQuery, formData).subscribe(
      (response: any) => {
        
        this.cerrarModal();

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

 
 saveDetalleDocumentoMatriz()
 {
   const nombreQuery = "detalledocumentos/matriz";
   const valores=this.detalleDocumentoForm.value;
   valores.nombreEstandar=this.data.maestro;
   valores.indexEstandar=this.data.indice;


   this._apiService.postQuery(nombreQuery, valores).subscribe(
     (response: any) => {
       
       this.cerrarModal();

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

  ngOnInit(): void {
    this.getUsuarioLogueado();
  }

}
