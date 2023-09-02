import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';

@Component({
  selector: 'app-event-details-dailog',
  templateUrl: './event-details-dailog.component.html',
  styleUrls: ['./event-details-dailog.component.css']
})
export class EventDetailsDailogComponent {

  constructor(
    public dialogRef: MatDialogRef<EventDetailsDailogComponent>,
    private router: Router, private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  

  editEvent() {
    // Navigate to the EditScheduleComponent and pass the schedule's id as a parameter
    this.router.navigate(['/edit-schedule', this.data.scheduleId]);
    this.dialogRef.close();
  }
  
  
  deleteEvent() {
    // Call the deleteEvent method from DataService to delete the event from the backend
    this.dataService.RemoveSchedule(this.data.scheduleId).subscribe(
      (result) => {
        if (result === 'success') {
          // Emit 'delete' as the result to indicate successful deletion
          this.dialogRef.close('delete');
        } else {
          // Handle deletion failure
        }
      },
      (error) => {
        // Handle deletion error
      }
    );
  }
 
  closeDialog(): void {
    this.dialogRef.close();
  }

}

