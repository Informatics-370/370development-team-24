import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../service/main.service';
import { AlertController } from '@ionic/angular';
import { SignUp } from '../shared/sign-up';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent   {
  showTabs=false;
  signUpForm!: FormGroup;
  showSuccessMessage = false;
  showErrorMessage = false;
  signUpData: SignUp = new SignUp();
  eyeIcon: string = "fa-eye-slash";
  type: string = 'password';
  isText: boolean = false;



  constructor(private formBuilder: FormBuilder, 
    private mainService: MainService,
    private alertController: AlertController) { 
      this.signUpForm = this.formBuilder.group({
        username: ['', Validators.required],
        email_address: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }

    hideShowPass(){
      this.isText = !this.isText;
      this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
      this.isText ? this.type = 'text' : this.type = 'password'
    }


    signUpUser():void{
      console.log('Request Data', this.signUpData)
      this.mainService.signUp(this.signUpData).subscribe(
        response => {
          // Handle success
          this.presentSuccessAlert('Sign-Up successful!');
          console.log('Sign-up successful:', response);
          // You can show a success message or navigate to a different page
        },
        (error) => {
          // Handle error
          this.presentErrorAlert('Email does not exist');
          console.error('Sign-up error:', error);
          // You can display an error message to the user
        }
      );
    }
  

  /*signUp() {
    if (this.signUpForm.valid) {
      // Get form values
      const username = this.signUpForm.value.username;
      const email_address = this.signUpForm.value.email;
      const password = this.signUpForm.value.password;

      // Call your API to sign up the user
      this.mainService.signUp(username, email_address, password).subscribe(
        response => {
          // Handle success (e.g., show a success message)
          this.presentSuccessAlert('Sign-Up successful!');
          console.log('Sign-up successful', response);
        },
        (error) => {
          // Handle error
          this.presentErrorAlert('Email does not exist');
          console.error('Sign-up error', error);
        }
      );
    }
  }*/

  resetMessage(){
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
  }

  //if sign up was successful
  async presentSuccessAlert(message: string) {

    this.showSuccessMessage = true;
    const alert = await this.alertController.create({
      header: 'Success',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //if the email does not exist
  async presentErrorAlert(message: string) {

    this.showErrorMessage = true;
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
      
    });

    await alert.present();
  }

}
