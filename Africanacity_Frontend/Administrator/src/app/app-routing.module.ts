import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './guards/auth.guard';
// routing for pages
import { HomeComponent } from './administration/home/home.component'; // for home page
import { MenuComponent } from './administration/menu/menu.component'; // for menu page
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';
import { ViewProfileComponent } from './login/view-profile/view-profile.component';
import { ResetComponent } from './login/reset/reset.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { UpdateProfileComponent } from './login/update-profile/update-profile.component';
import { EntertainerComponent } from './administration/entertainer/entertainer.component';
import { ManageBookingComponent } from './administration/entertainer/manage-booking/manage-booking.component';
import { BookingListingComponent } from './administration/entertainer/booking-listing/booking-listing.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'reset', component:ResetComponent},
  {path:'view-profile',component:ViewProfileComponent, canActivate:[AuthGuard]},
  {path:'change-password',component:ChangePasswordComponent, canActivate:[AuthGuard]},
  {path:'update-profile', component:UpdateProfileComponent, canActivate:[AuthGuard]},
  {path: 'navbar',component: NavbarComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]}, 
  {path: 'menu', component: MenuComponent, canActivate:[AuthGuard]}, 
  {path: 'entertainer', component: EntertainerComponent, canActivate:[AuthGuard]}, 
  {path: 'booking-listing', component: BookingListingComponent, canActivate:[AuthGuard]}, 
  {path: 'manage-booking', component:  ManageBookingComponent, canActivate:[AuthGuard]}, 
  {path: '', redirectTo: 'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }