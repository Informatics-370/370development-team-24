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
      const event: EventInput = {
        title: schedule.title,
        start: schedule.start_Time,
        end: schedule.end_Time,
        eventName: schedule.event,
        // Other event properties as needed
      };
      events.push(event);
    });
   
    return events;
  }

}
