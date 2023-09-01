import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-entertainer-help',
  templateUrl: './entertainer-help.component.html',
  styleUrls: ['./entertainer-help.component.css']
})
export class EntertainerHelpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
