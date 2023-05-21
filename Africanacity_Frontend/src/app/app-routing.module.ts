import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './login/otp/otp.component';
import { RegisterComponent } from './login/register/register.component';
import { EditEmployeeRoleComponent } from './administration/EmployeeRole/edit-employee-role/edit-employee-role.component';
import { AddEmployeeRoleComponent } from './administration/EmployeeRole/add-employee-role/add-employee-role.component';
import { EmployeeRoleComponent } from './administration/EmployeeRole/employee-role/employee-role.component';


// routing for pages

import { HomeComponent } from './administration/home/home.component'; // for home page
import { MenuComponent } from './administration/menu/menu.component'; // for menu page

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // for home page
  { path: 'menu', component: MenuComponent }, // for menu page
  { path: 'add-employee-role', component: AddEmployeeRoleComponent },// for add employee role
  { path: 'edit-employee-role/:id', component: EditEmployeeRoleComponent },//for edit employee role
  { path: 'employee-role', component: EmployeeRoleComponent },// for view employee role
  {
    path: 'employee-role',
    component: EmployeeRoleComponent
  },

  // open on this page
  { path: '', component: EmployeeRoleComponent },
  {
    path: 'navbar',
    component: NavbarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'otp',
   component:OtpComponent
  },
   {
    path: 'register', 
   component:RegisterComponent
  },
  /*{path: '', 
  redirectTo: 'login', pathMatch:'full'}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }