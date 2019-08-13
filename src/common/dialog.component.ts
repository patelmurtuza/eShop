import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: `./dialog.component.html`
})
export class DialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogConfig,
    public dialogRef: MatDialogRef<DialogComponent>
  ) { }

  get dialog(): MessageDialogConfig {
    return this.data;
  }
}

export interface MessageDialogConfig {
  title?: string;
  content?: string;
  ok?: string;
}
