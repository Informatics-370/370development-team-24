import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/UserService/api.service';
import { AuthService } from 'src/app/UserService/auth.service';
import { UserStoreService } from 'src/app/UserService/user-store.service';
import { Profile } from 'src/app/shared/Profile';
import { ViewHelpComponent } from './view-help/view-help.component';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  users:Profile[] = [];
 
  public UserId!: number;
  public role!:string;
  public firstName : string = "";
  public lastName : string = "";
  public Email : string = "";
  public Phone : string = "";
  public Address : string = "";
  public fullName : string = "";
  public isDisabled: boolean = true; 


  constructor(
    private auth: AuthService, 
    private api : ApiService, 
    private userStore: UserStoreService,
    private router: Router,
    private dialog: MatDialog 
    ) { }

  ngOnInit() {
    this.api.getUsers()
    .subscribe(res=>{
    this.users = res;
    });

   // Username
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

     //FirstName
     this.userStore.getNameFromStore()
     .subscribe(val=>{
       const firstNameFromToken = this.auth.getNameFromToken();
       this.firstName = val || firstNameFromToken
     });
 
      //LastName
      this.userStore.getLastNameFromStore()
      .subscribe(val=>{
        const lastNameFromToken = this.auth.getLastNameFromToken();
        this.lastName = val || lastNameFromToken
      });
 
          //Phone Number
      this.userStore.getPhoneFromStore()
      .subscribe(val=>{
        const PhoneFromToken = this.auth.getPhoneFromToken();
        this.Phone = val || PhoneFromToken
      });
 
          //Addresss
      this.userStore.getAddressFromStore()
      .subscribe(val=>{
        const AddressFromToken = this.auth.getAddressFromToken();
        this.Address = val || AddressFromToken
      });
 
     
          //Email
      this.userStore.getEmailFromStore()
      .subscribe(val=>{
        const EmailFromToken = this.auth.getEmailFromToken();
        this.Email = val || EmailFromToken
      });
 
      //Role
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
  const url = this.router.serializeUrl(this.router.createUrlTree(['/update-profile']));
  window.location.href = url;
}

  logout(){
    this.auth.signOut();
  }

  deleteUser(): void {
    const confirmed = confirm('Are you sure you want to delete your account?');
    if (confirmed) {
      this.api.deleteAdmin(this.UserId)
        .subscribe(
          () => {
            alert('User deleted successfully!');
            this.router.navigate(['/login'])
            // Perform any necessary actions after deletion, such as redirecting to a login page
          },
          (error) => {
            console.error('Error deleting Admin:', error);
            alert('An error occurred while deleting your account.');
          }
        );
    }
   }

   openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(ViewHelpComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
  }
  



