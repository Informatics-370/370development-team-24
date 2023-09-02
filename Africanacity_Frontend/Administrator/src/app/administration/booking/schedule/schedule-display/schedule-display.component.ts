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
 import { HelpViewscheduleComponent } from './help-viewschedule/help-viewschedule.component';



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
   GetAllEvents()
   {
     this.dataService.GetAllEvents().subscribe(result => {
       let eventsList:any[] = result
       eventsList.forEach((element) => {
         this.bookingevents.push(element)
         
       });
     })
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

// Modify the formatEventsForCalendar method to include all events without filtering by date

formatEventsForCalendar(): EventInput[] {
  const events: EventInput[] = [];

  this.schedules.forEach((schedule) => {
    const dateString = schedule.date + ' ' + schedule.start_Time;
    const startDateTime = this.parseDateString(dateString);

    const endDateString = schedule.date + ' ' + schedule.end_Time;
    const endDateTime = this.parseDateString(endDateString);

    if (!startDateTime || !endDateTime || isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      //console.error('Invalid date or time format for schedule:', schedule);
      return; // Skip this schedule and continue with the next one
    }

    const event: EventInput = {
      title: schedule.title,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      extendedProps: {
        start_Time: schedule.start_Time,
        end_Time: schedule.end_Time,
      },
    };

    events.push(event);
  });

  return events;
}

  
  // Listen for event click in the calendar
  handleEventClick(info: any) {

    // Format start and end times
    const formattedStartTime = this.formatDateTime(info.event.extendedProps.start_Time);
    const formattedEndTime = this.formatDateTime(info.event.extendedProps.end_Time);
  
  
    // Ensure that formatted times are not empty
   if (!formattedStartTime || !formattedEndTime) {
      // Handle the case where times are not formatted correctly
      //console.error('Invalid time format');
     return;
    }
     // Find the corresponding booking event by matching the start_Time
     const schedule = this.schedules.find(event => event.start_Time === info.event.extendedProps.start_Time);
    if(schedule){

      const bookingEvent = this.bookingevents.find(event => event.name === schedule.eventName);
      console.log('event name', schedule);
      const dialogRef = this.dialog.open(EventDetailsDailogComponent,{
        data: {
          title:info.event.title,
          startStr: formattedStartTime,
          endStr: formattedEndTime,
          eventName:  bookingEvent ? bookingEvent.name : 'N/A',
          scheduleId: schedule ? schedule.scheduleId: null,
        }
      });
       // Subscribe to dialog close event
      dialogRef.afterClosed().subscribe(result => {
       if (result === 'edit') {
          // You can open the edit form with the event data
          this.router.navigate(['/edit-schedule', schedule.scheduleId]);
          // Implement this logic in EventDetailsDialogComponent
        } else if (result === 'delete') {
        // Remove the event from the FullCalendar events array and refresh the calendar
        this.calendarEvents = this.calendarEvents.filter((event) => event['scheduleId'] !== schedule.scheduleId);
        this.refreshCalendar();
      }
      });
    }
}

formatDateTime(dateTime: string | null): string {
  if (!dateTime) {
    return ''; // Handle null case by returning an empty string or some other default value
  }
  try {
    const timeParts = dateTime.split(':');
    if (timeParts.length === 2) {
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        // Format the DateTime to your desired format, e.g., 'hh:mm a'
        return this.datePipe.transform(date, 'hh:mm a') || '';
      }
    }
    console.error('Invalid time format:', dateTime);
    return ''; // Handle invalid time format by returning an empty string
  } catch (error) {
    console.error('Error parsing time:', dateTime);
    return ''; // Handle error by returning an empty string
  }
}



parseDateString(dateString: string | null): Date | null {
  if (!dateString) {
    return null;
  }
  try {
    // Parse the dateString into a JavaScript Date object
    return new Date(dateString);
  } catch (error) {
    console.error('Error parsing date:', dateString);
    return null;
  }
}

//method to refresh the calendar
refreshCalendar() {
  this.calendarOptions.events = this.calendarEvents;
}


openHelpModal(field: string): void {
  const dialogRef = this.dialog.open(HelpViewscheduleComponent, {
    width: '500px',
    data: { field } // Pass the field name to the modal
  });

  dialogRef.afterClosed().subscribe(result => {
    // Handle modal close if needed
  });
}

}






