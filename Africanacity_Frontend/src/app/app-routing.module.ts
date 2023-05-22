import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './login/otp/otp.component';
import { UpdatePasswordComponent } from './login/update-password/update-password.component';
import { RegisterComponent } from './login/register/register.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { EditEmployeeRoleComponent } from './administration/EmployeeRole/edit-employee-role/edit-employee-role.component';
import { AddEmployeeRoleComponent } from './administration/EmployeeRole/add-employee-role/add-employee-role.component';
import { EmployeeRoleComponent } from './administration/EmployeeRole/employee-role/employee-role.component';
import { MenuTypesComponent } from './administration/menu-types/menu-types.component';//for menu types page
import { MenuitemsComponent } from './administration/menuitems/menuitems.component';


// routing for pages

import { HomeComponent } from './administration/home/home.component'; // for home page
import { MenuComponent } from './administration/menu/menu.component'; // for menu page
import { AddEmployeeComponent } from './administration/Employees/add-employee/add-employee.component'; // for add employee page
import { ViewEmployeesComponent } from './administration/Employees/view-employees/view-employees.component';
import { AddHelpComponent } from './administration/Help Management/add-help/add-help.component';
import { ViewHelpListComponent } from './administration/Help Management/view-help-list/view-help-list.component';
import { EditEmployeeComponent } from './administration/Employees/view-employees/edit-employee/edit-employee.component';
import { EditHelpComponent } from './administration/Help Management/view-help-list/edit-help/edit-help.component';
import { AddMenuTypeComponent } from './administration/menu-types/add-menu-type/add-menu-type.component';
import { EditMenuTypeComponent } from './administration/menu-types/edit-menu-type/edit-menu-type.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // for home page
  { path: 'menu', component: MenuComponent }, // for menu page
  { path: 'add-employee', component: AddEmployeeComponent }, // for add employee page
  { path: 'view-employees', component: ViewEmployeesComponent }, // for view employees page
  { path: 'add-help', component: AddHelpComponent }, // for add help page
  { path: 'view-help-list', component: ViewHelpListComponent }, // for view help list page 
  { path: 'edit-help/:id', component: EditHelpComponent }, // for edit help page

  { path: 'add-employee-role', component: AddEmployeeRoleComponent },// for add employee role
  { path: 'edit-employee-role/:id', component: EditEmployeeRoleComponent },//for edit employee role
  { path: 'employee-role', component: EmployeeRoleComponent },// for view employee role
  { path: 'menu-types', component: MenuTypesComponent }, // for menu page
  { path: 'add-menu-type', component: AddMenuTypeComponent}, //add menu type page
  { path: 'menuitems', component: MenuitemsComponent},//For the menu item page
  {
    path: 'employee-role',
  },

  // open on this page
  { path: '', component: EmployeeRoleComponent },
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
  redirectTo: 'login', pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }