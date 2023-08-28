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
  username: string = '';
  password: string = '';
  visablePassword: boolean = false;
  hide = false;


  //login form 
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
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

  async login() {
    try {
      const loginData = {
        username: this.username,
        password: this.password,
      };

      // Send a POST request to your server to authenticate the user
      const response = await this.mainService.login(loginData);
      console.log('Login response:', response);

      // Assuming your server returns an access token
      const accessToken = response;

      // Store the access token securely on the client (e.g., in local storage)
      localStorage.setItem('access_token', response);

      // Redirect to the home page or another protected route
      this.router.navigate(['/home']);
    } catch (error) {
      // Handle login errors (e.g., display an error message)
      console.error('Login error:', error);

      // Display an error message as a snackbar
      this.snackBar.open('Login failed. Incorrect username or password.', 'X', {
      duration: 5000, // Duration in milliseconds
      verticalPosition: 'top', // Position of the snackbar
      horizontalPosition: 'center',
      panelClass: ['error-snackbar'], // Add custom CSS class for styling
    });

    }
    
  }

}
