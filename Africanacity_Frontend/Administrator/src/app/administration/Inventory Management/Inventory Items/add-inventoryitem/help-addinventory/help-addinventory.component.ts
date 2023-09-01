import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-help-addinventory',
  templateUrl: './help-addinventory.component.html',
  styleUrls: ['./help-addinventory.component.css']
})
export class HelpAddinventoryComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
