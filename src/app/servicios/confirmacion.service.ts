import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationConfig } from '@fuse/services/confirmation';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { merge } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacionService {

  private _defaultConfig: FuseConfirmationConfig = {
    title      : 'Confirmación',
    message    : '¿Está seguro que desea llevar a cabo esta acción?',
    icon       : {
        show : true,
        name : 'heroicons_outline:exclamation',
        color: 'warn'
    },
    actions    : {
        confirm: {
            show : true,
            label: 'Confirm',
            color: 'warn'
        },
        cancel : {
            show : true,
            label: 'Cancel'
        }
    },
    dismissible: false
  };


  constructor(
    private _matDialog: MatDialog
  ) { }

  open(): MatDialogRef<FuseConfirmationDialogComponent>
  {
      // Merge the user config with the default config
      //const userConfig = merge({}, this._defaultConfig, config);

      // Open the dialog
      return this._matDialog.open(FuseConfirmationDialogComponent, {
          autoFocus   : false,
          disableClose: !this._defaultConfig.dismissible,
          data        : this._defaultConfig,
          panelClass  : 'fuse-confirmation-dialog-panel'
      });
  }
}
