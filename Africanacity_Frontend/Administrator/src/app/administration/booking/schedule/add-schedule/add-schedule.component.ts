import { Component, Input, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.Service';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Schedule } from 'src/app/shared/schedule';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { EventEmitter } from '@angular/core';
import { CalendarService } from 'src/app/calendar.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css'],
})

export class AddScheduleComponent implements OnInit{

  formData = new FormData();
  bookingevents: BookingEvent[] = []; //events array 
  schedules: Schedule[] = []; //Push to schedule array
  minDate: Date;
  maxDate: Date;
  

  constructor( private dataService: DataService, 
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<any>,// Inject DateAdapter
    private calendarService: CalendarService // calendar service
  ) {
    //Set minimum date to only this year and December 31 a year in the future
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 0, 0);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }


   @Output() eventAdded: EventEmitter<void> = new EventEmitter<void>();
    //form controls
    scheduleform: FormGroup = this.fb.group({
      title: ['', Validators.required],
      date: [null, Validators.required],
      start_Time: [null, Validators.required],
      end_Time: [null, Validators.required],
      event: [null, Validators.required],
      description:['',Validators.required]
    })

    ngOnInit(): void {
      this.GetAllEvents();
      this.dateAdapter.setLocale('en'); // Set your preferred locale
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
   

   //Save data from schedule form controls to the backend form
   onSubmit() {
    if (this.scheduleform.valid) {
      // Retrieve form data values
      const title = this.scheduleform.get('title')!.value;
      const date = this.scheduleform.get('date')!.value;
      const event = this.scheduleform.get('event')!.value;
      const description = this.scheduleform.get('description')!.value;
      const start_Time = this.scheduleform.get('start_Time')!.value + ':00';
      const end_Time = this.scheduleform.get('end_Time')!.value + ':00';
  
      // Manually format the date to ISO format (YYYY-MM-DD)
      const formattedDate = format(new Date(date), 'yyyy-MM-dd');
  
      // Create an object to hold the form data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('date', formattedDate);
      formData.append('event', event);
      formData.append('description', description);
      formData.append('start_Time', start_Time);
      formData.append('end_Time', end_Time);
      // Send form field data to the backend, save schedule
      this.dataService.AddSchedule(formData).subscribe(
        (result) => {
          // Clear form fields when schedule is successfully saved to the backend
          this.clearData();
          // Assume that the result from the backend contains the newly created schedule
          const newSchedule: Schedule = result as Schedule;
          this.schedules.push(newSchedule); // Add the new schedule to the array
           // Update calendar events in the CalendarService
          this.calendarService.updateCalendarEvents();
          this.router.navigateByUrl('schedule-display').then((navigated: boolean) => {
            if (navigated) {
              // Successful submission notification
              this.snackBar.open(title + ` created successfully`, 'X', { duration: 5000 });
            }
          });
          this.eventAdded.emit(); // Emit the event
          console.log('Schedule saved successfully');
        },
        (error) => {
          // Handle error here (e.g., display an error message to the user)
        }
      );
    }
  }
 
  //clear all input controls
  clearData(){
    this.formData.delete("title");
    this.formData.delete("eventName");
    this.formData.delete("start_Time");
    this.formData.delete("end_Time");
    this.formData.delete("description");
  }

  //When cancel button is clicked method is executed
  onCancel(){
    this.router.navigate(['/schedule-display'])
  }
}
