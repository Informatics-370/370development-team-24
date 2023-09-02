import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  hide = true;
  loginFormGroup: FormGroup = this.fb.group({
    NewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    ConfirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
  })

  isLoading:boolean = false

  constructor(private router: Router, 
    private dataService: DataService, 
    private fb: FormBuilder,  
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  Reset(){

  }
}


