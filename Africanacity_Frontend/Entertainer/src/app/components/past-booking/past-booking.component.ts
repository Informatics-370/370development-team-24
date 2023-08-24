import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Booked } from 'src/app/models/Booked';
import { Booking } from 'src/app/models/Booking';
import { BookingService } from 'src/app/services/Booking.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

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

  public fullName : string = "";
  constructor(
    private api : ApiService, 
    private auth: AuthService, 
    private userStore: UserStoreService,
    private book: BookingService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

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

  logout(){
    this.auth.signOut();
  }


  deleteItem(): void {
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this booking?', 'Confirm, Cancel',{
      duration: 5000, // Display duration in milliseconds
    });
  
    confirmationSnackBar.onAction().subscribe(() => {
      // Perform the deletion action here
      this.deleteItemFromServer();
      // Show success notification
      this.showNotification('Booking deletion request sent and email sent successfully', 'success');
      window.location.reload();
    });
  }
  
  showNotification(message: string, type: 'success' | 'error' | 'info') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar', `snackbar-${type}`], // You can define your custom CSS classes for different types
    });
  }
  
  deleteItemFromServer(): void {
    this.DeleteBooking;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredbookings = this.bookings.filter(booking => {
      const column2Value = booking.eventname.toLowerCase() || booking.eventname.toUpperCase();
 
  
  
      return column2Value.includes(filterValue) 
    });
  }


  DeleteBooking(bookId: Number){
    this.book.DeleteBooking(bookId).subscribe(result => {
      this.deleteItem();
      });
    }


  selectedBooking: Booking | undefined; // Define a variable to store the selected booking

  // ... (existing code) ...

  openModal(booking: Booking) {
    this.selectedBooking = booking; // Set the selected booking when "View" is clicked
    console.log(this.selectedBooking);
  }

  // getBooking(email: string) {
  //   this.book.GetBookingInfor(email)
  //     .subscribe(
  //       (data: any) => {
  //         this.filteredbookings = data;
  //       },
  //       (error: any) => {
  //         console.error('An error occurred:', error);
  //       }
  //     );
  // }

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
  
  
}
