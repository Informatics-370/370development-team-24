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
import { MenuTypesComponent } from './administration/menu-types/menu-types.component';
import { AddMenuTypeComponent } from './administration/menu-types/add-menu-type/add-menu-type.component';
import { EditMenuTypeComponent } from './administration/menu-types/edit-menu-type/edit-menu-type.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './administration/menu-types/add-menu-type/confirmation-dialog/confirmation-dialog.component';
import { MenuitemsComponent } from './administration/menuitems/menuitems.component';
import { DataService } from './service/data.Service';




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
   
   
    HomeComponent, MenuTypesComponent, AddMenuTypeComponent, EditMenuTypeComponent, ConfirmationDialogComponent, MenuitemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatSnackBarModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
