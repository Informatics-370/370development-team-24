import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Booked } from 'src/app/models/Booked';
import { Booking } from 'src/app/models/Booking';
import { Entertainment } from 'src/app/models/Entertainment';
import { BookingService } from 'src/app/services/Booking.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

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
  bookings: Booked[] = [];

  updateBookingForm: FormGroup = new FormGroup({
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    entertainmenttype: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    contactNumber: new FormControl('', [Validators.required]),
    demo: new FormControl('', [Validators.required]),
    eventname: new FormControl('', [Validators.required]),
    instagram: new FormControl('', [Validators.required]),
    additional : new FormControl('', [Validators.required])
  });

  constructor(
    private bookingservice: BookingService,
    private router: Router,
    private activated: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private auth: AuthService, 
    private userStore: UserStoreService
  ) { 
    this.updateBookingForm.controls['eventname'].disable();
  }

  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('demo', fileToUpload, fileToUpload.name);
    this.fileNameUploaded = fileToUpload.name
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
        this.updateBookingForm.controls['additional'].setValue(this.editBooking.additional);

        const selectedType = this.entertainmentTypeData.find(type => type.name === this.editBooking.entertainmenttypeName);
        if (selectedType) {
          this.updateBookingForm.controls['entertainmenttype'].patchValue(selectedType.entertainment_TypeId);
        }
      });
    });
console.log(this.updateBookingForm)
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

  updateBooking() {
    let booking = new Booking();
    booking.lastName = this.updateBookingForm.value.lastName;
    booking.firstName = this.updateBookingForm.value.firstName;
    booking.entertainmenttypeName = this.updateBookingForm.value.entertainmenttype; 
    booking.email = this.updateBookingForm.value.email;
    booking.contactNumber = this.updateBookingForm.value.contactNumber;
    booking.demo = this.updateBookingForm.value.demo;
    booking.eventname = this.updateBookingForm.value.eventname;
    booking.instagram = this.updateBookingForm.value.instagram;
    booking.additional = this.updateBookingForm.value.additional;

    this.bookingservice.EditBooking(this.editBooking.bookingId, booking).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.router.navigate(['./past-booking']);
          window.location.reload();
          this.showSuccessMessage('Booking Information updated successfully!');
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

  logout(){
    this.auth.signOut();
  }

}
