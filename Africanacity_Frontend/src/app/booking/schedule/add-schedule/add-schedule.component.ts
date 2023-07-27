import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.Service';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})

export class AddScheduleComponent implements OnInit{

  formData = new FormData();
  bookingevents: BookingEvent[]=[];
 

 

  constructor( private dataService: DataService, private fb: FormBuilder,private router: Router, 
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

    scheduleform: FormGroup = this.fb.group({
      title: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      event: [null, Validators.required],
    })

    ngOnInit(): void {
      this.GetAllEvents()
    }

  //Events method
  GetAllEvents()
  {
    this.dataService.GetAllEvents().subscribe(result => {
      let eventsList:any[] = result
      eventsList.forEach((element) => {
        this.bookingevents.push(element)
        
      });
    })
  }

   onSave(): void {
     if (this.scheduleform.valid) {
         const eventData = this.scheduleform.value;
         
        // Add any additional logic (e.g., saving to backend) here if needed.
     this.dialogRef.close(eventData);
      }
    }


  clearData(){
    this.formData.delete("title");
    this.formData.delete("start_time");
    this.formData.delete("end_time");
    this.formData.delete("event");
   
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
