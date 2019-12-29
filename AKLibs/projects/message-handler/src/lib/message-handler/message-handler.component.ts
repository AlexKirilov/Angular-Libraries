import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ak-message-handler',
  templateUrl: './message-handler.component.html',
  styleUrls: ['./message-handler.component.scss']
})
export class MessageHandlerComponent {
  
  constructor(
    public dialogRef: MatDialogRef<MessageHandlerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close() { this.dialogRef.close(); }
}
