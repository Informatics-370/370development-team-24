import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-help-editinventoryitem',
  templateUrl: './help-editinventoryitem.component.html',
  styleUrls: ['./help-editinventoryitem.component.css']
})
export class HelpEditinventoryitemComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
