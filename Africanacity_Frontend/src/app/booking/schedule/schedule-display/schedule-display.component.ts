import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGrid plugin
import interactionPlugin from '@fullcalendar/interaction';
import { AddScheduleComponent } from '../add-schedule/add-schedule.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.Service';


@Component({
  selector: 'app-schedule-display',
  templateUrl: './schedule-display.component.html',
  styleUrls: ['./schedule-display.component.css']
})

export class ScheduleDisplayComponent implements OnInit {
 
  private dialogRef: any;
  //newEvents: any[] = []; 
  constructor(private dialog: MatDialog, private dataService: DataService){}


  ngOnInit() {
    this.dataService.ScheduleDisplay().subscribe(
      (results: any[]) => {
        this.newEvents = results.map((schedule: any) => ({
          id: schedule.scheduleId,
          title: schedule.title,
          start: schedule.start_time,
        }));
        this.calendarOptions.events = this.newEvents;
      },
      (error) => {
        console.error('Error fetching schedules:', error);
      }
    );
  }

  newEvents: any = [
    {title: 'music slot', date: '2023-07-19',color:'#2196F3'},
    {title: 'dance', date: '2023-07-23',color:'#2196F3'},
    {title: 'poet slot', date: '2023-07-05',color:'#0000FF'},
  ];

  calendarOptions: CalendarOptions = {
   initialView: 'dayGridMonth',
     plugins: [dayGridPlugin, interactionPlugin],
     dateClick: this.onDateClick.bind(this),
     events: this.newEvents,
     //eventColor: 'color',
 };

 onDateClick(date: { dateStr: string }) {
  // Open the MatDialog and store the reference in dialogRef
 this.dialogRef = this.dialog.open(AddScheduleComponent, {
    width: '400px',
    data: date.dateStr, // Pass the selected dateStr to the dialog component if needed
    
  });
  this.dialogRef.componentInstance.eventAdded.subscribe((newEventData: any) => {
    if (newEventData) {
      // Create a new event object based on the emitted data
      let newEvent = {
        id: newEventData.scheduleid,
        title: newEventData.title,
        start: newEventData.start_time,
      };

      // Add the new event to the events array
      this.newEvents.push(newEvent);

      // Update the calendarOptions with the new events array
      this.calendarOptions.events = this.newEvents;
    }
  });
}


 createEvent() {
  const dialogRef = this.dialog.open(AddScheduleComponent, {
    width: '400px',
  });

  dialogRef.componentInstance.eventAdded.subscribe((newEventData: any) => {
    if (newEventData) {
      const newEvent = {
        title: newEventData.title,
        // start: newEventData.start_time,
        // end: newEventData.end_time,
        color: '#2196F3', // ... (add other properties as needed)
      };

      this.newEvents.push(newEvent);

      // Update the calendarOptions with the new events array
      this.calendarOptions.events = this.newEvents;
    }
  });
}


}
