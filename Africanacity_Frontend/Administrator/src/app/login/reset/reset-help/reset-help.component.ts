import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-help',
  templateUrl: './reset-help.component.html',
  styleUrls: ['./reset-help.component.scss']
})
export class ResetHelpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
