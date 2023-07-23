import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Event } from 'src/app/shared/event';

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
    event_name: new FormControl('',[Validators.required]),
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
  
    let event = new Event();
    event.event_name = this.eventsForm.value.surname;
    event.description = this.eventsForm.value.firstName;
    this.dataService.AddNewEvent(event).subscribe(result => {
      this.router.navigate(['/view-events'])
    });
  
    this.snackBar.open(
      this.eventsForm.get('event_name')!.value + ` created successfully`,
      'X',
     { duration: 5000 }
    );
  }

}
