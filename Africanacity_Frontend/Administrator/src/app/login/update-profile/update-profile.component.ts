import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/UserService/api.service';
import { AuthService } from 'src/app/UserService/auth.service';
import { UserStoreService } from 'src/app/UserService/user-store.service';
import { UpdateHelpComponent } from './update-help/update-help.component';

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
  public isValidEmail!: boolean;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog 
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      firstName:['', [Validators.required, this.noSpacesValidator]],
      lastName: ['', [Validators.required, this.noSpacesValidator]],
      username: ['', [Validators.required, this.noSpacesValidator]],
      email: ['', [Validators.required, this.noSpacesValidator]],
      physicalAddress: ['', [Validators.required, this.noSpacesValidator]],
      contactNumber:  ['', [ Validators.required, Validators.pattern(/^\d{10}$/), this.validateSouthAfricanNumber]]
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
  
   
  const emailControl = this.updateForm.get('email');

  if (emailControl) {
    emailControl.valueChanges.subscribe((value) => {
      const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
      this.isValidEmail = pattern.test(value);
    });
  }
  }

  checkValidEmail() {
    const emailControl = this.updateForm.get('email');
    if (emailControl) {
      const value = emailControl.value;
      const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
      this.isValidEmail = pattern.test(value);
      console.log('isValidEmail:', this.isValidEmail); // Add this line for debugging
    }
  }
  
  onSubmit() {
    this.checkValidEmail(); // Call this first to set isValidEmail
    console.log('isValidEmail:', this.isValidEmail); // Add this line for debugging
  
    if (this.isValidEmail) {
    const confirmed = confirm('Are you sure you want to update your profile?');
    if (confirmed) {
      this.api.editAdmin(this.UserId, this.updateForm.value).subscribe(result => {
        // Redirect to the home page or any other desired location
        this.router.navigate(['/login']);
      });
    }
   }
  }

  logout() {
    this.auth.signOut();
  }

  cancel() {
    this.router.navigate(['/view-profile']);
  }

    // Custom validator to check for spaces
    noSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null {
      if (control.value && control.value.trim().length === 0) {
        return { 'noSpaces': true };
      }
      return null;
    }

        // Custom validator to validate South African phone numbers
        validateSouthAfricanNumber(control: AbstractControl): { [key: string]: boolean } | null {
          const value = control.value;
          const isAllZeros = /^0+$/.test(value);
      
          if (isAllZeros) {
            return { 'allZeros': true };
          }
          return null;
        }
        openHelpModal(field: string): void {
          const dialogRef = this.dialog.open(UpdateHelpComponent, {
            width: '500px',
            data: { field } // Pass the field name to the modal
          });
        
          dialogRef.afterClosed().subscribe(result => {
            // Handle modal close if needed
          });
        }
}
