import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/UserService/api.service';
import { AuthService } from 'src/app/UserService/auth.service';
import { UserStoreService } from 'src/app/UserService/user-store.service';
import { Profile } from 'src/app/shared/Profile';
import { MatSnackBar } from '@angular/material/snack-bar';

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



  deleteItem(): void {
    const confirmationSnackBar = this.snackBar.open(
      'Are you sure you want to delete this entertainer?',
      'Delete',
      {
        duration: 5000, // Display duration in milliseconds
        panelClass: 'confirmation-snackbar',
      }
    );
  
    confirmationSnackBar.onAction().subscribe(() => {
      // Delete logic goes here
      console.log('Entertainer deleted.');
    });
  
    confirmationSnackBar.afterDismissed().subscribe((dismissed) => {
      if (dismissed.dismissedByAction) {
        console.log('Deletion cancelled by user.');
      } else {
        console.log('Deletion timed out.');
      }
    });
  }


  deleteItemFromServer(): void {
  this.deleteEntertainer;
  }

  constructor(
    private api : ApiService, 
    private auth: AuthService, 
    private userStore: UserStoreService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {

    this.GetEntertainers()
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
    this.api.getUsers().subscribe(result => {
      let entertainerList:any[] = result
      entertainerList.forEach((element) => {
        this.entertainers.push(element)
        
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
    deleteEntertainer(id: number){
      this.api.deleteUser(id).subscribe(result => {
        this.deleteItem();
        });
      }
}
