import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-help-addemployees',
  templateUrl: './help-addemployees.component.html',
  styleUrls: ['./help-addemployees.component.css']
})
export class HelpAddemployeesComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
