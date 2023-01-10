import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationConfig } from '@fuse/services/confirmation';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { merge } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class GuardadoService {

  private _defaultConfig: FuseConfirmationConfig = {
    title      : 'Guardado',
    message    : 'El archivo ha sido guardado correctamente',
    icon       : {
        show : true,
        name : 'heroicons_outline:folder-open',
        color: 'success'
    },
    actions    : {
        confirm: {
            show : false,
            label: 'Confirm',
            color: 'warn'
        },
        cancel : {
            show : true,
            label: 'Aceptar'
        }
    },
    dismissible: false
  };

  constructor(
    private _matDialog: MatDialog
  ) { }

  open(): MatDialogRef<FuseConfirmationDialogComponent>
  {
      return this._matDialog.open(FuseConfirmationDialogComponent, {
          autoFocus   : false,
          disableClose: !this._defaultConfig.dismissible,
          data        : this._defaultConfig,
          panelClass  : 'fuse-confirmation-dialog-panel'
      });
  }
}
