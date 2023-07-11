import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  Password: string = '';
  ConfirmPassword: string = '';
  passwordsMatch: boolean=false;
  visiblePassword: boolean = false;
  hide = false;

  PasswordVisibility(){
    this.visiblePassword = !this.visiblePassword;
  }

  registerFormGroup: FormGroup = this.fb.group({
    UserName: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    ConfirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
  }, { validators: this.passwordMatchValidator })

  passwordMatchValidator(formGroup: FormGroup) {
    const Password = formGroup.get('Password')?.value;
    const ConfirmPassword = formGroup.get('ConfirmPassword')?.value;

    if (Password !== ConfirmPassword) {
      return { 'mismatch': true };
    }
    return null;
  }

  constructor(private router: Router,
    private mainService: MainService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {}

  RegisterUser(){

    if (this.registerFormGroup.valid) {
      this.snackBar.open(`Registered successfully`, 'X', {duration: 5000});
      
    } else {
      this.snackBar.open(`New password and confirm password do not match`, 'X', {duration: 5000});
    }
    this.passwordsMatch=this.Password === this.ConfirmPassword
    if(this.registerFormGroup.valid)
    {
      this.mainService.RegisterUser(this.registerFormGroup.value).subscribe(() => {
        this.registerFormGroup.reset();
        this.router.navigate(['/login']).then((navigated: boolean) => {
          if(navigated) {
            this.snackBar.open(`Registered successfully`, 'X', {duration: 5000});
          }
       });
      }, (response: HttpErrorResponse) => {
        if (response.status === 403) {
          this.snackBar.open(response.error, 'X', {duration: 5000});
        }
        if (response.status === 500){
          this.snackBar.open('Invaild email address', 'X', {duration: 5000});
        }
      })
    }
  }
  

}
