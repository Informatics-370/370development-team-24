import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { Schedule } from 'src/app/shared/schedule';

@Component({
  selector: 'app-event-details-dailog',
  templateUrl: './event-details-dailog.component.html',
  styleUrls: ['./event-details-dailog.component.css']
})
export class EventDetailsDailogComponent {

  constructor(
    public dialogRef: MatDialogRef<EventDetailsDailogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Received data:', data);
  }
   

  onEditClick() {
    this.dialogRef.close('edit'); // Emit 'edit' as the result
  }

  onDeleteClick() {
    this.dialogRef.close('delete'); // Emit 'delete' as the result
  }

  editEvent() {
    // Navigate to the EditScheduleComponent and pass the schedule's id as a parameter
    this.router.navigate(['/edit-schedule', this.data.scheduleId]);
    this.dialogRef.close();
  }
  
  
 deleteEvent(){
  this.router.navigate(['/schedule-display']);
  this.dialogRef.close();
 }
 
  closeDialog(): void {
    this.dialogRef.close();
  }

}

