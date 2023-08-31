import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { Schedule } from 'src/app/shared/schedule';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {

  constructor(private dataService:DataService,
    private fb: FormBuilder,
    private router: Router,)
  {}
   formData = new FormData();
   schedules: Schedule[] = []; // Array to store events retrieved from the backend
   bookingevents : BookingEvent[] = []
   
 ngOnInit(): void {
   this.GetEvents();
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

 //Method to retrieve the events from the backend that will be used for the event dropdown
 GetEvents(){
  this.dataService.GetAllEvents().subscribe(result => {
    let eventsList: any[] = result
    eventsList.forEach((element) => {
      this.bookingevents.push(element)
    });
  })
 }


 onCancel(){
  this.router.navigate(['/schedule-display'])
}

  
}
