import { Component, Input, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.Service';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Schedule } from 'src/app/shared/schedule';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css'],
})

export class AddScheduleComponent implements OnInit{

  formData = new FormData();
  @Input() events: any;
  bookingevents: BookingEvent[]=[];
  

  

  constructor( private dataService: DataService, 
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

    //form controls
    scheduleform: FormGroup = this.fb.group({
      title: ['', Validators.required],
      start_time: [null, Validators.required],
      date: [null, Validators.required],
      start_time_ampm: ['AM', Validators.required],
      end_time: [null, Validators.required],
      end_time_ampm: ['AM', Validators.required],
      event: [null, Validators.required],
      description:['',Validators.required]
    })

    ngOnInit(): void {
      this.GetAllEvents()
      if (this.data.event) {
        this.scheduleform.patchValue(this.data.event);
      }
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


   //Save data from schedule form controls to the backend form
 onSubmit() {
  if(this.scheduleform.valid)
  {
     this.formData.append('title', this.scheduleform.get('title')!.value);
    this.formData.append('eventName', this.scheduleform.get('eventName')!.value);
     this.formData.append('start_Time', this.scheduleform.get('start_Time')!.value);
     this.formData.append('end_Time', this.scheduleform.get('end_Time')!.value);
     this.formData.append('description', this.scheduleform.get('description')!.value);
     
     this.dataService.AddSchedule(this.formData).subscribe(() => {
       this.clearData()
       this.router.navigateByUrl('schedule-display').then((navigated: boolean) => {
         if(navigated) {
           this.snackBar.open(this.scheduleform.get('title')!.value + ` created successfully`, 'X', {duration: 5000});
         }
      });
     });
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

  onCancel(){
    this.dialogRef.close();
  }
}
