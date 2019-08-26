import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: `./dialogconfirm.component.html`
})
export class DialogConfirmComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogConfig,
    public dialogRef: MatDialogRef<DialogConfirmComponent>
  ) { }

  get dialog(): DialogConfig {
    return this.data;
  }
}

export interface DialogConfig {
  title?: string;
  content?: string;
  ok?: string;
  close: string;
}
