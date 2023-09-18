import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validationform';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Entertainment } from 'src/app/models/Entertainment';
import { BookingService } from 'src/app/services/Booking.service';
import { SignHelpComponent } from './sign-help/sign-help.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  passwordHasLowerCase: boolean = false;
  passwordHasUpperCase: boolean = false;
  passwordHasDigit: boolean = false;
  isHovering: boolean = false;
  public isValidEmail!: boolean;
  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash";
  entertainmentTypeData:Entertainment[]=[]

      firstName!:string;
      lastName!:string;
      username!:string;
      email!:string;
      physicalAddress!:string;
      contactNumber!:string;

  constructor(
    private fb : FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private apiService: BookingService,
    private dialog: MatDialog 
    ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName:['', [Validators.required, this.noSpacesValidator]],
      lastName:['', [Validators.required, this.noSpacesValidator]],
      username:['', [Validators.required, this.noSpacesValidator]],
      email:['', [Validators.required, this.noSpacesValidator]],
      physicalAddress:['', [Validators.required, this.noSpacesValidator]],
      contactNumber: ['', [ Validators.required, Validators.pattern(/^\d{10}$/), this.validateSouthAfricanNumber]],
      password: ['', [Validators.required, Validators.minLength(8), this.noSpacesValidator]],
      entertainmentType: [null, Validators.required]
    });
    this.signUpForm.controls['password'].valueChanges.subscribe((value) => {
      this.passwordHasLowerCase = /[a-z]/.test(value);
      this.passwordHasUpperCase = /[A-Z]/.test(value);
      this.passwordHasDigit = /\d/.test(value);
  });

  const emailControl = this.signUpForm.get('email');

  if (emailControl) {
    emailControl.valueChanges.subscribe((value) => {
      const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
      this.isValidEmail = pattern.test(value);
    });
 }
    this.GetAllEntertainment();
    console.log(this.GetAllEntertainment)
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'password'
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      // Save the user information to localStorage
      const userData = this.signUpForm.value;
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Entertainer registered successfully:', userData);
    }
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      let signUpObj = {
        ...this.signUpForm.value,
        role:'',
        token:''
      }
      this.auth.signUp(signUpObj)
      .subscribe({
        next:(res=>{
          console.log(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);
          alert(res.message)
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm); 
    }
  }

  GetAllEntertainment(){
    this.apiService.GetAllEntertainment().subscribe(result => {
      let bookingList:any[] = result
     bookingList.forEach((element) => {
        this.entertainmentTypeData.push(element)
     });
    });
  }

   passwordMeetsRequirements(): boolean {
    const passwordControl = this.signUpForm.get('password');
    if (passwordControl) {
      const password = passwordControl.value;
      const hasLowerCase = /[a-z]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasDigit = /\d/.test(password);
  
      return password.length >= 8 && hasLowerCase && hasUpperCase && hasDigit;
    }
    return false;
  }

  toggleHoverState() {
    this.isHovering = !this.isHovering;
  }

     // Custom validator to check for spaces
     noSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null {
      if (control.value && control.value.trim().length === 0) {
        return { 'noSpaces': true };
      }
      return null;
    }

        // Custom validator to validate South African phone numbers
        validateSouthAfricanNumber(control: AbstractControl): { [key: string]: boolean } | null {
          const value = control.value;
          const isAllZeros = /^0+$/.test(value);
      
          if (isAllZeros) {
            return { 'allZeros': true };
          }
          return null;
        }

        openHelpModal(field: string): void {
          const dialogRef = this.dialog.open(SignHelpComponent, {
            width: '500px',
            data: { field } // Pass the field name to the modal
          });
        
          dialogRef.afterClosed().subscribe(result => {
            // Handle modal close if needed
          });
        }
}
