import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { BookingEvent } from 'src/app/shared/bookingevent';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],

  styles: [`
.message {
  padding: 10px;
  background-color: lightgray;
  margin-top: 10px;
}
`]
})
export class AddEventComponent implements OnInit {

  
  constructor(private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar, private dataService: DataService) { }
  

  eventsForm: FormGroup = new FormGroup({
    event_Name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    
  })

  ngOnInit(): void {
    
  }

  cancel(){
    this.router.navigate(['/view-events'])
  }

  onSubmit() {
    if (this.eventsForm.invalid) {
      return;
    }
  
    let event = new BookingEvent();
    event.event_Name = this.eventsForm.value.event_Name;
    event.description = this.eventsForm.value.description;
    this.dataService.AddNewEvent(event).subscribe(result => {
      this.router.navigate(['/view-events'])
    });
  
    this.snackBar.open(
      this.eventsForm.get('event_Name')!.value + ` created successfully`,
      'X',
     { duration: 5000 }
    );
  }

}
