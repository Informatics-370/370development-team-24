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
import { AddInventoryitemComponent } from './administration/Inventory Management/Inventory Items/add-inventoryitem/add-inventoryitem.component';
import { ViewInventoryitemsComponent } from './administration/Inventory Management/Inventory Items/view-inventoryitems/view-inventoryitems.component';
import { AddInventorytypesComponent } from './administration/Inventory Management/Inventory Types/add-inventorytypes/add-inventorytypes.component';
import { ViewInventorytypesComponent } from './administration/Inventory Management/Inventory Types/view-inventorytypes/view-inventorytypes.component';
import { AddSuppliertypeComponent } from './administration/Supplier Management/Supplier Types/add-suppliertype/add-suppliertype.component';
import { ViewSuppliertypesComponent } from './administration/Supplier Management/Supplier Types/view-suppliertypes/view-suppliertypes.component';
import { AddSupplierComponent } from './administration/Supplier Management/Suppliers/add-supplier/add-supplier.component';
import { ViewSuppliersComponent } from './administration/Supplier Management/Suppliers/view-suppliers/view-suppliers.component';
import { MatIconModule } from '@angular/material/icon';
import { EditSupplierComponent } from './administration/Supplier Management/Suppliers/edit-supplier/edit-supplier.component';
import { EditSuppliertypeComponent } from './administration/Supplier Management/Supplier Types/edit-suppliertype/edit-suppliertype.component';
import { EditIntventorytypeComponent } from './administration/Inventory Management/Inventory Types/edit-intventorytype/edit-intventorytype.component';
import { EditInventoryitemComponent } from './administration/Inventory Management/Inventory Items/edit-inventoryitem/edit-inventoryitem.component';
import { SelectedInventorytypeComponent } from './administration/Inventory Management/Inventory Items/view-inventoryitems/selected-inventorytype/selected-inventorytype.component';
import { ChecklistComponent } from './administration/Inventory Management/Inventory Items/checklist/checklist.component';
import { InventoryStocktypeComponent } from './administration/Inventory Management/Inventory Items/inventory-stocktype/inventory-stocktype.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReceiveOrderComponent } from './administration/Inventory Management/Inventory Items/receive-order/receive-order.component';
import { ViewOrdersComponent } from './administration/Inventory Management/Inventory Items/receive-order/view-orders/view-orders/view-orders.component';
import { AddEntertainmentTypeComponent } from './administration/booking/entertainment/add-entertainment-type/add-entertainment-type.component';
import { EditEntertainmentTypeComponent } from './administration/booking/entertainment/edit-entertainment-type/edit-entertainment-type.component';
import { EntertainmentTypesComponent } from './administration/booking/entertainment/entertainment-types/entertainment-types.component';
import { AddEventComponent } from './administration/booking/events/add-event/add-event.component';
import { EditEventComponent } from './administration/booking/events/edit-event/edit-event.component';
import { ViewEventsComponent } from './administration/booking/events/view-events/view-events.component';
import { AddScheduleComponent } from './administration/booking/schedule/add-schedule/add-schedule.component';
import { EditScheduleComponent } from './administration/booking/schedule/edit-schedule/edit-schedule.component';
import { ScheduleDisplayComponent } from './administration/booking/schedule/schedule-display/schedule-display.component';

// import { FullCalendarModule } from '@fullcalendar/angular';
// import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGrid plugin
// import interactionPlugin from '@fullcalendar/interaction';
// //import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import the interaction plugin
// import { ModalModule } from 'ngx-bootstrap/modal';




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
    BookingListingComponent,
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    AddEmployeeComponent, 
    ViewEmployeesComponent, 
    AddHelpComponent, 
    ViewHelpListComponent,
     EditEmployeeComponent, 
     EditHelpComponent, 
     NotificationDialogComponent,
    AddEmployeeRoleComponent, 
    EmployeeRoleComponent, 
    EditEmployeeRoleComponent,
   MenuTypesComponent, 
   AddMenuTypeComponent, 
   EditMenuTypeComponent, 
   ConfirmationDialogComponent, 
   MenuitemsComponent,
   FoodTypeComponent, 
   MenuItemCategoryComponent, 
   EditFoodTypeComponent,
   CreateFoodTypeComponent, 
   EditMenuItemCategoryComponent, 
   CreateMenuItemCategoryComponent, 
   AddInventoryitemComponent,
    ViewInventoryitemsComponent, 
    AddInventorytypesComponent, 
    ViewInventorytypesComponent, 
    AddSuppliertypeComponent, 
    ViewSuppliertypesComponent, 
    AddSupplierComponent, 
    ViewSuppliersComponent, 
    EditSupplierComponent, 
    EditSuppliertypeComponent, 
    EditIntventorytypeComponent, 
    EditInventoryitemComponent, 
    SelectedInventorytypeComponent, 
    ChecklistComponent, InventoryStocktypeComponent,
    ReceiveOrderComponent,
    ViewOrdersComponent,
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
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    //Ng2SearchPipeModule,
    // MatSelectModule,
    // MatSnackBarModule,
    // MatIconModule,
    // MatButtonModule,
    // MatDialogModule,
    // FullCalendarModule,
    // ModalModule.forRoot(),
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
