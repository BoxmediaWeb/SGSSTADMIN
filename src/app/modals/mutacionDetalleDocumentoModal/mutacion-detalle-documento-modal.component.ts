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
      version     : ['1', [Validators.required]],
      comentario     : [, []],
      vigencia     : [, [Validators.required]],
      archivo     : [, [Validators.required]],
      enlace     : [, [Validators.required]],
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
    /*if(this.data.maestro.tipo_documento!='Matriz'){
      this.saveImagenUsuario();
    }else{
      
    }
    this.guardado = true;*/
  }


  /*
  setDetalleDocumento(archivo_guardado=null){
    const data = this.detalleDocumentoForm.value;
    const id = this.data.detalleDocumento ?  `id: ${this.data.detalleDocumento.id},` : '';
    const fecha = data.fecha ?  `fecha: "${moment(data.fecha).format('YYYY-MM-DD')}",` : '';
    const estado = `estado: 1,`;
    const version = data.version ? `version: ${data.version},` : '';
    const vigencia = data.vigencia ? `vigencia: "${data.vigencia}",` : '';
    const comentario = data.comentario ? `comentario: "${data.comentario}",` : '';
    const usuario = this.user ? `usuario: "${this.user.name}",` : '';
    const maestro_id = this.data.maestro.id ? `maestro_id: ${this.data.maestro.id},` : '';
    const ubicacion_archivo = archivo_guardado && this.data.maestro.tipo_documento!='Matriz'?`ubicacion:"${archivo_guardado}"`:'';
    const ubicacion_enlace = data.enlace && this.data.maestro.tipo_documento=='Matriz'?`ubicacion:"${data.enlace}"`:'';

    const nombreQuery='detalleDocumento';
    const queryParams=`${id}${vigencia}${version}${estado}${comentario}${maestro_id}${ubicacion_archivo}${ubicacion_enlace}${fecha}${usuario}`;
    const queryProps='id';

    this._apiService.setData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {

        this._snackBar.open('Guardado', null, {
          duration: 4000
        });

        this.cerrarModal();
     },
     error => {
      console.log(error);

      this._snackBar.open('Error', null, {
        duration: 4000
      });
    }
     
     );
    }*/

    
  detectarCambio(event){
    //const imagenRecibida= event.target.files[0];
    this.archivoDocumento= event.target.files[0];
    //this.extraerBase64(this.archivoDocumento).then((documento:any)=>{
      //this.img_previsualizada = imagen.base;
    //});
    //console.log(event.target.files);
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


  saveImagenUsuario()
  {
    const prefijo_documento = this.data.maestro.ubicacion ? this.data.maestro.ubicacion:null;

    this._apiService.setDataArchivo(this.archivoDocumento, prefijo_documento).subscribe(
      (response: any) => {
          //this.setDetalleDocumento(response.nombre);

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
    /*
    if(this.data.maestro.tipo_documento=='Matriz'){
      this.detalleDocumentoForm.controls['archivo'].setValidators([]);
      this.detalleDocumentoForm.controls['enlace'].setValidators([Validators.required]);
      this.detalleDocumentoForm.controls['vigencia'].setValidators([Validators.required]);
    }else{
      this.detalleDocumentoForm.controls['enlace'].setValidators([]);
      this.detalleDocumentoForm.controls['archivo'].setValidators([Validators.required]);
      this.detalleDocumentoForm.controls['vigencia'].setValidators([]);
    }
    this.detalleDocumentoForm.controls['archivo'].updateValueAndValidity();
    this.detalleDocumentoForm.controls['enlace'].updateValueAndValidity();
    */

    this.getUsuarioLogueado();
  }

}
