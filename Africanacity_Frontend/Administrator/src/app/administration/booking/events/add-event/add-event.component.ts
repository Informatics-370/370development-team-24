import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { AbstractControl,FormBuilder ,FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { BookingEvent } from 'src/app/shared/bookingevent';
import { HelpAddeventComponent } from './help-addevent/help-addevent.component';

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

  
  constructor(private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar, private dataService: DataService, private fb: FormBuilder,) { }
  

  formData = new FormData();
  fileNameUploaded = '';

  eventsForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, this.noSpacesValidator]],
    description: ['',[Validators.required,this.noSpacesValidator]],
    date: ['',[Validators.required,this.noSpacesValidator]],
    image: ['', [Validators.required,this.noSpacesValidator]]
    
  });


  ngOnInit(): void {
    
  }

  cancel(){
    this.router.navigate(['/view-events'])
  }

  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('image', fileToUpload, fileToUpload.name);
    this.fileNameUploaded = fileToUpload.name
  }
 


  onSubmit() {
    if (this.eventsForm.valid) {
      //this.submittingBooking = true; // Set the flag to show loader
  
      // ... existing code ...
      if (this.eventsForm.valid) {
            // ... your existing code to append form data to formData ...
            this.formData.append('name', this.eventsForm.get('name')!.value);
             this.formData.append('description', this.eventsForm.get('description')!.value);
             this.formData.append('date', this.eventsForm.get('date')!.value);
             //this.formData.append('image', this.eventsForm.get('image')!.value);
  
             this.dataService.AddNewEvent(this.formData).subscribe(() => {
              this.clearData()
              this.router.navigateByUrl('view-events').then((navigated: boolean) => {
                if(navigated) {
                  this.snackBar.open(this.eventsForm.get('name')!.value + ` created successfully`, 'X', {duration: 5000});
                }
             });
            });
    }
   }
  }

  clearData(){
    this.formData.delete("name");
    this.formData.delete("description");
    this.formData.delete("date");
    this.formData.delete("image");
  }

  // Custom validator to check for spaces
  noSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && control.value.trim().length === 0) {
      return { 'noSpaces': true };
    }
    return null;
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpAddeventComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
  
}
