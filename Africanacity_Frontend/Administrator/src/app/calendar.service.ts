// calendar.service.ts
import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { Schedule } from './shared/schedule';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private calendarEvents: EventInput[] = [];
  schedules: Schedule[] =[];

  getCalendarEvents(): EventInput[] {
    return this.calendarEvents;
  }

  updateCalendarEvents(events?: EventInput[]): void {
    if (events) {
      this.calendarEvents = events;
    } else {
      // If no argument is provided, format events from schedules
      this.calendarEvents = this.formatEventsForCalendar();
    }
  }
  
  formatEventsForCalendar(): EventInput[] {
    const events: EventInput[] = [];
    this.schedules.forEach((schedule) => {
      const startDateTime = this.parseDateString(schedule.date + ' ' + schedule.start_Time);
      const endDateTime = this.parseDateString(schedule.date + ' ' + schedule.end_Time);
  
      if (startDateTime && endDateTime) {
        const event: EventInput = {
          title: schedule.title,
          start: startDateTime.toISOString(), // Convert to ISO 8601 format
          end: endDateTime.toISOString(),     // Convert to ISO 8601 format
          extendedProps: {
            start_Time: schedule.start_Time,
            end_Time: schedule.end_Time,
          },
          // Other event properties as needed
        };
        events.push(event);
      }
    });
  
    return events;
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
 

}
