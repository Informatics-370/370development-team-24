import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResetComponent } from './components/reset/reset.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { BookingComponent } from './components/booking/booking.component';
import { PastBookingComponent } from './components/past-booking/past-booking.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { WelcomeComponent } from './General Home/about/welcome/welcome.component';
import { AboutComponent } from './General Home/about/about.component';
import { MaterialModule } from './models/material.modules';
import { EditBookingComponent } from './components/edit-booking/edit-booking.component';
import { HelpComponent } from './components/help/help.component';
import { LoginHelpComponent } from './components/login/login-help/login-help.component';
import { SignHelpComponent } from './components/signup/sign-help/sign-help.component';
import { BookingHelpComponent } from './components/booking/booking-help/booking-help.component';
import { ChangeHelpComponent } from './components/change-password/change-help/change-help.component';
import { EditHelpComponent } from './components/edit-booking/edit-help/edit-help.component';
import { HomeHelpComponent } from './components/home/home-help/home-help.component';
import { PastHelpComponent } from './components/past-booking/past-help/past-help.component';
import { ResetHelpComponent } from './components/reset/reset-help/reset-help.component';
import { UpdateHelpComponent } from './components/update-profile/update-help/update-help.component';
import { ViewHelpComponent } from './components/view-profile/view-help/view-help.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DigitalComponent } from './General Home/digital/digital.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    ResetComponent,
    HomeComponent,
    UpdateProfileComponent,
    ViewProfileComponent,
    BookingComponent,
    PastBookingComponent,
    ChangePasswordComponent,
    WelcomeComponent,
    AboutComponent,
    EditBookingComponent,
    HelpComponent,
    LoginHelpComponent,
    SignHelpComponent,
    BookingHelpComponent,
    ChangeHelpComponent,
    EditHelpComponent,
    HomeHelpComponent,
    PastHelpComponent,
    ResetHelpComponent,
    UpdateHelpComponent,
    ViewHelpComponent,
    DigitalComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatDialogModule, 
    MaterialModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ZXingScannerModule ,// Add this line
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
