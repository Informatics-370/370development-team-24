import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent { 

  showDropdown = false;
  selectedOption = '';

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.showDropdown = true;
    // Perform any other actions based on the selected option
  }

  constructor( 
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar 
    )
    
  { }
  
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
view(): void {
  const url = this.router.serializeUrl(this.router.createUrlTree(['/view-profile']));
  window.location.href = url;
}

}


  

