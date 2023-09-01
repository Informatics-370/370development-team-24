import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-help-editemployee',
  templateUrl: './help-editemployee.component.html',
  styleUrls: ['./help-editemployee.component.css']
})
export class HelpEditemployeeComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
