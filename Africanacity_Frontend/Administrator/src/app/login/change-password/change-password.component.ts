import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { NgToastService } from 'ng-angular-popup';
import { ResetPasswordService } from 'src/app/UserService/reset-password.service';
import { confirmPassowrdValidator } from 'src/app/helpers/confirm-password.validator';
import ValidateForm from 'src/app/helpers/validationform';
import { ResetPassword } from 'src/app/shared/reset-password.model';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePasswordForm!: FormGroup;
  type: string = 'newPassword';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  public resetPasswordEmail! : string;
  public isValidEmail! : boolean
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();

  type1: string = 'confirmPassword';
  isText1: boolean = false;
  eyeIcon1: string = 'fa-eye-slash';

  constructor(
    private fb : FormBuilder, 
    //private toast: NgToastService,
    private router: Router,
    private activate : ActivatedRoute,
    private resetService: ResetPasswordService) { }

ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
        newPassword: [null, Validators.required],
        confirmPassword: [null, Validators.required],
    },
    
    {
       validator: confirmPassowrdValidator("newPassword","confirmPassword")
    });
    

    this.activate.queryParams.subscribe(val=>{
        this.emailToReset = val['email'];
        let uriToken =  val['code'];
        // this.emailToken = uriToken.replace(/ /g,'+');
        if (uriToken) {
          this.emailToken = uriToken.replace(/ /g, '+');
        }
    
        // console.log(this.emailToReset);
        // console.log(this.emailToken);
    })
}

hideShowPass() {
  this.isText = !this.isText;
  this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
  this.isText ? (this.type = 'text') : (this.type = 'oldPassword');
}

hideShowPass1() {
  this.isText = !this.isText;
  this.isText ? (this.eyeIcon1 = 'fa-eye') : (this.eyeIcon1 = 'fa-eye-slash');
  this.isText ? (this.type = 'text') : (this.type = 'confirmPassword');
}

passwordMatchValidator(formGroup: FormGroup) {
  const Password = formGroup.get('oldPassword')?.value;
  const ConfirmPassword = formGroup.get('newPassword')?.value;

  if (Password !== ConfirmPassword) {
    return { 'mismatch': true };
  }
  return null;
}


    onSubmit(){
      if (this.changePasswordForm.valid) {
        this.resetService.resetPassword(this.resetPasswordObj)
         .subscribe({
            next:(res)=>{
              // this.toast.success({
              //   detail: 'Success',
              //   summary: 'Unique Password reset Successful!',
              //   duration: 3000,
              // });
        },
        error:(err)=>{
            // this.toast.error({
            //     detail: 'ERROR',
            //     summary: 'Old Password and New password should not match!',
            //     duration: 3000,
            //   });
        }
      })

        if(this.changePasswordForm.valid){
         this.resetPasswordObj.email=this.emailToReset;
         this.resetPasswordObj.newPassword=this.changePasswordForm.value.newPassword;
         this.resetPasswordObj.confirmPassword=this.changePasswordForm.value.confirmPassword;
         this.resetPasswordObj.emailToken=this.emailToReset;

         this.resetService.resetPassword(this.resetPasswordObj)
         .subscribe({
            next:(res)=>{
              // this.toast.success({
              //   detail: 'Success',
              //   summary: 'Password reset Successful!',
              //   duration: 3000,
              // });
              this.router.navigate([['/view-profile']])
        },
        error:(err)=>{
            // this.toast.error({
            //     detail: 'ERROR',
            //     summary: 'Password reset unsuccessful!',
            //     duration: 3000,
            //   });
        }
    })
}
        else{
            ValidateForm.validateAllFormFields(this.changePasswordForm); 
        }
  }
}
}
