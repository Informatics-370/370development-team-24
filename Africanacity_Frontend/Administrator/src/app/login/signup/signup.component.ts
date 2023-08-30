import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validationform';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/UserService/auth.service';


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

  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"


      firstName!:string;
      lastName!:string;
      username!:string;
      email!:string;
      physicalAddress!:string;
      contactNumber!:string;

  constructor(
    private fb : FormBuilder, 
    private auth: AuthService, 
    private router: Router
    ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      username:['', Validators.required],
      email:['', Validators.required],
      physicalAddress:['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      // password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]]
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    
    this.signUpForm.controls['password'].valueChanges.subscribe((value) => {
      this.passwordHasLowerCase = /[a-z]/.test(value);
      this.passwordHasUpperCase = /[A-Z]/.test(value);
      this.passwordHasDigit = /\d/.test(value);
  });
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
      console.log('User registered successfully:', userData);
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
}
