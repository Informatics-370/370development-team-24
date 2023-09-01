import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-help',
  templateUrl: './change-help.component.html',
  styleUrls: ['./change-help.component.scss']
})
export class ChangeHelpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
