import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Injectable()
export class DialogService {

  constructor(public dialog: MdDialog) {}

  alert(title?: string, message?: string): MdDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      width: '350px',
      data: { title: title, message: message }
    });
  }

  confirm(title?: string, message?: string): MdDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      width: '350px',
      data: { title: title, message: message, showYesButton: true }
    });
  }

}
