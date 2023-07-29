import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/UserService/Booking.service';
import { ApiService } from 'src/app/UserService/api.service';
import { AuthService } from 'src/app/UserService/auth.service';
import { UserStoreService } from 'src/app/UserService/user-store.service';
import { Booking } from 'src/app/shared/Booking';
import { MatTableDataSource } from '@angular/material/table';
import { Pending } from 'src/app/shared/Pending';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent {

  bookings: Pending[] = [];
  filteredbookings: Pending[] = []; 

  public users:any = [];
  public role!:string;

  public fullName : string = "";
  constructor(
    private api : ApiService, 
    private auth: AuthService, 
    private userStore: UserStoreService,
    private book: BookingService,
    private snackBar: MatSnackBar,
    ) { }

    deleteItem(): void {
      const confirmationSnackBar = this.snackBar.open('Are you sure you want to cancel this booking?', 'Confirm, Cancel',{
        duration: 5000, // Display duration in milliseconds
  
      });
  
      
      //  cancel(){
      //    this.router.navigate(['/home'])
      //  }
    
  
      confirmationSnackBar.onAction().subscribe(() => {
        // Perform the deletion action here
        this.deleteItemFromServer();
        window.location.reload();
      });
    }
  
  deleteItemFromServer(): void {
    this.DeleteBooking;
  }

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

    this.book.getRequestBooks().subscribe((books:any) => {this.filteredbookings = books});

    this.filteredbookings= this.bookings
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


  DeleteBooking(bookId: Number){
    this.book. ManageDeleteBooking(bookId).subscribe(result => {
      this.deleteItem();
      });
    }

  logout(){
    this.auth.signOut();
  }
  selectedBooking: Booking | undefined; // Define a variable to store the selected booking

  // ... (existing code) ...

  openModal(booking: Booking) {
    this.selectedBooking = booking; // Set the selected booking when "View" is clicked
    console.log(this.selectedBooking);
  }

  acceptBooking(bookingId: number) {
    this.book.moveBookingToConfirmed(bookingId).subscribe(
      () => {
        // Remove the accepted booking from the pending list
        this.filteredbookings = this.filteredbookings.filter((booking) => booking.pending_BookingId !== bookingId);

        // Optionally, you can display a success message
        this.snackBar.open('Booking accepted successfully!', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        // Handle error if the API call fails
        console.error('Error accepting booking:', error);
        // Optionally, you can display an error message
        this.snackBar.open('Error accepting booking. Please try again later.', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
