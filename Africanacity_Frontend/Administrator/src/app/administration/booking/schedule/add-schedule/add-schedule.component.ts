import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.Service';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Schedule } from 'src/app/shared/schedule';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css'],
})

export class AddScheduleComponent implements OnInit{

  formData = new FormData();
  bookingevents: BookingEvent[]=[];
  newEvents: Event[] = [];

  //Date Validation 
  minDate: Date;
  maxDate: Date;

  constructor( private dataService: DataService, private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //Set min date to 20 years in the past and a year in the future
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

     // Create an EventEmitter to emit the new event data
    @Output() eventAdded: EventEmitter<any> = new EventEmitter<any>();
    private customEventColor = '#2196F3';

    scheduleform: FormGroup = this.fb.group({
      title: ['', Validators.required],
      start_time: [null, Validators.required],
      start_time_ampm: ['AM', Validators.required],
      end_time: [null, Validators.required],
      end_time_ampm: ['AM', Validators.required],
      event: [null, Validators.required],
      description:['',Validators.required]
    })

    ngOnInit(): void {
      this.GetAllEvents()
    }

  //Retrieve Events method
  GetAllEvents()
  {
    this.dataService.GetAllEvents().subscribe(result => {
      let eventsList:any[] = result
      eventsList.forEach((element) => {
        this.bookingevents.push(element)
        
      });
    })
  }

  // onSave(): void {
  //   if (this.scheduleform.valid) {
  //     const eventData: Schedule = {
  //       title: this.scheduleform.get('title')!.value,
  //       start_time: this.scheduleform.get('start_time')!.value,
  //       scheduleid: 0,
  //       end_time: this.scheduleform.get('end_time')!.value,
  //       event: this.scheduleform.get('event')!.value,
  //       description: this.scheduleform.get('description')!.value,
  //     };

       
      
  //     // Emit the new event data to the parent component (ScheduleDisplayComponent)
  //     this.eventAdded.emit(eventData);

  //     // Close the dialog after saving
  //     this.dialogRef.close();

  //     // Show a snackbar message indicating successful event creation
  //     this.snackBar.open(eventData.title + ' created successfully', 'X', {
  //       duration: 5000,
  //     });
  //   }
  // }




  //  onCancel(): void {
  //   this.dialogRef.close();
  //  }
}
