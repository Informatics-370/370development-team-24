import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/UserService/api.service';
import { AuthService } from 'src/app/UserService/auth.service';
import { UserStoreService } from 'src/app/UserService/user-store.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  public users: any = [];
  public role!: string;
  public updateForm!: FormGroup;
  public fullName: string = "";
  public UserId!: number;
  public firstName: string = "";
  public lastName: string = "";
  public Email: string = "";
  public Phone: string = "";
  public Address: string = "";

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      physicalAddress: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', Validators.required]
    });
  
    this.api.getUsers().subscribe(res => {
      this.users = res;
    });

         //Username
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
    const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
      this.updateForm.get('username')?.setValue(this.fullName);
    });
  
    this.userStore.getNameFromStore().subscribe(val => {
      const firstNameFromToken = this.auth.getNameFromToken();
      this.firstName = val || firstNameFromToken;
      this.updateForm.get('firstName')?.setValue(this.firstName);
    });
    
    this.userStore.getLastNameFromStore().subscribe(val => {
      const lastNameFromToken = this.auth.getLastNameFromToken();
      this.lastName = val || lastNameFromToken;
      this.updateForm.get('lastName')?.setValue(this.lastName);
    });
    
    this.userStore.getPhoneFromStore().subscribe(val => {
      const phoneFromToken = this.auth.getPhoneFromToken();
      this.Phone = val || phoneFromToken;
      this.updateForm.get('contactNumber')?.setValue(this.Phone);
    });
    
    this.userStore.getAddressFromStore().subscribe(val => {
      const addressFromToken = this.auth.getAddressFromToken();
      this.Address = val || addressFromToken;
      this.updateForm.get('physicalAddress')?.setValue(this.Address);
    });
    
    this.userStore.getEmailFromStore().subscribe(val => {
      const emailFromToken = this.auth.getEmailFromToken();
      this.Email = val || emailFromToken;
      this.updateForm.get('email')?.setValue(this.Email);
    });
  
    //UserId
    this.userStore.getUserIdFromStore()
    .subscribe(val=>{
      const userFromToken = this.auth.getUserIdFromToken();
      this.UserId = val || userFromToken;
    });
  
   
  }

  onSubmit() {
    const confirmed = confirm('Are you sure you want to update your profile?');
    if (confirmed) {
      this.api.editAdmin(this.UserId, this.updateForm.value).subscribe(result => {
        // Redirect to the home page or any other desired location
        this.router.navigate(['/login']);
      });
    }
  }

  logout() {
    this.auth.signOut();
  }

  cancel() {
    this.router.navigate(['/view-profile']);
  }
}
