import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home-help',
  templateUrl: './home-help.component.html',
  styleUrls: ['./home-help.component.scss']
})
export class HomeHelpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
