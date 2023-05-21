import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './login/otp/otp.component';
import { RegisterComponent } from './login/register/register.component';
import { MenuTypesComponent } from './administration/menu-types/menu-types.component';//for menu types page
import { MenuitemsComponent } from './administration/menuitems/menuitems.component';


// routing for pages

import { HomeComponent } from './administration/home/home.component'; // for home page
import { MenuComponent } from './administration/menu/menu.component'; // for menu page
import { AddMenuTypeComponent } from './administration/menu-types/add-menu-type/add-menu-type.component';
import { EditMenuTypeComponent } from './administration/menu-types/edit-menu-type/edit-menu-type.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // for home page
  { path: 'menu', component: MenuComponent }, // for menu page
  { path: 'menu-types', component: MenuTypesComponent }, // for menu page
  { path: 'add-menu-type', component: AddMenuTypeComponent}, //add menu type page
  { path: 'edit-menu-type/:id', component: EditMenuTypeComponent}, // edit menu type page
  { path: 'menuitems', component: MenuitemsComponent},//For the menu item page
  {
    path: '',
    component: NavbarComponent
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
  redirectTo: 'login', pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }