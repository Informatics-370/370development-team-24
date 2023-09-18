import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from 'src/app/UserService/Booking.service';
import { ApiService } from 'src/app/UserService/api.service';
import { AuthService } from 'src/app/UserService/auth.service';
import { UserStoreService } from 'src/app/UserService/user-store.service';
import { Booking } from 'src/app/shared/Booking';
import { BookingHelpComponent } from './booking-help/booking-help.component';

@Component({
  selector: 'app-booking-listing',
  templateUrl: './booking-listing.component.html',
  styleUrls: ['./booking-listing.component.css']
})
export class BookingListingComponent {

  bookings: Booking[] = [];
  filteredbookings: Booking[] = [];
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

    this.book.getBooks().subscribe(
      (books: any) => {
        this.filteredbookings = books;
        this.loading = false; // Hide the loader
      },
      (error) => {
        console.error('Error fetching bookings:', error);
        this.loading = false; // Hide the loader in case of error as well
      }
    );

    this.book.getBooks().subscribe((books:any) => {this.filteredbookings = books});

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



    DeleteBooking(bookingId: number): void {
      this.bookingActionLoading = true; // Set loading to true before making the API call
      const confirmed = confirm('Are you sure you want to delete the booking?');
      if (confirmed) {
        this.book.DeleteBooking(bookingId).subscribe(
          () => {
            // Remove the deleted booking from the list
            this.filteredbookings = this.filteredbookings.filter((booking) => booking.bookingId !== bookingId);
  
            // Display a success message
            this.snackBar.open('Booking deleted successfully!', 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            console.error('Error deleting booking:', error);
            // Display an error message
            this.snackBar.open('An error occurred while deleting the booking.', 'Close', {
              duration: 3000,
            });
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
    const dialogRef = this.dialog.open(BookingHelpComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
}
