import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Schedule } from 'src/app/shared/schedule';
@Component({
  selector: 'app-event-details-dailog',
  templateUrl: './event-details-dailog.component.html',
  styleUrls: ['./event-details-dailog.component.css']
})
export class EventDetailsDailogComponent {

  constructor(
    public dialogRef: MatDialogRef<EventDetailsDailogComponent>,
    private router: Router, private dataService: DataService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  

  editEvent() {
    // Navigate to the EditScheduleComponent and pass the schedule's id as a parameter
    this.router.navigate(['/add-schedule']);
    this.dialogRef.close();
  }
  
  

  deleteItemFromServer(): void{
    this.deleteEvent;
  }

  deleteItem(): void {
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this slot?', 'Delete  Cancel',{
      duration: 5000, // Display duration in milliseconds

    });
    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer();
     window.location.reload();
    })
  }

  deleteEvent(scheduleId: Number){
    this.dataService.RemoveSchedule(scheduleId).subscribe(result => {
      this.deleteItem();
      });
  }
 
  closeDialog(): void {
    this.dialogRef.close();
  }

}

