import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { confirmPassowrdValidator } from 'src/app/helpers/confirm-password.validator';
import ValidateForm from 'src/app/helpers/validationform';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { ResetHelpComponent } from './reset-help/reset-help.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPassword = new ResetPassword();
  type1: string = 'confirmPassword';
  isText1: boolean = false;
  eyeIcon1: string = 'fa-eye-slash';
  type: string = 'newPassword';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private fb : FormBuilder, 
    private toast: NgToastService,
    private router: Router,
    private activate : ActivatedRoute,
    private resetService: ResetPasswordService,
    private dialog: MatDialog ) { }

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



    reset(){
        if(this.resetPasswordForm.valid){
         this.resetPassword.email=this.emailToReset;
         this.resetPassword.newPassword=this.resetPasswordForm.value.newPassword;
         this.resetPassword.confirmPassword=this.resetPasswordForm.value.confirmPassword;
         this.resetPassword.emailToken=this.emailToken;

         this.resetService.resetPassword(this.resetPassword)
         .subscribe({
            next:(res)=>{
              this.toast.success({
                detail: 'Success',
                summary: 'Password reset Successful!',
                duration: 3000,
              });
              // this.router.navigate(['login'])
              // this.router.navigate(['/login'])
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

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(ResetHelpComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
}
