import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-help',
  templateUrl: './manage-help.component.html',
  styleUrls: ['./manage-help.component.css']
})
export class ManageHelpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
