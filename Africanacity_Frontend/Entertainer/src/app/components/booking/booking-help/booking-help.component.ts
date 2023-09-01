import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-help',
  templateUrl: './booking-help.component.html',
  styleUrls: ['./booking-help.component.scss']
})
export class BookingHelpComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
