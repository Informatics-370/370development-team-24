import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';

interface Title {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  password: string = '';
  Confirmpassword: string = '';
  passwordsMatch: boolean=false;
  visablePassword: boolean = false;
  hide = false;

  PasswordVisibility(){
    this.visablePassword = !this.visablePassword;
  }
  
  titles: Title[] = [
    {value: '0', viewValue: 'MISS'},
    {value: '1', viewValue: 'MR'},
    {value: '2', viewValue: 'DR'},
    {value: '3', viewValue: 'MRS'},
    {value: '4', viewValue: 'Other'},
  ];  
  registerFormGroup: FormGroup = this.fb.group({
    UserName: ['', [Validators.required, Validators.email]],
    Name: ['', [Validators.required]],
    Surname: ['', [Validators.required]],
    PhysicalAddress: ['', [Validators.required]],
    PhoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
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
    private dataService: DataService, 
    private fb: FormBuilder, 
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  RegisterUser(){

    if (this.registerFormGroup.valid) {
      this.snackBar.open(`Registered successfully`, 'X', {duration: 5000});
      
    } else {
      this.snackBar.open(`New password and confirm password do not match`, 'X', {duration: 5000});
    }
    this.passwordsMatch=this.password === this.Confirmpassword
    if(this.registerFormGroup.valid)
    {
      this.dataService.RegisterUser(this.registerFormGroup.value).subscribe(() => {
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
          this.snackBar.open(response.error, 'X', {duration: 5000});
        }
      })
    }
  }
}

