import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validationform';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changeForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  public resetPasswordEmail! : string;
  public isValidEmail! : boolean



  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private resetPassword: ResetPasswordService
  ) {}

  ngOnInit() {

    this.changeForm = this.fb.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
  }
  
  checkValidEmail (event: string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
   }
 
   Send(){
     if(this.checkValidEmail(this.resetPasswordEmail)){ 
 
       this.resetPassword.sendResetPasswordLink(this.resetPasswordEmail)
       .subscribe({
         next:(res)=>{
           this.toast.success({
             detail: 'Success',
             summary: 'Reset Successful!',
             duration: 3000,
           });
           this.resetPasswordEmail = "";
           const buttonRef = document.getElementById("close");
           buttonRef?.click();
         },
         error:(err)=>{
           this.toast.error({
             detail: 'ERROR',
             summary: 'Something went wrong',
             duration: 3000,
           });
         }
       })
     }
   }
}
