import { Component, OnInit } from '@angular/core';
import { BookingEvent } from 'src/app/models/bookingevent';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.Service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { HomeHelpComponent } from './home-help/home-help.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogoutConfirmationComponent } from '../navbar/logout-confirmation/logout-confirmation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bookingevents: BookingEvent[]=[]
  public fullName : string = "";

  constructor( 
    private auth: AuthService,
    private api : ApiService, 
   private userStore: UserStoreService,
   private dataService:DataService ,
   private dialog: MatDialog,
   private snackBar: MatSnackBar 
    ) { }

  ngOnInit(): void {
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
    this.GetAllEvents()
    console.log(this.bookingevents)
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

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HomeHelpComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
}
