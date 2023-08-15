import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ResetPasswordService } from 'src/app/UserService/reset-password.service';
import { confirmPassowrdValidator } from 'src/app/helpers/confirm-password.validator';
import ValidateForm from 'src/app/helpers/validationform';
import { ResetPassword } from 'src/app/shared/reset-password.model';



@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();

  type: string = 'newPassword';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private fb : FormBuilder, 
    private toast: NgToastService,
    private router: Router,
    private activate : ActivatedRoute,
    private resetService: ResetPasswordService) { }

ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
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
  this.isText ? (this.type = 'text') : (this.type = 'newPassword');
}


reset(){

        if(this.resetPasswordForm.valid)
        {
         this.resetPasswordObj.email=this.emailToReset;
         this.resetPasswordObj.newPassword=this.resetPasswordForm.value.newPassword;
         this.resetPasswordObj.confirmPassword=this.resetPasswordForm.value.confirmPassword;
         this.resetPasswordObj.emailToken=this.emailToReset;

         this.resetService.resetPassword(this.resetPasswordObj)
         .subscribe({
            next:(res)=>{
              this.toast.success({
                detail: 'Success',
                summary: 'Password reset Successful!',
                duration: 3000,
              });
              this.router.navigate([['/login']])
        },
        error:(err)=>{
            this.toast.error({
                detail: 'ERROR',
                summary: 'Password reset unsuccessful!',
                duration: 3000,
              });
        }
    })
}
        else{
            ValidateForm.validateAllFormFields(this.resetPasswordForm); 
        }
  }
}
