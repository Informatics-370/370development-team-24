import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/UserService/auth.service';
import { ResetPasswordService } from 'src/app/UserService/reset-password.service';
import { UserStoreService } from 'src/app/UserService/user-store.service';
import { confirmPassowrdValidator } from 'src/app/helpers/confirm-password.validator';
import ValidateForm from 'src/app/helpers/validationform';
import { ResetPassword } from 'src/app/shared/reset-password.model';
import { ChangeHelpComponent } from './change-help/change-help.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm!: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  public fullName : string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required] // Add this line
    });
  }

  get formControls() {
    return this.changePasswordForm.controls;
  }
 

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }
  
    if (this.formControls['newPassword'].value !== this.formControls['confirmPassword'].value) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
  
    const request = {
      oldPassword: this.formControls['oldPassword'].value,
      newPassword: this.formControls['newPassword'].value,
      confirmPassword: this.formControls['confirmPassword'].value
    };
  
    this.authService.changePassword(request).subscribe(
      () => {
        this.successMessage = 'Password changed successfully.';
        this.errorMessage = null;
        this.changePasswordForm.reset();
        this.submitted = false;

        this.router.navigate(['/login']); // Adjust the route as needed
      },
      (error) => {
        this.errorMessage = error.error.Message;
        this.successMessage = null;
      }
    );
  }
  
  calculatePasswordStrength(password: string): string {
    const minLengthRegex = /(?=.{8,})/;
    const alphaNumericRegex = /(?=.*[a-zA-Z])(?=.*\d)/;
    const uniqueCharacterRegex = /^(?!.*(.).*\1)/;
  
    if (minLengthRegex.test(password) && alphaNumericRegex.test(password) && uniqueCharacterRegex.test(password)) {
      return 'Strong';
    } else if (minLengthRegex.test(password) && alphaNumericRegex.test(password)) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  }
  
  passwordStrength: string = 'Weak';
  passwordStrengthClass: string = 'weak';
  passwordStrength1: string = 'Weak';
  passwordStrengthClass1: string = 'weak';
  passwordsMatch: boolean = false;

  updatePasswordStrength() {
    const newPassword = this.formControls['newPassword'].value;
    const oldPassword = this.formControls['oldPassword'].value;
    
    this.passwordsMatch = newPassword === oldPassword;
  
    const strength = this.calculatePasswordStrength(newPassword);
  
    this.passwordStrength = strength;
  
    if (strength === 'Strong') {
      this.passwordStrengthClass = 'strong';
    } else if (strength === 'Medium') {
      this.passwordStrengthClass = 'medium';
    } else {
      this.passwordStrengthClass = 'weak';
    }
  }
  

  updateConfirmPasswordStrength() {
    const confirmPassword = this.formControls['confirmPassword'].value;
    const strength1 = this.calculatePasswordStrength(confirmPassword);
  
    this.passwordStrength1 = strength1;
  
    if (strength1 === 'Strong') {
      this.passwordStrengthClass1 = 'strong';
    } else if (strength1 === 'Medium') {
      this.passwordStrengthClass1 = 'medium';
    } else {
      this.passwordStrengthClass1 = 'weak';
    }
  }
  

  logout(){
    this.auth.signOut();
  }
  cancel(){
    this.router.navigate(['/view-profile'])
  }
  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(ChangeHelpComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
}
