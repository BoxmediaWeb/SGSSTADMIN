import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { base64ToFile, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-recortar-imagen',
  templateUrl: './recortar-imagen.component.html',
  styleUrls: ['./recortar-imagen.component.scss']
})
export class RecortarImagenComponent implements OnInit {


  imageChangedEvent: any = '';
  croppedImage: any = '';
  originalHeight:number;
  originalWidth:number;
  renderHeightClass:string;
  renderWidthClass:string;
  renderClass: string;
  croppedImageFile: Blob;

  cortarImagen(){
    this.dialogRef.close({
      imagenRecortada:this.croppedImage,
      imagenRecortadaFile:this.croppedImageFile
    });
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event;
      this.croppedImageFile = base64ToFile(event.base64);
  }
  imageLoaded(image: LoadedImage) {
      console.log("La imagen fue cargada =>",image);
      this.originalHeight = image.original.size.height;
      this.originalWidth = image.original.size.width;
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  
  constructor(@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<RecortarImagenComponent>) { }

  ngOnInit(): void {
    this.imageChangedEvent = this.data.event;
    console.log("Estos son los archivos cargados =>",this.data.event.target);
  }

}
