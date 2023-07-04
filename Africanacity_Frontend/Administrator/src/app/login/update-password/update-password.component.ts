import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})

export class UpdatePasswordComponent {
  updatePasswordFormGroup: FormGroup = this.fb.group({
    CurrentPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    NewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    ConfirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
  })

  constructor(private router: Router, private dataService: DataService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ChangePassword(){

    if(this.updatePasswordFormGroup.valid)
    {
      this.dataService.RegisterUser(this.updatePasswordFormGroup.value).subscribe(() => {
        this.updatePasswordFormGroup.reset();
        this.router.navigate(['login']).then((navigated: boolean) => {
          if(navigated) {
            this.snackBar.open(`Password successfully updated`, 'X', {duration: 5000});
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
