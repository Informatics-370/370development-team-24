import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { Schedule } from 'src/app/shared/schedule';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { CalendarService } from 'src/app/calendar.service';
import { MatDialog } from '@angular/material/dialog';
import { HelpEditscheduleComponent } from './help-editschedule/help-editschedule.component';
import { Schedule_Status } from 'src/app/shared/schedulestatus';
import { toDate } from 'date-fns';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})

export class EditScheduleComponent implements OnInit {

  constructor(private dataService:DataService,
    private fb: FormBuilder,private calendarService: CalendarService,
    private router: Router,  private activated: ActivatedRoute,  private snackBar: MatSnackBar,  private dialog: MatDialog,)
  {
    //Set minimum date to only this year and December 31 a year in the future
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 0, 0);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }
   formData = new FormData();
   schedules: Schedule[] = []; // Array to store events retrieved from the backend
   editSchedule: Schedule = new Schedule()
   minDate: Date;
   maxDate: Date;
   selectedEvent: BookingEvent | null = null;
   eventTypesData: BookingEvent[] = [];
   statuses: Schedule_Status[] = []; //Push to schedule array

   public eventName: any;
   
   ngOnInit(): void {
    this.activated.params.subscribe(params => {
      this.dataService.GetSchedule(params['id']).subscribe(res => {
        this.editSchedule = res as Schedule;

        this.Updatescheduleform.controls['title'].setValue(this.editSchedule.title);
        this.Updatescheduleform.controls['date'].setValue((this.editSchedule.date));
        this.Updatescheduleform.controls['start_Time'].setValue(this.editSchedule.start_Time);
        this.Updatescheduleform.controls['end_Time'].setValue(this.editSchedule.end_Time); 
        //this.Updatescheduleform.controls['eventName'].setValue(this.editSchedule.eventName);
        this.Updatescheduleform.controls['description'].setValue(this.editSchedule.description);

        // Find the selected Event Type in the eventTypesData array
        const selectedType = this.eventTypesData.find(type => type.name === this.editSchedule.eventName);
         if (selectedType) {
           this.Updatescheduleform.controls['eventName'].setValue(selectedType.eventId);
        }
        const selectedTypes = this.statuses.find(type => type.name === this.editSchedule.scheduleStatuses);
          if(selectedTypes){
          this.Updatescheduleform.controls['scheduleStatus'].setValue(selectedTypes.schedule_StatusId);
        }
      });
       
    });

    this.GetEvents();
    //this.GetAllScheduleStatus();
    console.log(this.editSchedule)
   }

  //form controls
  Updatescheduleform: FormGroup = this.fb.group({
    title: ['', [Validators.required, this.noSpacesValidator]],
    date: ['', [Validators.required, this.noSpacesValidator]],
    start_Time: ['', [Validators.required, this.noSpacesValidator]],
    end_Time: ['', [Validators.required, this.noSpacesValidator]],
    event: [null, Validators.required],
    description:['',[Validators.required, this.noSpacesValidator]],
    //scheduleStatus:['',Validators.required],
  })

 //Method to retrieve the events from the backend that will be used for the event dropdown
 GetEvents(){
  this.dataService.GetAllEvents().subscribe(result => {
    let eventsList: any[] = result
    eventsList.forEach((element) => {
      this.eventTypesData.push(element)
    });
  })
 }

//  GetAllScheduleStatus()
//  {
//    this.dataService.GetAllScheduleStatus().subscribe(result => {
//      let schedulestatusList:any[] = result
//      schedulestatusList.forEach((element) => {
//        this.statuses.push(element)
       
//      });
//    })
//  }

 updateSchedule() {
  let schedule = new Schedule();
  schedule.title= this. Updatescheduleform.value.title;
  schedule.date = this. Updatescheduleform.value.date;
  schedule.start_Time = this. Updatescheduleform.value.start_Time; 
  schedule.end_Time = this. Updatescheduleform.value.end_Time;
  schedule.event = this. Updatescheduleform.value.event;
  //schedule.scheduleStatus = this. Updatescheduleform.value.scheduleStatus;
  schedule.description = this. Updatescheduleform.value.description;

  this.dataService.EditSchedule(this.editSchedule.scheduleId, schedule).subscribe(
    (response: any) => {
      if (response.statusCode === 200) {
        this.calendarService.updateCalendarEvents();
        this.router.navigate(['/schedule-display']);
        window.location.reload();
        this.showSuccessMessage( schedule.title + 'Schedule updated successfully!');
      } else {
        this.showSuccessMessage( schedule.title + 'Schedule slot cannot be updated!');
      }
    },
    (error) => {
      this.showSuccessMessage( schedule.title +'s' +'' + 'Schedule cannot be updated!');
    }
  );
}

showSuccessMessage(message: string): void {
  const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
    duration: 3000, // Duration in milliseconds
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  });
}

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
  
      
      openHelpModal(field: string): void {
        const dialogRef = this.dialog.open(HelpEditscheduleComponent, {
          width: '500px',
          data: { field } // Pass the field name to the modal
        });
      
        dialogRef.afterClosed().subscribe(result => {
          // Handle modal close if needed
        });
      }


       // Function to format the input value as the user types

       /*
   // Function to format the input value as the user types
formatDate(event: any) {
  const inputValue = event.target.value;
  if (inputValue) {
    // Parse the input value as a Date object
    const parsedDate = new Date(inputValue);

    // Format the date as 'yyyy-MM-dd'
    const formattedDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;

    // Access the 'date' form control using the get method
    const dateControl = this.Updatescheduleform.get('date');

    if (dateControl) {
      // Set the formatted value to the 'date' form control
      dateControl.setValue(formattedDate, { emitEvent: false });
    }
  }
}*/

}
