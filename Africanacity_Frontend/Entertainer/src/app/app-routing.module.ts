import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
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

const routes: Routes = [
  {path:'', redirectTo:'welcome', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'reset', component:ResetComponent},
  {path:'navbar',component: NavbarComponent},
  {path:'update-profile', component:UpdateProfileComponent, canActivate:[AuthGuard]},
  {path:'booking', component:BookingComponent, canActivate:[AuthGuard]},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'view-profile',component:ViewProfileComponent, canActivate:[AuthGuard]},
  {path:'change-password',component:ChangePasswordComponent, canActivate:[AuthGuard]},
  {path:'about',component:AboutComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'past-booking', component: PastBookingComponent, canActivate:[AuthGuard]},
  {path:'edit-booking/:id', component:  EditBookingComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
