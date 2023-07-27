import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './administration/home/home.component';
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
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { AddEmployeeRoleComponent } from './administration/EmployeeRole/add-employee-role/add-employee-role.component';
import { EmployeeRoleComponent } from './administration/EmployeeRole/employee-role/employee-role.component';
import { EditEmployeeRoleComponent } from './administration/EmployeeRole/edit-employee-role/edit-employee-role.component';
import { MenuTypesComponent } from './administration/menu-types/menu-types.component';
import { AddMenuTypeComponent } from './administration/menu-types/add-menu-type/add-menu-type.component';
import { EditMenuTypeComponent } from './administration/menu-types/edit-menu-type/edit-menu-type.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './administration/menu-types/add-menu-type/confirmation-dialog/confirmation-dialog.component';
import { MenuitemsComponent } from './administration/menuitems/menuitems.component';
import { DataService } from './service/data.Service';
import { AddHelpComponent } from './administration/Help Management/add-help/add-help.component';
import { ViewHelpListComponent } from './administration/Help Management/view-help-list/view-help-list.component';
import { AddEmployeeComponent } from './administration/Employees/add-employee/add-employee.component';
import { ViewEmployeesComponent } from './administration/Employees/view-employees/view-employees.component';
import { EditEmployeeComponent } from './administration/Employees/view-employees/edit-employee/edit-employee.component';
import { EditHelpComponent } from './administration/Help Management/view-help-list/edit-help/edit-help.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSelectModule } from '@angular/material/select';
import { NotificationDialogComponent } from './administration/Employees/notification-dialog/notification-dialog.component';
import { FoodTypeComponent } from './administration/Food Type/view-food-type/food-type.component';
import { MenuItemCategoryComponent } from './administration/Menu Item Category/view-menu-item-category/menu-item-category.component';
import { EditFoodTypeComponent } from './administration/Food Type/edit-food-type/edit-food-type.component';
import { CreateFoodTypeComponent } from './administration/Food Type/create-food-type/create-food-type.component';
import { EditMenuItemCategoryComponent } from './administration/Menu Item Category/edit-menu-item-category/edit-menu-item-category/edit-menu-item-category.component';
import { CreateMenuItemCategoryComponent } from './administration/Menu Item Category/create-menu-item-category/create-menu-item-category/create-menu-item-category.component';
import { AddScheduleComponent } from './booking/schedule/add-schedule/add-schedule.component';
import { EditScheduleComponent } from './booking/schedule/edit-schedule/edit-schedule.component';
import { ScheduleDisplayComponent } from './booking/schedule/schedule-display/schedule-display.component';
import { AddEventComponent } from './booking/events/add-event/add-event.component';
import { EditEventComponent } from './booking/events/edit-event/edit-event.component';
import { ViewEventsComponent } from './booking/events/view-events/view-events.component';
import { AddEntertainmentTypeComponent } from './booking/entertainment/add-entertainment-type/add-entertainment-type.component';
import { EditEntertainmentTypeComponent } from './booking/entertainment/edit-entertainment-type/edit-entertainment-type.component';
import { EntertainmentTypesComponent } from './booking/entertainment/entertainment-types/entertainment-types.component';
import { FullCalendarModule } from '@fullcalendar/angular';//schedule
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGrid plugin
import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    OtpComponent,
    ForgotPasswordComponent, 
    UpdatePasswordComponent,  
    AddEmployeeComponent, 
    ViewEmployeesComponent, 
    AddHelpComponent, 
    ViewHelpListComponent,
     EditEmployeeComponent, 
     EditHelpComponent, 
     NotificationDialogComponent,
    ResetPasswordComponent,
    AddEmployeeRoleComponent, 
    EmployeeRoleComponent, 
    EditEmployeeRoleComponent,
   MenuTypesComponent, 
   AddMenuTypeComponent, 
   EditMenuTypeComponent, 
   ConfirmationDialogComponent, 
   MenuitemsComponent,
    UpdatePasswordComponent, 
   FoodTypeComponent, 
   MenuItemCategoryComponent, 
   EditFoodTypeComponent,
   CreateFoodTypeComponent, 
   EditMenuItemCategoryComponent, 
   CreateMenuItemCategoryComponent, 
   AddScheduleComponent, 
   EditScheduleComponent, 
   ScheduleDisplayComponent,
   AddEventComponent, 
    EditEventComponent, 
    ViewEventsComponent,
    AddEntertainmentTypeComponent, 
    EditEntertainmentTypeComponent,
    EntertainmentTypesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    //Ng2SearchPipeModule,
    MatSelectModule,
    MatSnackBarModule,
    FullCalendarModule,
  ],
  providers: [DataService], 
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
