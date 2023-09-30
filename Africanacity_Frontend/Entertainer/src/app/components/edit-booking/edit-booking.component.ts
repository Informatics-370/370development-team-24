import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Booked } from 'src/app/models/Booked';
import { Booking } from 'src/app/models/Booking';
import { Entertainment } from 'src/app/models/Entertainment';
import { BookingService } from 'src/app/services/Booking.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { EditHelpComponent } from './edit-help/edit-help.component';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.scss']
})
export class EditBookingComponent implements OnInit {

  selectedEntertainmentType: Entertainment | null = null;
  entertainmentTypeData: Entertainment[] = [];
  editBooking: Booking = new Booking();
  formData = new FormData();
  fileNameUploaded = '';
  public role!:string;
  public fullName : string = "";
  bookings: Booking[] = [];
  submittingBooking: boolean = false; // Flag to track submission state
  successMessage: string = '';
  public isValidEmail!: boolean;
  updateBookingForm: FormGroup = new FormGroup({
    lastName: new FormControl(['', [Validators.required, this.noSpacesValidator]]),
    firstName: new FormControl(['', [Validators.required, this.noSpacesValidator]]),
    entertainmenttype: new FormControl(['', [Validators.required, this.noSpacesValidator]]),
    email: new FormControl(['', [Validators.required, this.noSpacesValidator]]),
    contactNumber: new FormControl(['', [ Validators.required, Validators.pattern(/^\d{10}$/), this.validateSouthAfricanNumber]]),
    eventname: new FormControl(['', [Validators.required, this.noSpacesValidator]]),
    instagram: new FormControl(['', [Validators.required, this.noSpacesValidator]]),
    additional : new FormControl(['', [Validators.required, this.noSpacesValidator]]),
    demo: new FormControl(['', [Validators.required, this.noSpacesValidator]])
  });

  constructor(
    private bookingservice: BookingService,
    private router: Router,
    private activated: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private userStore: UserStoreService,
  ) {
     this.updateBookingForm.controls['eventname'].disable();
  }


  ngOnInit(): void {
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

    this.activated.params.subscribe(params => {
      this.bookingservice.getBooking(params['id']).subscribe(res => {
        this.editBooking = res as Booking;

        this.updateBookingForm.controls['lastName'].setValue(this.editBooking.lastName);
        this.updateBookingForm.controls['firstName'].setValue(this.editBooking.firstName);
        this.updateBookingForm.controls['email'].setValue(this.editBooking.email);
        this.updateBookingForm.controls['contactNumber'].setValue(this.editBooking.contactNumber);
        this.updateBookingForm.controls['eventname'].setValue(this.editBooking.eventname);
        this.updateBookingForm.controls['instagram'].setValue(this.editBooking.instagram);
        // this.updateBookingForm.controls['demo'].setValue(this.editBooking.demo);
        this.updateBookingForm.controls['additional'].setValue(this.editBooking.additional);
        

        const selectedType = this.entertainmentTypeData.find(type => type.entertainment_TypeId === this.editBooking.Entertainment_TypeId);
        if (selectedType) {
          this.selectedEntertainmentType = selectedType;
          this.updateBookingForm.patchValue({
            lastName: this.editBooking.lastName,
            firstName: this.editBooking.firstName,
            entertainmenttype: selectedType.entertainment_TypeId,
          });
        }
      });
    });

    const emailControl = this.updateBookingForm.get('email');

    if (emailControl) {
      emailControl.valueChanges.subscribe((value) => {
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
        this.isValidEmail = pattern.test(value);
      });
   }

    this. GetAllEntertainment();
  }


  cancel() {
    this.router.navigate(['/past-booking']);
  }

  GetAllEntertainment(){
    this.bookingservice.GetAllEntertainment().subscribe(result => {
      let bookingList:any[] = result
     bookingList.forEach((element) => {
        this.entertainmentTypeData.push(element)
     });
    });
  }


  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formData.append('demo', file, file.name);
      this.fileNameUploaded = file.name;
    }
  }

  updateBooking() {
    if (this.updateBookingForm.valid) {
      this.submittingBooking = true; // Set the flag to show loader
  
      // ... existing code ...
      if (this.updateBookingForm.valid) {
            // ... your existing code to append form data to formData ...
            this.formData.append('firstName', this.updateBookingForm.get('firstName')!.value);
            this.formData.append('lastName', this.updateBookingForm.get('lastName')!.value);
            this.formData.append('contactNumber', this.updateBookingForm.get('contactNumber')!.value);
            this.formData.append('email', this.updateBookingForm.get('email')!.value);
            //this.formData.append('Instagram', this.updateBookingForm.get('Instagram')!.value);
            this.formData.append('entertainmenttype', this.updateBookingForm.get('entertainmenttype')!.value);
            this.formData.append('eventname', this.updateBookingForm.get('eventname')!.value);
            this.formData.append('additional', this.updateBookingForm.get('additional')!.value);
  
      this.bookingservice.EditBooking(this.editBooking.bookingId, this.formData).subscribe(
        () => {
          this.clearData();
          this.successMessage = 'Booking updated successfully!';
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



  showSuccessMessage(message: string): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
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
          const dialogRef = this.dialog.open(EditHelpComponent, {
            width: '500px',
            data: { field } // Pass the field name to the modal
          });
        
          dialogRef.afterClosed().subscribe(result => {
            // Handle modal close if needed
          });
        }
}
