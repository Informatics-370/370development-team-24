import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-help',
  templateUrl: './update-help.component.html',
  styleUrls: ['./update-help.component.scss']
})
export class UpdateHelpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
