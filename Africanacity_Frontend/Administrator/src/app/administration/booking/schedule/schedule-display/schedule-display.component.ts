 import { Component, OnInit } from '@angular/core';
 import { DataService } from 'src/app/service/data.Service';
 import { Schedule } from 'src/app/shared/schedule';
 import { MatDialog } from '@angular/material/dialog';
 import { BookingEvent } from 'src/app/shared/bookingevent';
 import { Router } from '@angular/router';
 import { MatSnackBar } from '@angular/material/snack-bar';
 import dayGridPlugin from '@fullcalendar/daygrid'; // Import the DayGrid plugin
 import interactionPlugin from '@fullcalendar/interaction'; // Import the Interaction plugin
 import { CalendarOptions } from '@fullcalendar/core'; 
 import { EventInput } from '@fullcalendar/core';
 import { EventDetailsDailogComponent } from '../event-details-dailog/event-details-dailog.component';
 import { CalendarService } from 'src/app/calendar.service';
 import { DatePipe } from '@angular/common';



 @Component({
   selector: 'app-schedule-display',
   templateUrl: './schedule-display.component.html',
   styleUrls: ['./schedule-display.component.css'],
   providers: [DatePipe], 
 })
 
 export class ScheduleDisplayComponent implements OnInit {
   schedules: Schedule[] = []; // Array to store events retrieved from the backend
   bookingevents : BookingEvent[] = [] //events array
   calendarEvents: EventInput[] = [];  // Define an array to store events for the FullCalendar component
      

   constructor(private dataService: DataService,
     private dialog: MatDialog,
     private snackBar: MatSnackBar,
     private router: Router, private calendarService: CalendarService,  private datePipe: DatePipe,
     
     ) { }

  ngOnInit(): void {
    this.GetAllSchedules();
    this.GetEvents();
    this.calendarEvents = this.calendarService.getCalendarEvents();
    

   }

   //Method to retrieve all schedule slots from the backend through the dataService
   GetAllSchedules(){
   this.dataService.ScheduleDisplay().subscribe(result => {
    let scheduleList:any[] = result
    scheduleList.forEach((element) => {
      this.schedules.push(element) //push the schedule object to the array 
    });

    // Call formatEventsForCalendar here, after data retrieval
    this.calendarEvents = this.formatEventsForCalendar();

   });
 }

 //Method to retrieve the events from the backend that will be used for the event dropdown
 GetEvents(){
  this.dataService.GetAllEvents().subscribe(result => {
    let eventsList: any[] = result
    eventsList.forEach((element) => {
      this.bookingevents.push(element)
    });
  })
 }
  
//Delete item method 
 deleteItem(): void {
  const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this schedule slot?', 'Delete, Cancel',{
    duration: 5000, // Display duration in milliseconds

  });
 }

 //Method to delete the selected schedule from the backend
 DeleteSchedule(scheduleId : Number){
  this.dataService.RemoveSchedule(scheduleId).subscribe(result => {
  this.deleteItem();
  });
 }
 
 
 calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin], // Load the DayGrid and Interaction plugins
  initialView: 'dayGridMonth', // Initial view
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,dayGridDay', // Adjust the views as needed
  },
  events: this.formatEventsForCalendar.bind(this), // Use the method to load events
  eventClick: this.handleEventClick.bind(this), // Handle date clicks
 
 };


 formatEventsForCalendar(): EventInput[] {
   const events: EventInput[] = [];
    this.schedules.forEach((schedule) => {
      const event: EventInput = {
      title: schedule.title,
      start: schedule.start_Time,
      end: schedule.end_Time,
      extendedProps: {  // Add extendedProps with start_Time and end_Time
        start_Time: schedule.start_Time,
        end_Time: schedule.end_Time,
      },
      // Other event properties as needed
    };
    events.push(event);
    });

   return events;
 }


  
  // Listen for event click in the calendar
  handleEventClick(info: any) {
    console.log('Event clicked', info.event);
    // Format start and end times
    const formattedStartTime = this.formatDateTime(info.event.extendedProps.start_Time);
    const formattedEndTime = this.formatDateTime(info.event.extendedProps.end_Time);
  
  
    // Ensure that formatted times are not empty
   if (!formattedStartTime || !formattedEndTime) {
      // Handle the case where times are not formatted correctly
      console.error('Invalid time format');
     return;
   }
     // Find the corresponding booking event by matching the start_Time
     const schedule: Schedule | undefined = this.schedules.find(event => event.start_Time === info.event.extendedProps.start_Time);
     console.log('Matching Schedule:', schedule);
     if(schedule){
      console.log('Event Name:', schedule.event);
      const dialogRef = this.dialog.open(EventDetailsDailogComponent,{
        data: {
          title:info.event.title,
          startStr: formattedStartTime,
          endStr: formattedEndTime,
          eventName: schedule.event,
        }
      });
       // Subscribe to dialog close event
      dialogRef.afterClosed().subscribe(result => {
       if (result === 'edit') {
          // Handle edit event here
          // You can open the edit form with the event data
          this.router.navigate(['/edit-schedule', info.event.id]);
          // Implement this logic in EventDetailsDialogComponent
        } else if (result === 'delete') {
        // Handle delete event here
        // Implement this logic in EventDetailsDialogComponent
      }
      });
    }
}

formatDateTime(dateTime: string | null): string {
  if (!dateTime) {
    return ''; // Handle null case by returning an empty string or some other default value
  }
  try {
    const date = new Date(dateTime);
    // Format the DateTime to your desired format, e.g., 'hh:mm a'
    return this.datePipe.transform(date, 'hh:mm a') || '';
  } catch (error) {
    console.error('Invalid time format:', dateTime);
    return ''; // Handle invalid date format by returning an empty string
  }
}

}






