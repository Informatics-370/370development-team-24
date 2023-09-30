import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Booked } from 'src/app/models/Booked';
import { Booking } from 'src/app/models/Booking';
import { BookingService } from 'src/app/services/Booking.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { PastHelpComponent } from './past-help/past-help.component';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationComponent } from '../navbar/logout-confirmation/logout-confirmation.component';

@Component({
  selector: 'app-past-booking',
  templateUrl: './past-booking.component.html',
  styleUrls: ['./past-booking.component.scss']
})
export class PastBookingComponent implements OnInit {

  public users:any = [];
  email!: string;
  bookings: Booked[] = [];
  filteredbookings: Booked[] =[]; 
  public role!:string;
  loading: boolean = true;
  bookingActionLoading: boolean = false;

  public fullName : string = "";
  constructor(
    private api : ApiService, 
    private auth: AuthService, 
    private userStore: UserStoreService,
    private book: BookingService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.getBooking(email);
      } else {
        console.error('Username is undefined');
      }
    });

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

    this.filteredbookings= this.bookings
    console.log(this.filteredbookings)

  }

  logout() {
    const dialogRef = this.dialog.open(LogoutConfirmationComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // User confirmed the logout, perform the logout action
        this.auth.signOut();
        
        // Display a success notification
        this.snackBar.open('Logged out successfully', 'Close', {
          duration: 3000, // Duration in milliseconds
          panelClass: ['success-snackbar'], // Optional CSS classes for styling
        });
      }
    });
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredbookings = this.bookings.filter(booking => {
      const column2Value = booking.eventname.toLowerCase() || booking.eventname.toUpperCase();
 
  
  
      return column2Value.includes(filterValue) 
    });
  }

  
  DeleteBooking(bookingId: number): void {
    this.bookingActionLoading = true;
    const confirmed = confirm('Are you sure you want to delete the booking?');
    if (confirmed) {
      this.book.DeleteBooking(bookingId) 
      .subscribe(
        (response: any) => {
            if (response && response.message) {
                alert(response.message);
                this.router.navigate(['home'])
                this.bookingActionLoading = false;
            }
 
        },
        (error) => {
            console.error('Error deleting booking:', error);
            alert('An error occurred while sending the booking deletion request.');
            this.router.navigate(['home'])
            this.bookingActionLoading = false;
        }
    );
    
    // Use bookingId here
        // .subscribe(
        //   () => {
        //     alert('Booking deletion request sent successfully!');
        //     // Refresh the list of bookings after deletion
        //     this.router.navigate(['home'])
        //     this.bookingActionLoading = false;

        //   },
        //   (error) => {
        //     console.error('Error deleting booking:', error);
        //     alert('An error occurred while sending the booking deletion request.');
        //     this.router.navigate(['home'])
        //     this.bookingActionLoading = false;
        //   }
        // );
    }
  }

  selectedBooking: Booking | undefined; // Define a variable to store the selected booking


  openModal(booking: Booking) {
    this.selectedBooking = booking; // Set the selected booking when "View" is clicked
    console.log(this.selectedBooking);
  }

 getBooking(email: string) {
  this.book.GetBookingInfor(email).subscribe(
    (data: Booked[]) => {
      console.log(data); // Check the data received from the API
      this.filteredbookings = data;
    },
    (error: any) => {
      console.error('An error occurred:', error);
    }
  );
}
openHelpModal(field: string): void {
  const dialogRef = this.dialog.open(PastHelpComponent, {
    width: '500px',
    data: { field } // Pass the field name to the modal
  });

  dialogRef.afterClosed().subscribe(result => {
    // Handle modal close if needed
  });
}
  
}
