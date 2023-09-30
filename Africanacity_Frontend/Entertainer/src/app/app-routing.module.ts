import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ResetComponent } from './components/reset/reset.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { BookingComponent } from './components/booking/booking.component';
import { HomeComponent } from './components/home/home.component';
import { PastBookingComponent } from './components/past-booking/past-booking.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { WelcomeComponent } from './General Home/about/welcome/welcome.component';
import { AboutComponent } from './General Home/about/about.component';
import { EditBookingComponent } from './components/edit-booking/edit-booking.component';
import { HelpComponent } from './components/help/help.component';
import { BookingHelpComponent } from './components/booking/booking-help/booking-help.component';
import { SignHelpComponent } from './components/signup/sign-help/sign-help.component';
import { ChangeHelpComponent } from './components/change-password/change-help/change-help.component';
import { EditHelpComponent } from './components/edit-booking/edit-help/edit-help.component';
import { HomeHelpComponent } from './components/home/home-help/home-help.component';
import { LoginHelpComponent } from './components/login/login-help/login-help.component';
import { PastHelpComponent } from './components/past-booking/past-help/past-help.component'; 
import { ResetHelpComponent } from './components/reset/reset-help/reset-help.component';
import { UpdateHelpComponent } from './components/update-profile/update-help/update-help.component';
import { ViewHelpComponent } from './components/view-profile/view-help/view-help.component';
import { DigitalComponent } from './General Home/digital/digital.component';
import { NgModule } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {path:'', redirectTo:'welcome', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'reset', component:ResetComponent},
  {path:'navbar',component: NavbarComponent},
  {path:'update-profile', component:UpdateProfileComponent, canActivate:[AuthGuard]},
  {path:'booking/:id', component:BookingComponent, canActivate:[AuthGuard]},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'view-profile',component:ViewProfileComponent, canActivate:[AuthGuard]},
  {path:'change-password',component:ChangePasswordComponent, canActivate:[AuthGuard]},
  {path:'about',component:AboutComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'digital',component:DigitalComponent},
  {path:'past-booking', component: PastBookingComponent, canActivate:[AuthGuard]},
  {path:'edit-booking/:id', component:  EditBookingComponent, canActivate:[AuthGuard]},
  {path:'help', component:  HelpComponent, canActivate:[AuthGuard]},
  {path:'booking-help', component: BookingHelpComponent, canActivate:[AuthGuard]},
  {path:'sign-help', component: SignHelpComponent, canActivate:[AuthGuard]},
  {path:'edit-help', component:  EditHelpComponent, canActivate:[AuthGuard]},
  {path:'change-help', component:  ChangeHelpComponent, canActivate:[AuthGuard]},
  {path:'home-help', component:  HomeHelpComponent, canActivate:[AuthGuard]},
  {path:'login-help', component:  LoginHelpComponent, canActivate:[AuthGuard]},
  {path:'past-help', component:  PastHelpComponent, canActivate:[AuthGuard]},
  {path:'reset-help', component:  ResetHelpComponent, canActivate:[AuthGuard]},
  {path:'update-help', component:  UpdateHelpComponent, canActivate:[AuthGuard]},
  {path:'view-help', component:  ViewHelpComponent, canActivate:[AuthGuard]},
  { path: 'menu', component: MenuComponent }, // Add this route


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
