import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})


  export class NotificationDialogComponent {
    constructor(
      public dialogRef: MatDialogRef<NotificationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public message: string
    ) {}

    onConfirm(): void {
      this.dialogRef.close('Yes');
    }
  
    onCancel(): void {
      this.dialogRef.close('No');
    }
  

    }
