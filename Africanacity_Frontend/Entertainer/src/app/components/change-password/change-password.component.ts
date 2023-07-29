import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { confirmPassowrdValidator } from 'src/app/helpers/confirm-password.validator';
import ValidateForm from 'src/app/helpers/validationform';
import { UpdatePassword } from 'src/app/models/Update';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';


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
  
    constructor(
      private formBuilder: FormBuilder,
      private changePasswordService: AuthService
    ) {}
  
    ngOnInit() {
      this.changePasswordForm = this.formBuilder.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]]
      });
    }
  
    get formControls() {
      return this.changePasswordForm.controls;
    }
  
    onSubmit() {
      this.submitted = true;
  
      if (this.changePasswordForm.invalid) {
        return;
      }
  
      const request: UpdatePassword = this.changePasswordForm.value;
      this.changePasswordService.ChangePassword(request).subscribe(
        (response) => {
          this.successMessage = response.Message;
          this.errorMessage = null;
          this.changePasswordForm.reset();
          this.submitted = false;
        },
        (error) => {
          this.errorMessage = error.Message;
          this.successMessage = null;
        }
      );
    }
  }
  
//   public changePasswordForm!: FormGroup;
//   type: string = 'newPassword';
//   isText: boolean = false;
//   eyeIcon: string = 'fa-eye-slash';
//   public resetPasswordEmail! : string;
//   public isValidEmail! : boolean
//   emailToReset!: string;
//   emailToken!: string;
//   resetPasswordObj = new ResetPassword();

//   type1: string = 'confirmPassword';
//   isText1: boolean = false;
//   eyeIcon1: string = 'fa-eye-slash';

//   constructor(
//     private fb : FormBuilder, 
//     private toast: NgToastService,
//     private router: Router,
//     private activate : ActivatedRoute,
//     private resetService: ResetPasswordService) { }

// ngOnInit(): void {
//     this.changePasswordForm = this.fb.group({
//         newPassword: [null, Validators.required],
//         confirmPassword: [null, Validators.required],
//     },
    
//     {
//        validator: confirmPassowrdValidator("newPassword","confirmPassword")
//     });
    

//     this.activate.queryParams.subscribe(val=>{
//         this.emailToReset = val['email'];
//         let uriToken =  val['code'];
//         // this.emailToken = uriToken.replace(/ /g,'+');
//         if (uriToken) {
//           this.emailToken = uriToken.replace(/ /g, '+');
//         }
    
//         // console.log(this.emailToReset);
//         // console.log(this.emailToken);
//     })
// }

// hideShowPass() {
//   this.isText = !this.isText;
//   this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
//   this.isText ? (this.type = 'text') : (this.type = 'oldPassword');
// }

// hideShowPass1() {
//   this.isText = !this.isText;
//   this.isText ? (this.eyeIcon1 = 'fa-eye') : (this.eyeIcon1 = 'fa-eye-slash');
//   this.isText ? (this.type = 'text') : (this.type = 'confirmPassword');
// }

// passwordMatchValidator(formGroup: FormGroup) {
//   const Password = formGroup.get('oldPassword')?.value;
//   const ConfirmPassword = formGroup.get('newPassword')?.value;

//   if (Password !== ConfirmPassword) {
//     return { 'mismatch': true };
//   }
//   return null;
// }


//     onSubmit(){
//       if (this.changePasswordForm.valid) {
//         this.resetService.resetPassword(this.resetPasswordObj)
//          .subscribe({
//             next:(res)=>{
//               this.toast.success({
//                 detail: 'Success',
//                 summary: 'Unique Password reset Successful!',
//                 duration: 3000,
//               });
//         },
//         error:(err)=>{
//             this.toast.error({
//                 detail: 'ERROR',
//                 summary: 'Old Password and New password should not match!',
//                 duration: 3000,
//               });
//         }
//       })

//         if(this.changePasswordForm.valid){
//          this.resetPasswordObj.email=this.emailToReset;
//          this.resetPasswordObj.newPassword=this.changePasswordForm.value.newPassword;
//          this.resetPasswordObj.confirmPassword=this.changePasswordForm.value.confirmPassword;
//          this.resetPasswordObj.emailToken=this.emailToReset;

//          this.resetService.resetPassword(this.resetPasswordObj)
//          .subscribe({
//             next:(res)=>{
//               this.toast.success({
//                 detail: 'Success',
//                 summary: 'Password reset Successful!',
//                 duration: 3000,
//               });
//               this.router.navigate([['/view-profile']])
//         },
//         error:(err)=>{
//             this.toast.error({
//                 detail: 'ERROR',
//                 summary: 'Password reset unsuccessful!',
//                 duration: 3000,
//               });
//         }
//     })
// }
//         else{
//             ValidateForm.validateAllFormFields(this.changePasswordForm); 
//         }
//   }
// }
  // changePasswordForm!: FormGroup;
  // message: string = '';
  // type1: string = 'confirmPassword';
  // isText1: boolean = false;
  // eyeIcon1: string = 'fa-eye-slash';
  // type: string = 'newPassword';
  // isText: boolean = false;
  // eyeIcon: string = 'fa-eye-slash';

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private apiService: ApiService,
  //   private toast: NgToastService,
  //   private router: Router
  // ) { }

  // ngOnInit() {
  //   this.changePasswordForm = this.formBuilder.group({
  //     oldPassword: ['', Validators.required],
  //     newPassword: ['', Validators.required],
  //     confirmPassword: ['', Validators.required]
  //   }, {
  //     validators: this.passwordMatchValidator
  //   });
  // }

  // hideShowPass() {
  //   this.isText = !this.isText;
  //   this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
  //   this.isText ? (this.type = 'text') : (this.type = 'newPassword');
  // }
  
  // hideShowPass1() {
  //   this.isText1 = !this.isText1;
  //   this.isText1 ? (this.eyeIcon1 = 'fa-eye') : (this.eyeIcon1 = 'fa-eye-slash');
  //   this.isText1 ? (this.type1 = 'text') : (this.type1 = 'confirmPassword');
  // }
  
  // onSubmit() {
  //   const oldPasswordControl = this.changePasswordForm.get('oldPassword');
  //   const newPasswordControl = this.changePasswordForm.get('newPassword');
  
  //   if (oldPasswordControl && newPasswordControl && oldPasswordControl.value && newPasswordControl.value) {
  //     const oldPassword = oldPasswordControl.value;
  //     const newPassword = newPasswordControl.value;
  //     const confirmPassword = this.changePasswordForm.value;
  
  //     if (newPassword !== confirmPassword) {
  //       this.message = 'New password and confirm password do not match.';
  //       return;
  //     }
  
  //     if (oldPassword === newPassword) {
  //       this.message = 'Old password and new password cannot be the same.';
  //       return;
  //     }
  
  //     // this.apiService.changePassword(oldPassword, newPassword)
  //     //   .subscribe(
  //     //     (response) => {
            
  //     //       // Password changed successfully. Show a success message or navigate to another page.
  //     //       this.toast.success({
  //     //           detail: 'Success',
  //     //           summary: 'Password reset Successful!',
  //     //           duration: 3000,
  //     //           });
  //     //          this.router.navigate([['/view-profile']])
  //     //     },
  //     //     (error) => {
  //     //       // Handle API error
  //     //       console.error(error);
  //     //       // Show an error message to the user.
  //     //       this.toast.error({
  //     //         detail: 'ERROR',
  //     //         summary: 'Password reset unsuccessful!',
  //     //         duration: 3000,
  //     //                       });
  //     //     }
  //     //   );
  //     // this.apiService.changePassword(oldPassword, newPassword)
  //     // .subscribe(
  //     //   (response) => {
  //     //     // Handle the response from the API
  //     //     this.message = response.message;
  //     //     // Reset the form
  //     //     this.changePasswordForm.reset();
  //     //   },
  //     //   (error) => {
  //     //     // Handle API error
  //     //     this.message = 'An error occurred while changing the password.';
  //     //     console.error(error);
  //     //   }
  //     // );
  //   }
  // }
  

  // // Custom validator function to check if new password and confirm password match
  // passwordMatchValidator(formGroup: FormGroup) {
  //   const newPasswordControl = formGroup.get('newPassword');
  //   const confirmPasswordControl = formGroup.get('confirmPassword');

  //   if (newPasswordControl && confirmPasswordControl &&
  //     newPasswordControl.value !== confirmPasswordControl.value) {
  //     confirmPasswordControl.setErrors({ passwordMismatch: true });
  //   } else {
  //     confirmPasswordControl!.setErrors(null);
  //   }
  // }




