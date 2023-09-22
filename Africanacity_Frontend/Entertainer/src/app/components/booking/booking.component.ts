import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Entertainment } from 'src/app/models/Entertainment';
import { BookingService } from 'src/app/services/Booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/Booking';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.Service';
import { BookingEvent } from 'src/app/models/bookingevent';
import { BookingHelpComponent } from './booking-help/booking-help.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  entertainmentTypeData:Entertainment[]=[]
  toastContainer: any;
  public isValidEmail!: boolean;
  public users:any = [];
  bookingevents: BookingEvent[]=[];
  editBooking: BookingEvent = new BookingEvent();
  public role!:string;
  public fullName : string = "";
  formData = new FormData();
  fileNameUploaded = '';
  submittingBooking: boolean = false; // Flag to track submission state
  successMessage: string = '';

  bookingForm: FormGroup = this.fb.group({
   firstName: ['', [Validators.required, this.noSpacesValidator]],
   demo: ['', [Validators.required, this.noSpacesValidator]],
   lastName: ['', [Validators.required, this.noSpacesValidator]],
   contactNumber: ['', [ Validators.required, Validators.pattern(/^\d{10}$/), this.validateSouthAfricanNumber]],
   entertainmenttype: [null, Validators.required],
   email: ['', [Validators.required, this.noSpacesValidator]],
   eventname: ['', [Validators.required, this.noSpacesValidator]],
   Instagram: ['', [Validators.required, this.noSpacesValidator]],
   additional: ['', [Validators.required, this.noSpacesValidator]],
 });

 constructor(
  private apiService: BookingService,
   private fb: FormBuilder,
   private router: Router,
   private snackBar: MatSnackBar,
   private api : ApiService,
   private auth: AuthService,
   private route: ActivatedRoute,
   private userStore: UserStoreService,
   private dataService:DataService,
   private dialog: MatDialog ) {

    this.bookingForm.controls['eventname'].disable();
   }


  ngOnInit() {
    this.api.getUsers()
    .subscribe(res=>{
    this.users = res;
    });

    this.GetAllEntertainment();

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.route.params.subscribe(params => {
      this.dataService.GetEvent(params['id']).subscribe(res => {
        this.editBooking = res as BookingEvent;
        this.bookingForm.controls['eventname'].setValue(this.editBooking.name);
      });
    });

    const emailControl = this.bookingForm.get('email');

    if (emailControl) {
      emailControl.valueChanges.subscribe((value) => {
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
        this.isValidEmail = pattern.test(value);
      });
   }

    this.GetAllEvents()
  }

GetAllEntertainment(){
  this.apiService.GetAllEntertainment().subscribe(result => {
    let bookingList:any[] = result
   bookingList.forEach((element) => {
      this.entertainmentTypeData.push(element)
   });
  });
}

GetAllEvents()
  {
    this.dataService.GetAllEvents().subscribe(result => {
      let eventsList:any[] = result
      eventsList.forEach((element) => {
        this.bookingevents.push(element)

      });
    })
  }

 uploadFile = (files: any) => {
   let fileToUpload = <File>files[0];
   this.formData.append('demo', fileToUpload, fileToUpload.name);
   this.fileNameUploaded = fileToUpload.name
 }


onSubmit() {
  if (this.bookingForm.valid) {
    this.submittingBooking = true; // Set the flag to show loader

    // ... existing code ...
    if (this.bookingForm.valid) {
          // ... your existing code to append form data to formData ...
          this.formData.append('firstName', this.bookingForm.get('firstName')!.value);
           this.formData.append('lastName', this.bookingForm.get('lastName')!.value);
           this.formData.append('contactNumber', this.bookingForm.get('contactNumber')!.value);
           this.formData.append('email', this.bookingForm.get('email')!.value);
           this.formData.append('Instagram', this.bookingForm.get('Instagram')!.value);
           this.formData.append('entertainmenttype', this.bookingForm.get('entertainmenttype')!.value);
          this.formData.append('eventname', this.bookingForm.get('eventname')!.value);
          this.formData.append('additional', this.bookingForm.get('additional')!.value);

    this.apiService.addBooking(this.formData).subscribe(
      () => {
        this.clearData();
        this.successMessage = 'Booking request submitted successfully!';
        this.submittingBooking = false; // Clear loader flag
        setTimeout(() => {
          this.successMessage = ''; // Clear success message after a delay
          this.router.navigateByUrl('home');
        }, 5000); // Display success message for 5 seconds
      },
      (error) => {
        console.error('Error submitting booking:', error);
        this.submittingBooking = false; // Clear loader flag in case of error
      }
    );
  }
 }
}
// ...


cancel() {
  this.router.navigate(['/home']);
}


 clearData(){
   this.formData.delete("demo");
   this.formData.delete("firstName");
   this.formData.delete("lastName");
   this.formData.delete("contactNumber");
   this.formData.delete("email");
   this.formData.delete("Instagram");
   this.formData.delete("entertainmenttype");
   this.formData.delete("additional");
   this.formData.delete("eventname");
 }

  logout(){
    this.auth.signOut();
  }

     // Custom validator to check for spaces
     noSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null {
      if (control.value && control.value.trim().length === 0) {
        return { 'noSpaces': true };
      }
      return null;
    }

        // Custom validator to validate South African phone numbers
        validateSouthAfricanNumber(control: AbstractControl): { [key: string]: boolean } | null {
          const value = control.value;
          const isAllZeros = /^0+$/.test(value);
      
          if (isAllZeros) {
            return { 'allZeros': true };
          }
          return null;
        }

        openHelpModal(field: string): void {
          const dialogRef = this.dialog.open(BookingHelpComponent, {
            width: '500px',
            data: { field } // Pass the field name to the modal
          });
        
          dialogRef.afterClosed().subscribe(result => {
            // Handle modal close if needed
          });
        }

        
        validateFile(event: any) {
          const inputElement = event.target as HTMLInputElement;
          const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/webm', 'video/ogg'];
          const file = inputElement.files?.[0]; // Use optional chaining to safely access files
        
          if (file && allowedTypes.includes(file.type)) {
            // Valid file type, proceed with upload or processing
            this.uploadFile(file);
          } else {
            // Invalid file type, show an error message to the user
            alert('Invalid file type. Please select a valid image or video file.');
            // Optionally, you can clear the file input if needed
            inputElement.value = '';
          }
        }
        
        selectedFile: File | null = null;
        onFileSelected(event: any) {
          this.selectedFile = event.target.files[0] as File;
          this.formData.delete('file'); // Remove previous file if any
          this.formData.append('file', this.selectedFile);
        }
      

}


