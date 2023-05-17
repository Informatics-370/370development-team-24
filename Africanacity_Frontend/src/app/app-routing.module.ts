import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './login/otp/otp.component';
import { RegisterComponent } from './login/register/register.component';

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
  { path: 'edit-employee', component: EditEmployeeComponent }, // for edit employee page
  { path: 'add-help', component: AddHelpComponent }, // for add help page
  { path: 'view-help-list', component: ViewHelpListComponent }, // for view help list page 
  { path: 'edit-help', component: EditHelpComponent }, // for edit help page

  {
    path: '',
    component: ViewEmployeesComponent
  },
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
  {path: '', 
  redirectTo: 'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }