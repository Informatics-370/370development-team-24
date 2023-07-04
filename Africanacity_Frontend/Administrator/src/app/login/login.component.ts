import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.Service';
import { User } from '../shared/user';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  password: string = '';
  visablePassword: boolean = false;
  hide = false;
  loginFormGroup: FormGroup = this.fb.group({
    UserName: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required],
  })

  PasswordVisibility(){
    this.visablePassword = !this.visablePassword;
  }

  isLoading:boolean = false

  constructor(private router: Router, 
    private dataService: DataService, 
    private fb: FormBuilder,  
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  LoginUser(){
    if(this.loginFormGroup.valid)
    {
      this.isLoading = true

      this.dataService.LoginUser(this.loginFormGroup.value).subscribe(result => {
        localStorage.setItem('User', JSON.stringify(result))
        this.loginFormGroup.reset();
        this.router.navigate(['home']).then((navigated: boolean) => {
          if(navigated) {
            this.snackBar.open(`Login successful.`, 'X', {duration: 10000});
          }
       });
      }, (response: HttpErrorResponse) => {
        this.isLoading = false
        if (response.status === 404) {
          this.snackBar.open(response.error, 'X', {duration: 5000});
        }
        if (response.status === 500){
          this.snackBar.open(response.error, 'X', {duration: 5000});
        }
      })
    }
  }
}
