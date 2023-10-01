import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/UserService/api.service';
import { AuthService } from 'src/app/UserService/auth.service';
import { UserStoreService } from 'src/app/UserService/user-store.service';
import { Profile } from 'src/app/shared/Profile';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EntertainerHelpComponent } from './entertainer-help/entertainer-help.component';

@Component({
  selector: 'app-entertainer',
  templateUrl: './entertainer.component.html',
  styleUrls: ['./entertainer.component.css']
})
export class EntertainerComponent {

  //public users:any = [];
  public role!:string;
  public fullName : string = "";
  public UserId!: number;
  entertainers: Profile[] = [];
  filteredentertainers: Profile[] = [];
  loading: boolean = true;
  ActionLoading: boolean = false;

 
  deleteEntertainer(entertainerId: number): void {
    const confirmed = confirm('Are you sure you want to delete the entertainer?');
    if (confirmed) {
      this.api.deleteUser(entertainerId) // Use entertainerId here
        .subscribe(
          () => {
            alert('Entertainer deleted successfully!');
            // Refresh the list of entertainers after deletion
            this.GetEntertainers();
            this.ActionLoading = false; 
            location.reload()// Set loading back to false in case of an error
          },
          (error) => {
            console.error('Error deleting entertainer:', error);
            alert('An error occurred while deleting the entertainer.');
            this.ActionLoading = false; // Set loading back to false in case of an error
          }
        );
    }
  }
  

  constructor(
    private api : ApiService, 
    private auth: AuthService, 
    private userStore: UserStoreService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) { }

  ngOnInit() {

    this.GetEntertainers();
    this.loading = false; // Hide the loader in case of error as well
    console.log(this.entertainers)

    this.filteredentertainers= this.entertainers
    console.log(this.filteredentertainers)

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

  GetEntertainers()
  {
    this.api.GetUsers().subscribe(result => {
      let entertainerList:any[] = result
      entertainerList.forEach((element) => {
        this.entertainers.push(element)
        this.loading = false; // Hide the loader in case of error as well
      });
    })
  }

  logout(){
    this.auth.signOut();
  }


    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
      this.filteredentertainers = this.entertainers.filter(entertainer => {
        const column2Value = entertainer.firstName.toLowerCase() || entertainer.firstName.toUpperCase();
        const column3Value = entertainer.lastName.toLowerCase();
         const column4Value = entertainer.username.toLowerCase();
    
        return column2Value.includes(filterValue) ||
        column3Value.includes(filterValue) ||
        column4Value.includes(filterValue);
      });

    }
    
    openHelpModal(field: string): void {
      const dialogRef = this.dialog.open(EntertainerHelpComponent, {
        width: '500px',
        data: { field } // Pass the field name to the modal
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Handle modal close if needed
      });
    }
}
