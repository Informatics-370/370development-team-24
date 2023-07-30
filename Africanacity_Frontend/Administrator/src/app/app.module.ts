import { HomeComponent } from './administration/home/home.component';
import { MenuComponent } from './administration/menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material.modules';
import { EntertainerComponent } from './administration/entertainer/entertainer.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { LoginComponent } from './login/login/login.component';
import { ResetComponent } from './login/reset/reset.component';
import { SignupComponent } from './login/signup/signup.component';
import { UpdateProfileComponent } from './login/update-profile/update-profile.component';
import { ViewProfileComponent } from './login/view-profile/view-profile.component';
import { NgToastModule } from 'ng-angular-popup';
import { ManageBookingComponent } from './administration/entertainer/manage-booking/manage-booking.component';
import { BookingListingComponent } from './administration/entertainer/booking-listing/booking-listing.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NavbarComponent,
    ResetComponent,
    UpdateProfileComponent,
    ViewProfileComponent,
    LoginComponent,
    SignupComponent,
    ChangePasswordComponent,
    EntertainerComponent,
    ManageBookingComponent,
    BookingListingComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
