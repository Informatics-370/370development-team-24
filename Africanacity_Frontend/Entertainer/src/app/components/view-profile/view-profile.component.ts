import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from 'src/app/models/Profile';
import { Router } from '@angular/router';

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
  public isDisabled: boolean = true; // or false depending on your logic

  constructor(
    private auth: AuthService, 
    private api : ApiService, 
    private userStore: UserStoreService,
    private router: Router
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
      this.api.deleteUser(this.UserId)
        .subscribe(
          () => {
            alert('User deleted successfully!');
            this.router.navigate(['/login'])
            // Perform any necessary actions after deletion, such as redirecting to a login page
          },
          (error) => {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting your account.');
          }
        );
    }
   }
  }
  



