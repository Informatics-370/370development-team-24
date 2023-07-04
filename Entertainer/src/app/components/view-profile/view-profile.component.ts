import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile } from 'src/app/models/Profile';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  public users:any = [];
  public role!:string;


  profileForm!: FormGroup;
  userData: any;
  public isDisabled: boolean = true; // or false depending on your logic


   public fullName : string = "";

  constructor(
    private auth: AuthService, 
    private api : ApiService, 
    private userStore: UserStoreService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {

    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    } else {
      // Handle the case when 'user' is not present in localStorage
      this.userData = { username: '', email: '' , firstName: '' ,lastName: '' , physicalAddress: '' ,contactNumber: '' }; // Provide default values or handle it differently
    }
  
    this.profileForm = this.formBuilder.group({
      username: [this.userData.username],
      email: [this.userData.email],
      firstName: [this.userData.firstName],
      lastName: [this.userData.lastName],
      physicalAddress: [this.userData.physicalAddress],
      contactNumber: [this.userData.contactNumber]
      
    });
    //  this.loadProfile();
 
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

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

  logout(){
    this.auth.signOut();
  }

}

