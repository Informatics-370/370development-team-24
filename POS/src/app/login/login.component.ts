import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../service/main.service';
import { User } from '../shared/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  implements OnInit {
  showTabs = false;

  //variables needed
  password: string = '';
  visablePassword: boolean = false;
  hide = false;


  //login form 
  loginForm: FormGroup = this.fb.group({
    UserName: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required],
  })


  //password visibility
  PasswordVisibility(){
    this.visablePassword = !this.visablePassword;
  }

  isLoading:boolean = false

  constructor(private router: Router,
    private mainService: MainService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {}

  LoginUser(){
    if(this.loginForm.valid)
    {
      this.isLoading = true

      this.mainService.LoginUser(this.loginForm.value).subscribe(result => {
        localStorage.setItem('User', JSON.stringify(result))
        console.log('User added');
        this.loginForm.reset();
        this.router.navigate(['./home']).then((navigated: boolean) => {
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

    console.log(this.loginForm.valid)
  }

}
