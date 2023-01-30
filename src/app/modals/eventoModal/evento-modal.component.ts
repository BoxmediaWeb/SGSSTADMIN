import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/core/api/api.service';
import { UserService } from 'app/core/user/user.service';
import { ConfirmacionService } from 'app/servicios/confirmacion.service';
import moment from 'moment';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-evento-modal',
  templateUrl: './evento-modal.component.html',
  styleUrls: ['./evento-modal.component.scss']
})
export class EventoModalComponent implements OnInit {
  fecha_seleccionada=this.data.fecha_seleccionada;

  eventoForm = this._formBuilder.group({
    fecha     : [this.data.fechaSeleccionada?this.data.fechaSeleccionada:moment().format('YYYY-MM-DD'), [Validators.required]],
    nombre     : [, [Validators.required]],
    horaInicio     : [moment().format('HH:mm'), [Validators.required]],
    horaFin     : [moment().format('HH:mm'), [Validators.required]],
    observaciones     : [, []],
    estado     : [, [Validators.required]],
  });
  private _changeDetectorRef: any;
  usuarioActual: import("f:/BOXMEDIA 2020-2021/DESARROLLO/SW_SG_SST/admin/src/app/core/user/user.types").User;

  setEvento(){
    var data = this.eventoForm.value;

    const dataEvento = {
      fecha : `${moment(data.fecha).format('YYYY-MM-DD')} ${moment(data.horaInicio,'hh:mm:ss').format('HH:mm')}`,
      horaInicio : `${moment(data.horaInicio,'hh:mm:ss').format('HH:mm')}`,
      horaFin : `${moment(data.horaFin,'HH:mm:ss').format('HH:mm')}`,
      estado : `${data.estado}`,
      observaciones : data.observaciones,
      nombre : data.nombre
    }

    const nombreQuery='eventos';

    this._apiService.postQuery(nombreQuery,dataEvento).
    subscribe((response) => {

        this._snackBar.open('Guardado', null, {
          duration: 4000
        });

        this.cerrarModal();
     },
     error => {
      this._snackBar.open('Error', null, {
        duration: 4000
      });
    }
     
     );
    }

    cerrarModal(){
      this.dialogRef.close({});
    }

    modalConfirmacionBorrar(): void
    {
        // Abrir un diálogo con texto genérico
        const dialogRef = this._confirmacionServicer.open();
  
        dialogRef.afterClosed().subscribe((result) => {
            if(result=="confirmed"){
              this.borrarEvento();
            }else{
              
            }
        });
    }


    borrarEvento(){
      const nombreQuery='evento';
      const queryParams=`eliminar:1,id:${this.data.evento.id}`;
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
      }

  
  constructor(private _formBuilder: FormBuilder,private _apiService: ApiService,private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<EventoModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _confirmacionServicer: ConfirmacionService,private _userService: UserService) { }


  getUsuarioLogueado(){
    this.usuarioActual=this._userService.currentUser;
  }

  ngOnInit(): void {

    if(this.data.evento){
      this.eventoForm.setValue({
        nombre: this.data.evento.nombre,
        fecha: this.data.evento.fecha,
        hora_inicio: this.data.evento.hora_inicio,
        hora_fin: this.data.evento.hora_fin,
        observaciones: this.data.evento.observaciones,
        estado: this.data.evento.estado
      });
    }

  }

}
