import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-help',
  templateUrl: './edit-help.component.html',
  styleUrls: ['./edit-help.component.scss']
})
export class EditHelpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
