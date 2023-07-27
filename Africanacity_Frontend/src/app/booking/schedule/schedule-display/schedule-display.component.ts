import { Component, ViewChild, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGrid plugin
import interactionPlugin from '@fullcalendar/interaction';
import { AddScheduleComponent } from '../add-schedule/add-schedule.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-schedule-display',
  templateUrl: './schedule-display.component.html',
  styleUrls: ['./schedule-display.component.css']
})

export class ScheduleDisplayComponent implements OnInit {
 
 

  constructor(private dialog: MatDialog){}

   private dialogRef: any;

  @ViewChild('fullcalendar') fullcalendar: any; // Get a reference to the calendar element
  // calendarPlugins = [dayGridPlugin, interactionPlugin];
  
  
  ngOnInit() {
    // Fetch events from a service or local storage and populate the calendarEvents array
    // For demonstration purposes, let's add a sample event:
 
  }


  // openEventDialog(): void {
  //   const dialogRef = this.dialog.open(AddScheduleComponent, {
  //     width: '400px',
  //     data: {
  //       title: 'Create Schedule', // You can change the title accordingly (Create or Edit)
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     // 'result' contains the form data when the dialog is closed with 'Save'.
  //     // Handle the data here (e.g., add it to the calendar, save to backend, etc.).
  //   });
  // }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.onDateClick.bind(this),
  };

  onDateClick(date: { dateStr: string }) {
    // Open the MatDialog and store the reference in dialogRef
    this.dialogRef = this.dialog.open(AddScheduleComponent, {
      width: '400px',
      data: date.dateStr, // Pass the selected dateStr to the dialog component if needed
      // You can also provide other MatDialog configuration options here
    });
  }
}
