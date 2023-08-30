import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booked } from 'src/app/models/Booked';
import { Booking } from 'src/app/models/Booking';
import { BookingService } from 'src/app/services/Booking.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  public users:any = [];
  public role!:string;
  public fullName : string = "";

  constructor(
    private api : ApiService, 
    private auth: AuthService, 
    private userStore: UserStoreService,
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
  }

  logout(){
    this.auth.signOut();
  }

  searchQuery: string = '';


  filteredSections: any[] = []; // To store filtered sections
  
  // Sample categories, replace with your actual categories
  categories: string[] = ['Getting Started', 'Account Settings', 'View Booking', 'Sign Out'];
  
  // Sample sections, replace with your actual sections
  sections: any[] = [
    {
      id: 'view-profile',
      title: 'View Your Profile',
      description: 'To view your profile information, follow these steps:',
      steps: [
        'Click on your View Profile located in the side navigation bar.',
        'You will be redirected to your profile page where you can view, delete, change password and edit your profile information.'
      ]
    },
    {
      id: 'update-profile',
      title: 'Update Your Profile',
      description: 'To update your profile information, follow these steps:',
      steps: [
        'Click on your View profile located in the side navigation bar.',
        'You will be redirected to your profile page where you can view, delete, change password and edit your profile information.',
        'Select "Edit Profile" icon from the page.',
        'You will be redirected to the update profile page where you can update your profile details, including your name, email, and other information.',
        'After making the desired changes, click the "Save" button to save your updated profile information.'
      ]
    },
    {
    id: 'delete-profile',
    title: 'Delete Your Profile',
    description: 'If you want to delete your profile, follow these steps:',
    steps: [
      'Click on your View profile located in the side navigation bar.',
      'You will be redirected to your profile page where you can view, delete, change password and edit your profile information.',
      'Look for the option to "Delete Account".',
      'Click on the "Delete Account" option.',
      'Follow the on-screen prompts to complete the account deletion process.',
      'Keep in mind that deleting your account is irreversible and will result in the loss of all your account data.'
    ]
  },
  {
    id: 'change-password',
    title: 'Change Your Password',
    description: 'If you wish to change your account password, follow these steps:',
    steps: [
      'Log in to your account using your current credentials.',
      'Click on your View profile located in the side navigation bar.',
      'You will be redirected to your profile page where you can view, delete, change password and edit your profile information.',
      'You will be redirected to the update profile page where you can update your profile details, including your name, email, and other information.',
      'Click on the "Change Password" or "Update Password" option.',
      'You may be asked to provide your current password for verification.',
      'Enter your new desired password in the provided fields.',
      'Make sure your new password meets the specified criteria for security.',
      'Confirm your new password by entering it again in a second field.',
      'Click the "Save Changes" or "Update Password" button to confirm the password change.',
      'Your password will now be updated, and you will need to use the new password to log in.'
    ]
  },
  {
    id: 'sign-out',
    title: 'Sign Out',
    description: 'If you need to sign out from your account, follow these steps:',
    steps: [
      'Click on the "Sign Out" button located in the top navigation bar.',
      'Click on the "Logout" button located in the side navigation bar.',
      'You will be logged out of your account and redirected to the login page.',
    ]
  },
  ];

  search() {
    console.log('Search button clicked');
    console.log('Search query:', this.searchQuery);
    this.filteredSections = this.sections.filter(section => {
      return (
        section.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        section.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        section.steps.some((step: string) => step.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    });
    console.log('Filtered sections:', this.filteredSections); // Check the filtered sections
  }
  
  showAll: boolean = false; // Initialize the showAll variable

  showAllData() {
      this.showAll = true;
  }

}
