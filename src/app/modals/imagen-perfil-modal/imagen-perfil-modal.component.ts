import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-imagen-perfil-modal',
  templateUrl: './imagen-perfil-modal.component.html',
  styleUrls: ['./imagen-perfil-modal.component.scss']
})
export class ImagenPerfilModalComponent implements OnInit {
  evento=this.data.evento;
  imgPrevisualizacion:any;
  imgPerfil=null;
  sanitizer: any;
  imgRetorno = null;
  valorWidth = "width-[100%]";
  @ViewChild('imagenPrev') imagenPrev: ElementRef;

  imagenPerfilForm = this._formBuilder.group({
    archivo     : [, [Validators.required]]
  });
  //evento: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,private renderer: Renderer2, public dialogRef: MatDialogRef<ImagenPerfilModalComponent>) {
    
  }

  ngOnInit(): void {
    console.log("Esta es la imagen recibida =>",this.imgPrevisualizacion);
  }

  cerrarModal(){
    this.dialogRef.close({
      imgRetorno:this.imgRetorno
    });
  }

  cambioSlider(event){
    this.renderer.setAttribute(this.imagenPrev.nativeElement, "width", `${event.value*100}`);
    //this.cambioAncho(event.value);
  }

  cambioAncho(valor){
    this.renderer.setAttribute(this.imagenPrev.nativeElement, "width", `${valor*100}`);
    //this.imagenPrev.nativeElement.setAttribute("width", `${valor*100}px`);
  }

  formatLabel(value: number) {
    if (value >= 100) {
      return Math.round(value / 100);
    }
    return value;
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => this.imgPrevisualizacion=reader.result;
      reader.onerror = error => reject(error);
    });
  }

  detectarCambio(event: any){
    const imagenRecibida= event.target.files[0];
    //this.evento=event;
    this.getBase64(imagenRecibida);
  }

  cropImg(event:ImageCroppedEvent){
    this.imgRetorno = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.imgRetorno = event;
  }

  imgLoad(){
  }

  initCropper(){
  }

  imgFailed(){
  }

}
