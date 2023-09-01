import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-help',
  templateUrl: './view-help.component.html',
  styleUrls: ['./view-help.component.scss']
})
export class ViewHelpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
