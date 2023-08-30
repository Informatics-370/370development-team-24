import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  ValidateForm  from '../../helpers/validationform';
import { AuthService } from 'src/app/UserService/auth.service';
import { ResetPasswordService } from 'src/app/UserService/reset-password.service';
import { UserStoreService } from 'src/app/UserService/user-store.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;
  public countdown: number = 900; // 15 minutes in seconds
  public isTimerActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private resetPassword: ResetPasswordService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
            console.log(this.loginForm.value);
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          this.router.navigate(['home'])
        },
        error: (err) => {
          this.toast.error({detail:"ERROR", summary:"Something when wrong", duration: 5000});
          console.log(err);
        },
      });
    } else {
      // ... existing form validation code ...
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }

  
   checkValidEmail (event: string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
   }

  Send() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      this.resetPassword.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'Success',
            summary: 'Reset Email sent Successful!',
            duration: 3000,
          });
          this.resetPasswordEmail = '';

          // Start the countdown timer
          this.startTimer();

          const buttonRef = document.getElementById('close');
          buttonRef?.click();

          // Clear the countdown timer after 15 minutes
          setTimeout(() => {
            this.countdown = 0;
            this.isTimerActive = false;
          }, 900000); // 15 minutes in milliseconds
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Something went wrong, Invalid email address',
            duration: 3000,
          });
        },
      });
    }
  }

  startTimer() {
    this.isTimerActive = true;
    const timerInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(timerInterval);
        this.isTimerActive = false;
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}
