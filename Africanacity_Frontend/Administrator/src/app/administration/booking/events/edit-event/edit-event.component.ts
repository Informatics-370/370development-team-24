import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { HelpEditeventsComponent } from './help-editevents/help-editevents.component';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  constructor(private dataService: DataService, 
    private router: Router, 
    private activated:ActivatedRoute,
    private snackBar: MatSnackBar, private dialog: MatDialog,){}

   editEvents: BookingEvent = new BookingEvent();
   formData = new FormData();
   fileNameUploaded = '';
   successMessage: string = '';

   updateEventsForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
 })

    ngOnInit(): void{
      this.activated.params.subscribe(params =>{
        this.dataService.GetEvent(params['id']).subscribe(result =>{
          this.editEvents = result as BookingEvent;
          this.updateEventsForm.controls['name'].setValue(this.editEvents.name);
          this.updateEventsForm.controls['description'].setValue(this.editEvents.description);
          this.updateEventsForm.controls['date'].setValue(this.editEvents.date);
          // this.updateEventsForm.controls['image'].setValue(this.editEvents.image);
        })
      })
    }

    cancel(){
      this.router.navigate(['/view-events'])
    }

    updateEvent() {
    
        // ... existing code ...
        if (this.updateEventsForm.valid) {
              // ... your existing code to append form data to formData ...
              this.formData.append('name', this.updateEventsForm.get('name')!.value);
              this.formData.append('description', this.updateEventsForm.get('description')!.value);
              this.formData.append('date', this.updateEventsForm.get('date')!.value);

        this.dataService.EditEvent(this.editEvents.eventId, this.formData).subscribe(
          () => {
            this.clearData();
            this.successMessage = 'Booking updated successfully!';
            setTimeout(() => {
              this.successMessage = ''; // Clear success message after a delay
              this.router.navigateByUrl('view-events');
            }, 5000); // Display success message for 5 seconds
          },
          (error) => {
           
          }
        );
      }
    
  }
  clearData(){
    this.formData.delete("demo");
    this.formData.delete("firstName");
    this.formData.delete("lastName");
    this.formData.delete("contactNumber");
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formData.append('image', file, file.name);
      this.fileNameUploaded = file.name;
    }
  }

    showSuccessMessage(message: string): void {
      const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }


    openHelpModal(field: string): void {
      const dialogRef = this.dialog.open(HelpEditeventsComponent, {
        width: '500px',
        data: { field } // Pass the field name to the modal
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Handle modal close if needed
      });
    }



}
