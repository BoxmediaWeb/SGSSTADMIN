import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { RecortarImagenComponent } from '../recortar-imagen/recortar-imagen.component';
import { EditarPasswordComponent } from '../editar-password/editar-password.component';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  fileTemp:any;
  imagenRecortada:any;
  tipo:string;
  imagenRecortadaFile: any;
  imagenOriginal: any;
  idEditar: any;
  usuarioSeleccionado:any;
  usuarioSeleccionado$ = new Subject();
  colores = [{bg:"#FFCDD2",text:"#B71C1C"},{bg:"#F8BBD0",text:"#880E4F"},{bg:"#E1BEE7",text:"#4A148C"},{bg:"#C5CAE9",text:"#311B92"},{bg:"#C5CAE9",text:"#1A237E"},{bg:"#BBDEFB",text:"#0D47A1"},{bg:"#B3E5FC",text:"#01579B"},{bg:"#B2EBF2",text:"#006064"},{bg:"#B2DFDB",text:"#004D40"},{bg:"#C8E6C9",text:"#1B5E20"}];
  usrAvatar: string;
  dataRoles: any;


  constructor(private _sanitizer: DomSanitizer, private _formBuilder: FormBuilder,private _route: ActivatedRoute,private _apiService: ApiService,public _dialog: MatDialog,private _router:Router,) { }

  perfilForm = this._formBuilder.group({
    tipoDocumento     : [, [Validators.required]],
    documento     : [, [Validators.required]],
    direccion     : [, [Validators.required]],
    email     : [, [Validators.required]],
    telefono     : [, [Validators.required]],
    nombres     : [, [Validators.required]],
    apellidos     : [, [Validators.required]],
    nickname     : [, [Validators.required]],
    placa     : [, []],
    fecha     : [, [Validators.required]],
    password_1     : [, []],
    password_2     : [, []],
    role : [,[]],
    color : [,[]]
  },{
    validator: this.ComparePassword("password_1", "password_2")
  });

  ComparePassword(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
  
      if (control.value !== matchingControl.value && !this.idEditar) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  editarPasswordModal(){
    const dialogRef = this._dialog.open(EditarPasswordComponent, {
      maxWidth: '700px',
      panelClass: "dialog-responsive",
      data:{
        userId:this.idEditar
      }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
    });

    console.log("Editar password");
  }

  recortarImagenModal(event) {

    
    this.imagenOriginal = event.target.files[0];
    console.log("Esta es la imagen original", this.imagenOriginal);

    const dialogRef = this._dialog.open(RecortarImagenComponent, {
      minWidth: '500px',
      data:{
        event
      }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      this.imagenRecortada = result.imagenRecortada;
      this.imagenRecortadaFile = result.imagenRecortadaFile;//this.guardarAvatarUsuario(result.imagenRecortadaFile,'10');
      
    });

    console.log("Recortar imágenes");
  }

  getRole(){
    const nombreQuery='roles';
    const queryParams=``;

    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
        this.dataRoles = response.rows;
        console.log("Data de los roles=>",response);
     }, error => {
       console.log("El error es", error);
     });
  }
  
  //imgPerfil: any;

  getColorJson(bg,text){
    return `${bg},${text}`
  }

  irListaUsuarios() {
    this._router.navigate([`/usuarios/detalle`]);
  }

  imgPerfilEvt($event){
    this.recortarImagenModal($event);
  }

  estructurarFormulario(){

    switch (this.tipo) {
      case 'usuarios':
        this.perfilForm.get('role').addValidators(Validators.required);
        //this.businessFormGroup.get('description').clearValidators(); 
        break;
      
      case 'conductores':
        break;
    
      case 'vendedores':
        break;

      case 'clientes':
        break;
    
      default:
        break;
    }

  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

  guardarAvatarUsuario(file,userId,userAvatar){

    console.log("Invocando función de guardar Avatar");
    const nombreQuery = "users/avatar";
    var body = new FormData();

    var fileConvertido : File = new File([file], this.imagenOriginal.name);

    body.append('userAvatar',userAvatar);
    body.append('userId',userId);
    body.append('imgAvatar',fileConvertido);
    /*El archivo debe estar de último https://medium.com/@muh__hizbullah/multer-req-body-null-object-when-send-file-with-other-field-string-using-formdata-b275b4364404*/
    this._apiService.postQueryFile(nombreQuery,body).subscribe((response)=>{
      console.log('La respuesta al guardar el archivo =>',response);
    });
    console.log("Guardar avatar del usuario");
  }

  guardarUsuario(){
    const nombreQuery ='users';
    const data = this.perfilForm.value;


    var dataUsuario = {
      name:`${data.nombres} ${data.apellidos}`,
      roleId:data.role,
      email:data.email,
      password:data.password_1,
      nick:data.nickname,
      avatar:null,
      status:"creado",
      Perfil:{
        nombres:data.nombres,
        apellidos:data.apellidos,
        fecha:data.fecha,
        tipoDocumento:data.tipoDocumento,
        documento:data.documento,
        direccion:data.direccion,
        telefono:data.telefono
      }
    }

    if(this.tipo!='usuarios'){
      data.role = this.tipo == 'clientes' ? 'cliente' : this.tipo == 'vendedores' ? 'vendedor': this.tipo == 'conductores' ? 'conductor' : '';
    }

    this._apiService.postQuery(nombreQuery,dataUsuario).
    subscribe((response) => {

      console.log("Esta es la función de guardar usuario =>",response);

      if(this.imagenRecortadaFile){
        this.guardarAvatarUsuario(this.imagenRecortadaFile,response.id,response.avatar);
      }

      this.irListaUsuarios();
     },
     error=>{
       console.log(error);
     }
     );

     console.log("Guardar usuarios");
  }

  
  valoresCliente(){
    var usuariosValores = {
      nombres:this.usuarioSeleccionado.name?this.usuarioSeleccionado.name.split(' ')[0]:"",
      apellidos:this.usuarioSeleccionado.name?this.usuarioSeleccionado.name.split(' ')[1]:"",
      tipoDocumento:this.usuarioSeleccionado.Perfil.tipoDocumento?this.usuarioSeleccionado.Perfil.tipoDocumento:"",
      documento:this.usuarioSeleccionado.Perfil.documento?this.usuarioSeleccionado.Perfil.documento:"",
      role:this.usuarioSeleccionado.Role.id? this.usuarioSeleccionado.Role.id:"",
      fecha:this.usuarioSeleccionado.Perfil.fecha? this.usuarioSeleccionado.Perfil.fecha:"",
      nickname:this.usuarioSeleccionado.nick?this.usuarioSeleccionado.nick:"",
      color:this.usuarioSeleccionado.Perfil.color?this.usuarioSeleccionado.Perfil.color:"",
      direccion:this.usuarioSeleccionado.Perfil.direccion?this.usuarioSeleccionado.Perfil.direccion:"",
      email:this.usuarioSeleccionado.email?this.usuarioSeleccionado.email:"",
      telefono:this.usuarioSeleccionado.Perfil.telefono?this.usuarioSeleccionado.Perfil.telefono:"",
      placa:this.usuarioSeleccionado.Perfil.placa?this.usuarioSeleccionado.Perfil.placa:"",
      password_1:this.usuarioSeleccionado.password?this.usuarioSeleccionado.password:"",
      password_2:this.usuarioSeleccionado.password?this.usuarioSeleccionado.password:"",
    };

    this.perfilForm.patchValue(usuariosValores);
  }

  getAvatar(){
    return `${environment.NodeServerUrl}/images/avatars/${this.usrAvatar}`;
  }

  getUsuario(){
    
    const nombreQuery =`users/${this.idEditar}`;
    const tipo = this.tipo ? `tipo=${this.tipo}`:"";

    const queryParams=`${tipo}`;
  
    this._apiService.getQuery(nombreQuery,queryParams).
    subscribe((response) => {
      console.log("Estos es el usuario seleccionado =>", response);
      console.log("Este es el avatar =>", response.avatar);

      this.usuarioSeleccionado$.next(response);
      this.usrAvatar = response.avatar;

      this.valoresCliente();


      this.usrAvatar;
      //this.perfilForm.setValue(usuariosValues);
     },
     error=>{
       console.log(error);
     }
     );

     console.log("Obtener usuario");
  }


  editarUsuario(){
    const nombreQuery =`user/${this.idEditar}`;
    var dataUsuario = this.perfilForm.value;

    if(this.tipo!='usuarios'){
      dataUsuario.role = this.tipo == 'clientes' ? 'cliente' : this.tipo == 'vendedores' ? 'vendedor': this.tipo == 'conductores' ? 'conductor' : '';
    }
  
    this._apiService.postQuery(nombreQuery,dataUsuario).
    subscribe((response) => {

      if(this.imagenRecortadaFile){
        console.log("imagen seleccionada para guardar =>", this.imagenRecortadaFile);
        this.guardarAvatarUsuario(this.imagenRecortadaFile,response.id,response.avatar);
      }

      this.irListaUsuarios();
     },
     error=>{
       console.log(error);
     }
     );

     console.log("Editar usuarios");
  }

  ngOnInit(): void {

    this.getRole();
    this.dataRoles;


    //this._route.parent.snapshot.paramMap.get('tipo');

    this.usuarioSeleccionado$.subscribe((data)=>{
      this.usuarioSeleccionado = data;
      console.log("Este es el usuario seleccionado", this.usuarioSeleccionado);
    });

    this._route.params.subscribe(
      (params)=>{
        this.tipo = params['tipo'];
        this.idEditar = params['id'];

        if (this.idEditar) {
          this.getUsuario();
          this.usrAvatar;
        }
        
        /*if (this.idEditar) {
          this.getUsuario(); 
        }*/
      });

      this.usrAvatar;

  }

}
