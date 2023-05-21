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
import { AddEmployeeComponent } from './administration/Employees/add-employee/add-employee.component'; // for add employee page
import { ViewEmployeesComponent } from './administration/Employees/view-employees/view-employees.component';
import { AddHelpComponent } from './administration/Help Management/add-help/add-help.component';
import { ViewHelpListComponent } from './administration/Help Management/view-help-list/view-help-list.component';
import { EditEmployeeComponent } from './administration/Employees/view-employees/edit-employee/edit-employee.component';
import { EditHelpComponent } from './administration/Help Management/view-help-list/edit-help/edit-help.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // for home page
  { path: 'menu', component: MenuComponent }, // for menu page
  { path: 'add-employee', component: AddEmployeeComponent }, // for add employee page
  { path: 'view-employees', component: ViewEmployeesComponent }, // for view employees page
  { path: 'edit-employee/:id', component: EditEmployeeComponent }, // for edit employee page
  { path: 'add-help', component: AddHelpComponent }, // for add help page
  { path: 'view-help-list', component: ViewHelpListComponent }, // for view help list page 
  { path: 'edit-help/:id', component: EditHelpComponent }, // for edit help page

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
  redirectTo: 'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }