import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { BookingEvent } from 'src/app/shared/bookingevent';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  constructor(private dataService: DataService, 
    private router: Router, 
    private activated:ActivatedRoute,
    private snackBar: MatSnackBar){}

   editEvents: BookingEvent = new BookingEvent();

   updateEventsForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
 })

    ngOnInit(): void{
      this.activated.params.subscribe(params =>{
        this.dataService.GetEvent(params['id']).subscribe(result =>{
          this.editEvents = result as BookingEvent;
          this.updateEventsForm.controls['name'].setValue(this.editEvents.name);
          this.updateEventsForm.controls['description'].setValue(this.editEvents.description);
        })
      })
    }

    cancel(){
      this.router.navigate(['/view-events'])
    }

    updateEvent(){
      let event = new BookingEvent();
      event.name = this.updateEventsForm.value.name;
      event.description = this.updateEventsForm.value.description;
  
      this.dataService.EditEvent(this.editEvents.eventId,event).subscribe((response:any) => {
  
        if (response.statusCode === 200) {
          this.router.navigate(['./view-events']);
          window.location.reload();
          this.showSuccessMessage('Event Details updated successfully!');
        } else {
          // Handle error if needed
        }
      },
      (error) => {
        // Handle error if needed
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




}
