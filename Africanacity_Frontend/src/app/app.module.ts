import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './administration/home/home.component';
import { MenuComponent } from './administration/menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './login/register/register.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './login/update-password/update-password.component';
import { MaterialModule } from './shared/material.modules';
import { OtpComponent } from './login/otp/otp.component';
import { AddEmployeeRoleComponent } from './add-employee-role/add-employee-role.component';
import { EmployeeRoleComponent } from './EmployeeRole/employee-role/employee-role.component';
import { EditEmployeeRoleComponent } from './EmployeeRole/edit-employee-role/edit-employee-role.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    OtpComponent,
    ForgotPasswordComponent, 
    UpdatePasswordComponent, 
   
    HomeComponent, AddEmployeeRoleComponent, EmployeeRoleComponent, EditEmployeeRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
