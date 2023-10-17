import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

//   user: User = {
//     username: '',
//     otp: ''
//   }

//   constructor(
//     private router: Router, 
//     private toast: NgToastService,
//     private dataService: AuthService, 
//     private fb: FormBuilder, 
//     private snackBar: MatSnackBar) { }

//   otpFormGroup: FormGroup = this.fb.group({
//     otp: ['', Validators.required],
//   })

//   ngOnInit(): void {
//   }

//   // SubmitOtp() {
//   //   console.log('SubmitOtp() called');
//   //   if (localStorage.getItem('User')) {
//   //     this.user = JSON.parse(localStorage.getItem('User')!)
//   //     this.user.otp = this.otpFormGroup.value['Otp']
//   //     console.log('OTP:', this.user.otp);

//   //     this.dataService.ValidateOtp(this.user).subscribe(() => {
//   //       this.otpFormGroup.reset();
//   //       this.toast.success({detail:"Login successful" , duration: 5000});
//   //       this.router.navigate(['home'])
//   //     }, (response: HttpErrorResponse) => {
//   //       if (response.status === 400) {
//   //         this.snackBar.open(response.error, 'X', { duration: 5000 });
//   //       }
//   //     })
//   //   }
//   // }

//   SubmitOtp() {
//     this.user.otp = this.otpFormGroup.value['otp']; // Get OTP input from the user
  
//     this.dataService.ValidateOtp(this.user).subscribe(
//       () => {
//         console.log('OTP validation successful');
//         this.otpFormGroup.reset();
//         this.toast.success({ detail: "Login successful", duration: 5000 });
//         this.router.navigate(['../home']);
//       },
//       (response: HttpErrorResponse) => {
//         console.log('OTP validation failed', response);
//         if (response.status === 400) {
//           this.snackBar.open(response.error, 'X', { duration: 5000 });
//         }
//       }
//     );
//   }

  
  
//   // SubmitOtp() {
//   //   console.log('SubmitOtp() called');

//   //     this.user.otp = this.otpFormGroup.value['otp'];
//   //     console.log('OTP:', this.user.otp);
  
//   //     this.dataService.ValidateOtp(this.user).subscribe(
//   //       () => {
//   //         console.log('OTP validation successful'); // Add this line for debugging
//   //         this.otpFormGroup.reset();
//   //         this.toast.success({ detail: "Login successful", duration: 5000 });
//   //         this.router.navigate(['../home']);
//   //       },
//   //       (response: HttpErrorResponse) => {
//   //         console.log('OTP validation failed', response); // Add this line for debugging
//   //         if (response.status === 400) {
//   //           this.snackBar.open(response.error, 'X', { duration: 5000 });
//   //         }
//   //       }
//   //     );
    
//   // }
  
// }

otpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService, // Your API service
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required]],
    });
  }
 

  ngOnInit(): void {}

  onSubmit() {
    if (this.otpForm.invalid) {
      return;
    }
   const phoneNumber = '+27665903505';
    const enteredOTP = this.otpForm.value.otp;

    // Send OTP verification request to the backend
    this.apiService.verifyOTP(enteredOTP).subscribe(
      (response) => {
        // OTP is correct, navigate to the login page
        this.router.navigate(['/login']); // Adjust the route as needed
      },
      (error) => {
        console.error('OTP verification failed:', error);
        // Handle incorrect OTP or other errors
      }
    );
  }
  }