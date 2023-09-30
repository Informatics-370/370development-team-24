import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../UserService/auth.service';
import { UserStoreService } from '../UserService/user-store.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent { 
  public role!:string;
  public fullName : string = "";
  showDropdown = false;
  selectedOption = '';
  public UserId!: number;

  // toggleDropdown(): void {
  //   this.showDropdown = !this.showDropdown;
  // }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.showDropdown = false;
    // Perform any other actions based on the selected option
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private userStore: UserStoreService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar 
    )     { }

  ngOnInit() {

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

       //UserId
       this.userStore.getUserIdFromStore()
       .subscribe(val=>{
         const userFromToken = this.auth.getUserIdFromToken();
         this.UserId = val || userFromToken;
       });
  }


 view(): void {
  const url = this.router.serializeUrl(this.router.createUrlTree(['/view-profile']));
  window.location.href = url;
}

// logout(){
//   this.auth.signOut();
// }

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



employeeDropdownVisible = false; // Initial state

  toggleDropdown(dropdownId: string): void {
    if (dropdownId === 'employee-dropdown') {
      this.employeeDropdownVisible = !this.employeeDropdownVisible;
    }
    // Add similar logic for other dropdowns if needed
  }
}

  

