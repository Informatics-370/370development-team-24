import { Component, Input, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.Service';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Schedule } from 'src/app/shared/schedule';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { EventEmitter } from '@angular/core';
import { CalendarService } from 'src/app/calendar.service';
import { format } from 'date-fns';
import { Schedule_Status } from 'src/app/shared/schedulestatus';
import { MatDialog } from '@angular/material/dialog';
import { HelpAddscheduleComponent } from './help-addschedule/help-addschedule.component';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./home.component.scss'],
})

export class AddScheduleComponent implements OnInit{

  formData = new FormData();
  bookingevents: BookingEvent[] = []; //events array 
  schedules: Schedule[] = [];
  //statuses:Schedule_Status[] = []; //Push to schedule array
  minDate: Date;
  maxDate: Date;
  

  constructor( private dataService: DataService, 
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<any>,// Inject DateAdapter
    private calendarService: CalendarService, // calendar service
    private dialog: MatDialog
  ) {
    //Set minimum date to only this year and December 31 a year in the future
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 0, 0);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }


   @Output() eventAdded: EventEmitter<void> = new EventEmitter<void>();
    //form controls
    scheduleform: FormGroup = this.fb.group({
      title: ['', [Validators.required,this.noSpacesValidator]],
      date: ['', Validators.required],
      start_Time: ['', Validators.required],
      end_Time: ['', Validators.required],
      event: [null, Validators.required],
      description:['',[Validators.required,this.noSpacesValidator]],
      //scheduleStatus:['',Validators.required],
    })

    ngOnInit(): void {
      this.GetAllEvents();
      this.dateAdapter.setLocale('en'); // Set your preferred 
    
      //this.GetAllScheduleStatus();
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
  // GetAllScheduleStatus()
  // {
  //   this.dataService.GetAllScheduleStatus().subscribe(result => {
  //     let schedulestatusList:any[] = result
  //     schedulestatusList.forEach((element) => {
  //       this.statuses.push(element)
        
  //     });
  //   })
  // }
   

  onSubmit() {
    if (this.scheduleform.valid) {
        const title = this.scheduleform.get('title')!.value;
        const date = this.scheduleform.get('date')!.value;
        const start_Time = this.scheduleform.get('start_Time')!.value;
        const end_Time = this.scheduleform.get('end_Time')!.value;
        const event = this.scheduleform.get('event')!.value;
        const description = this.scheduleform.get('description')!.value;
        //const scheduleStatus = this.scheduleform.get('scheduleStatus')!.value;
        
        

        // Create the schedule object
        const schedule = new Schedule();
        schedule.title = title;
        schedule.date = date;
        schedule.start_Time = start_Time;
        schedule.end_Time = end_Time;
        schedule.event = event;
        schedule.description = description;
        //schedule.scheduleStatus = scheduleStatus;
        
        // Send the data to the backend
        this.dataService.AddSchedule(schedule).subscribe(
            (result) => {
                const newSchedule: Schedule = result as Schedule;
                this.schedules.push(newSchedule);
                this.calendarService.updateCalendarEvents();
                this.router.navigateByUrl('schedule-display').then((navigated: boolean) => {
                    if (navigated) {
                        this.snackBar.open(title + ` created successfully`, 'X', { duration: 5000 });
                    }
                });
                this.eventAdded.emit();
                console.log('Schedule saved successfully');
            },
            (error) => {
                // Handle error here (e.g., display an error message to the user)
            }
        );
    }
}

openHelpModal(field: string): void {
  const dialogRef = this.dialog.open(HelpAddscheduleComponent, {
    width: '500px',
    data: { field } // Pass the field name to the modal
  });

  dialogRef.afterClosed().subscribe(result => {
    // Handle modal close if needed
  });
}


  //When cancel button is clicked method is executed
  onCancel(){
    this.router.navigate(['/schedule-display'])
  }

   // Custom validator to check for spaces
   noSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && control.value.trim().length === 0) {
      return { 'noSpaces': true };
    }
    return null;
  }
}
