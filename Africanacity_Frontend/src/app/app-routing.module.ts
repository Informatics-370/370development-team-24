import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './login/otp/otp.component';
import { UpdatePasswordComponent } from './login/update-password/update-password.component';
import { RegisterComponent } from './login/register/register.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
// routing for pages

import { HomeComponent } from './administration/home/home.component'; // for home page
import { MenuComponent } from './administration/menu/menu.component'; // for menu page

const routes: Routes = [
  {
    path: 'navbar',
    component: NavbarComponent
  },
  // Login paths
  {
    path: 'login',
    component: LoginComponent
  },
  { // otp path
    path: 'otp',  
   component: OtpComponent
  }, 
  { // register path
    path: 'register', 
    component: RegisterComponent
  }, 
  { // updatepassword path
    path: 'update-password',
    component: UpdatePasswordComponent
  }, 
  { // forgotpassword path
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }, 
  {  //resetpassword path
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  { // for home page
    path: 'home', 
    component: HomeComponent 
  }, 
  { // for menu page
    path: 'menu', 
    component: MenuComponent 
  }, 
  {path: '', 
  redirectTo: 'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }