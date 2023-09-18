import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/UserService/Booking.service';
import { ApiService } from 'src/app/UserService/api.service';
import { AuthService } from 'src/app/UserService/auth.service';
import { UserStoreService } from 'src/app/UserService/user-store.service';
import { Booking } from 'src/app/shared/Booking';
import { Pending } from 'src/app/shared/Pending';
import { MatDialog } from '@angular/material/dialog';
import { ManageHelpComponent } from './manage-help/manage-help.component';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent {

  bookings: Pending[] = [];
  filteredbookings: Pending[] = []; 
  loading: boolean = true;
  bookingActionLoading: boolean = false;


  public users:any = [];
  public role!:string;

  public fullName : string = "";
  constructor(
    private api : ApiService, 
    private auth: AuthService, 
    private userStore: UserStoreService,
    private book: BookingService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) { }

  ngOnInit() {

    this.api.getUsers()
    .subscribe(res=>{
    this.users = res;
    });

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

    this.book.getRequestBooks().subscribe(
      (books: any) => {
        this.filteredbookings = books;
        this.loading = false; // Hide the loader
      },
      (error) => {
        console.error('Error fetching bookings:', error);
        this.loading = false; // Hide the loader in case of error as well
      }
    );

    // this.book.getRequestBooks().subscribe((books:any) => {this.filteredbookings = books});

    // this.filteredbookings= this.bookings
    console.log(this.filteredbookings)
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredbookings = this.bookings.filter(booking => {
      const column2Value = booking.firstName.toLowerCase() || booking.firstName.toUpperCase();
      const column3Value = booking.lastName.toLowerCase();
      return column2Value.includes(filterValue) || 
      column3Value.includes(filterValue) 
    });
  }

  acceptBooking(bookingId: number) {
    this.bookingActionLoading = true; // Set loading to true before making the API call
  
    this.book.moveBookingToConfirmed(bookingId).subscribe(
      () => {
        // Remove the accepted booking from the pending list
        this.filteredbookings = this.filteredbookings.filter((booking) => booking.pending_BookingId !== bookingId);
  
        // Optionally, you can display a success message
  
        this.snackBar.open('Booking accepted successfully!', 'Close', {
          duration: 3000,
        });
  
        this.bookingActionLoading = false; // Set loading back to false after the API call is completed
      },
      (error) => {
        // Handle error if the API call fails
        console.error('Error accepting booking:', error);
        // Optionally, you can display an error message
        this.snackBar.open('Error accepting booking. Please try again later.', 'Close', {
          duration: 3000,
        });
  
        this.bookingActionLoading = false; // Set loading back to false in case of an error
      }
    );
  }
  
  DeleteBooking(bookingId: number): void {
    this.bookingActionLoading = true; // Set loading to true before making the API call
  
    const confirmed = confirm('Are you sure you want to decline the booking?');
    if (confirmed) {
      this.book.ManageDeleteBooking(bookingId).subscribe(
        () => {
          // Remove the deleted booking from the list
          this.filteredbookings = this.filteredbookings.filter((booking) => booking.pending_BookingId !== bookingId);
  
          // Display a success message
          this.snackBar.open('Booking removed successfully!', 'Close', {
            duration: 3000,
          });
  
          this.bookingActionLoading = false; // Set loading back to false after the API call is completed
        },
        (error) => {
          console.error('Error removing booking:', error);
          // Display an error message
          this.snackBar.open('An error occurred while removing the booking.', 'Close', {
            duration: 3000,
          });
  
          this.bookingActionLoading = false; // Set loading back to false in case of an error
        }
      );
    }
  }


  logout(){
    this.auth.signOut();
  }
  selectedBooking: Booking | undefined; // Define a variable to store the selected booking

  openModal(booking: Booking) {
    this.selectedBooking = booking; // Set the selected booking when "View" is clicked
    console.log(this.selectedBooking);
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(ManageHelpComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
