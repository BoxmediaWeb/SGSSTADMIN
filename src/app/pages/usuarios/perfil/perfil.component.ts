import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { ImagenPerfilModalComponent } from 'app/modals/imagen-perfil-modal/imagen-perfil-modal.component';
import { environment } from 'environments/environment';
import moment from 'moment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario_id=this._route.snapshot.paramMap.get('id_usuario');
  usuario:any;
  imagenSeleccionada:any;
  imgSelect:any;
  dataRole:any[]=[];

  @ViewChild('imgPerfil') imgPerfil: ElementRef;

  perfilForm = this._formBuilder.group({
    cargo     : [, [Validators.required]],
    empresa     : [, [Validators.required]],
    email     : [, [Validators.required]],
    telefono     : [, [Validators.required]],
    nombres     : [, [Validators.required]],
    apellidos     : [, [Validators.required]],
    fecha_ingreso     : [, [Validators.required]],
    nickname     : [, [Validators.required]],
    password_1     : [, [Validators.required]],
    password_2     : [, [Validators.required]],
    role : [,[Validators.required]]
  });
  //imgPerfil: any;


  
  setUserPerfil(){
    const data = this.perfilForm.value;


    /*Si es para editar el usuario*/
    const id = this.usuario_id ? `id:${this.usuario_id},` : '';

    /*Valores para la tabla usuario*/
    const nombre_completo = data.nombres ? `name: "${data.nombres+' '+data.apellidos}",` : '';
    const email = data.email ? `email: "${data.email}",` : '';
    const password_1 = data.password_1 ? `password: "${data.password_1}",` : '';
    const role_id = data.role ? `role_id: ${data.role},` : '';


    /*Valores para la tabla perfil*/
    const perfil_nombres = data.nombres ? `perfil_nombres: "${data.nombres}",` : '';
    const perfil_apellidos = data.apellidos ? `perfil_apellidos: "${data.apellidos}",` : '';
    const perfil_fecha = data.fecha_ingreso ? `perfil_fecha: "${moment(data.fecha_ingreso).format('YYYY-MM-DD')}",` : '';
    const nickname = data.nickname ? `nickname: "${data.nickname}",` : '';
    const perfil_cargo = data.cargo ? `perfil_cargo: "${data.cargo}",` : '';
    const perfil_empresa = data.empresa ? `perfil_empresa: "${data.empresa}",` : '';
    const perfil_telefono = data.telefono ? `perfil_telefono: "${data.telefono}",` : '';

    const nombreQuery='user';
    const queryParams=`${id}${role_id}nickname:"${data.nombres}",avatar:"andres.jpg",${nombre_completo}${email}${password_1}${perfil_nombres}${perfil_apellidos}${perfil_fecha}${perfil_cargo}${perfil_empresa}${perfil_telefono}`;
    console.log("Estos son los queryparams =>",queryParams);
    const queryProps='id';

    this._apiService.setData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {

        console.log("Este es valor retornado =>", response.data.user.id);

        

        if(this.imgSelect){
          this.saveImagenUsuario(response.data.user.id);
        }else{
          this.perfilForm.reset();
        }

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


    imagenPerfilModal(evento) {

      const dialogRef = this._dialog.open(ImagenPerfilModalComponent, {
        maxWidth: '800px',
        maxHeight: '800px',
        data:{
          evento:evento
        }
      });
    
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log("Este es el retorno del dialogo =>", result.imgRetorno);
        this.imagenSeleccionada = result.imgRetorno.base64;
        this.imgSelect = result.imgRetorno.base64;

        console.log("Esta es la imagen", this.imgPerfil.nativeElement);
    });
    
    }


    detectarCambio(event: any){
      //const imagenRecibida= event.target.files[0];
      //this.evento=event;
      //this.getBase64(imagenRecibida);
      console.log("Este es el elemento enviado", event.target);
      this.imagenPerfilModal(event);
    }

    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => this.imagenSeleccionada=reader.result;
        reader.onerror = error => reject(error);
      });
    }


    saveImagenUsuario(user_id)
    {
  
      const data = this.perfilForm.value;

      const file = this.DataURIToBlob(this.imagenSeleccionada);

  
      this._apiService.setImagenPerfil(file, data.nickname, user_id).subscribe(
        (response: any) => {
            console.log("Esta es la respuesta",response);

            this.perfilForm.reset();
  
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



   DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  getUser(){
    const nombreQuery='user';
    const queryParams=`id:${this.usuario_id}`;
    const queryProps=`id,name,role_id,email,avatar,nickname,perfil{nombres,apellidos,fecha,cargo,empresa,telefono}`;

    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.usuario = response.data.user[0];
        console.log("Data usuarios=>",response.data.user[0]);
        this.imagenSeleccionada = `${environment.serverUrl}/fotos_perfil/${this.usuario.avatar}`;


        this.perfilForm.setValue({
          cargo: this.usuario.perfil.cargo,
          empresa: this.usuario.perfil.empresa,
          email: this.usuario.email,
          telefono: this.usuario.perfil.telefono,
          nombres: this.usuario.perfil.nombres,
          apellidos: this.usuario.perfil.apellidos,
          fecha_ingreso: this.usuario.perfil.fecha?moment(this.usuario.perfil.fecha).format('YYYY-MM-DD'):null,
          nickname: this.usuario.nickname,
          role: this.usuario.role_id,
          password_1: null,
          password_2: null
        });

     }, error => {
       console.log("El error es", error);
     });
  }

  getRole(){
    const nombreQuery='role';
    const queryParams=`search:""`;
    const queryProps=`id, nombre`;

    console.log("Llegué a getRole");

    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.dataRole = response.data.role;
        console.log("Devuelve estos roles =>", response.data.role);

     }, error => {
       console.log("El error es", error);
     });
  }

  constructor(private _sanitizer: DomSanitizer, private _formBuilder: FormBuilder,private _route: ActivatedRoute,private _apiService: ApiService, private _snackBar: MatSnackBar,public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.imagenSeleccionada = `${environment.serverUrl}/fotos_perfil/user-default.jpg`;

    this.getRole();
    this.dataRole;

    if(this.usuario_id){

      this.getUser();
      this.usuario;

      this.perfilForm.controls['password_1'].setValidators([]);
      this.perfilForm.controls['password_2'].setValidators([]);
    }

  }

}
