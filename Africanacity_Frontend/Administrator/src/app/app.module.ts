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
import { EditSupplierComponent } from './administration/Supplier Management/Suppliers/edit-supplier/edit-supplier.component';
import { EditSuppliertypeComponent } from './administration/Supplier Management/Supplier Types/edit-suppliertype/edit-suppliertype.component';
import { EditIntventorytypeComponent } from './administration/Inventory Management/Inventory Types/edit-intventorytype/edit-intventorytype.component';
import { EditInventoryitemComponent } from './administration/Inventory Management/Inventory Items/edit-inventoryitem/edit-inventoryitem.component';
import { SelectedInventorytypeComponent } from './administration/Inventory Management/Inventory Items/view-inventoryitems/selected-inventorytype/selected-inventorytype.component';
import { ChecklistComponent } from './administration/Inventory Management/Inventory Items/checklist/checklist.component';
import { InventoryStocktypeComponent } from './administration/Inventory Management/Inventory Items/inventory-stocktype/inventory-stocktype.component';
import { ReceiveOrderComponent } from './administration/Inventory Management/Inventory Items/receive-order/receive-order.component';
import { ViewOrdersComponent } from './administration/Inventory Management/Inventory Items/receive-order/view-orders/view-orders/view-orders.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGrid plugin
import interactionPlugin from '@fullcalendar/interaction';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DrinkTypeComponent } from './administration/Drink Type/view-drink-type/view-drink-type.component';
import { CreateDrinkTypeComponent } from './administration/Drink Type/create-drink-type/create-drink-type.component';
import { EditDrinkTypeComponent } from './administration/Drink Type/edit-drink-type/edit-drink-type.component';
import { ViewDrinkComponent } from './administration/Drink/view-drink/view-drink.component';
import { EditDrinkComponent } from './administration/Drink/edit-drink/edit-drink.component';
import { CreateDrinkComponent } from './administration/Drink/create-drink/create-drink.component';
import { EmployeeComponent } from './administration/Reports/employee/employee.component';
import { InventoryComponent } from './administration/Reports/inventory/inventory.component';
import { InventoryReconciliationComponent } from './administration/Reports/inventory-reconciliation/inventory-reconciliation.component';
import { SalesComponent } from './administration/Reports/sales/sales.component';
import { ScheduleComponent } from './administration/Reports/schedule/schedule.component';
import { AddMenuItemComponent } from './administration/menuitems/add-menu-item/add-menu-item.component';
import { EditMenuItemComponent } from './administration/menuitems/edit-menu-item/edit-menu-item.component';
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
import { FullCalendarModule } from '@fullcalendar/angular';
import { ResetComponent } from './login/reset/reset.component';
import { LoginComponent } from './login/login/login.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { StockTakeComponent } from './administration/Inventory Management/Inventory Items/stock-take/stock-take.component';
import { StockTakeListComponent } from './administration/Inventory Management/Inventory Items/stock-take/stock-take-list/stock-take-list.component';
import { WriteOffStockComponent } from './administration/Inventory Management/Inventory Items/stock-take/write-off-stock/write-off-stock.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventDetailsDailogComponent } from './administration/booking/schedule/event-details-dailog/event-details-dailog.component';
import { HelpAddeventComponent } from './administration/booking/events/add-event/help-addevent/help-addevent.component';
import { HelpEditeventsComponent } from './administration/booking/events/edit-event/help-editevents/help-editevents.component';
import { HelpVieweventsComponent } from './administration/booking/events/view-events/help-viewevents/help-viewevents.component';
import { HelpAddscheduleComponent } from './administration/booking/schedule/add-schedule/help-addschedule/help-addschedule.component';
import { HelpEditscheduleComponent } from './administration/booking/schedule/edit-schedule/help-editschedule/help-editschedule.component';
import { HelpViewscheduleComponent } from './administration/booking/schedule/schedule-display/help-viewschedule/help-viewschedule.component';
import { HelpAddentertainmentComponent } from './administration/booking/entertainment/add-entertainment-type/help-addentertainment/help-addentertainment.component';
import { HelpEditentertainmentComponent } from './administration/booking/entertainment/edit-entertainment-type/help-editentertainment/help-editentertainment.component';
import { HelpViewentertainmentComponent } from './administration/booking/entertainment/entertainment-types/help-viewentertainment/help-viewentertainment.component';
import { HelpAddemployeeroleComponent } from './administration/EmployeeRole/add-employee-role/help-addemployeerole/help-addemployeerole.component';
import { HelpEditemployeeroleComponent } from './administration/EmployeeRole/edit-employee-role/help-editemployeerole/help-editemployeerole.component';
import { HelpViewemployeeroleComponent } from './administration/EmployeeRole/employee-role/help-viewemployeerole/help-viewemployeerole.component';
import { SupplierComponent } from './administration/Reports/supplier/supplier.component';
import { BookingComponent } from './administration/Reports/booking/booking.component';
import { NgChartsModule } from 'ng2-charts';
import { MenuReportComponent } from './administration/Reports/menu/menu.component';
import { CreateOtherDrinkComponent } from './administration/otherDrink/create-other-drink/create-other-drink.component';
import { ViewOtherDrinkComponent } from './administration/otherDrink/view-other-drink/view-other-drink.component';
import { ChangeHelpComponent } from './login/change-password/change-help/change-help.component';
import { LoginHelpComponent } from './login/login/login-help/login-help.component';
import { ResetHelpComponent } from './login/reset/reset-help/reset-help.component';
import { SignHelpComponent } from './login/signup/sign-help/sign-help.component';
import { UpdateHelpComponent } from './login/update-profile/update-help/update-help.component';
import { ViewHelpComponent } from './login/view-profile/view-help/view-help.component';
import { EntertainerHelpComponent } from './administration/entertainer/entertainer-help/entertainer-help.component';
import { BookingHelpComponent } from './administration/entertainer/booking-listing/booking-help/booking-help.component';
import { ManageHelpComponent } from './administration/entertainer/manage-booking/manage-help/manage-help.component';
import { PriceModalComponent } from './administration/Inventory Management/Inventory Items/view-inventoryitems/price-modal/price-modal.component';
import { EditItempriceComponent } from './administration/Inventory Management/Inventory Items/view-inventoryitems/price-modal/edit-itemprice/edit-itemprice.component';
import { HelpAddinventoryComponent } from './administration/Inventory Management/Inventory Items/add-inventoryitem/help-addinventory/help-addinventory.component';
import { HelpEditinventoryitemComponent } from './administration/Inventory Management/Inventory Items/edit-inventoryitem/help-editinventoryitem/help-editinventoryitem.component';
import { HelpViewinventoryitemComponent } from './administration/Inventory Management/Inventory Items/view-inventoryitems/help-viewinventoryitem/help-viewinventoryitem.component';
import { HelpAddinventorytypeComponent } from './administration/Inventory Management/Inventory Types/add-inventorytypes/help-addinventorytype/help-addinventorytype.component';
import { HelpAddemployeesComponent } from './administration/Employees/add-employee/help-addemployees/help-addemployees.component';
import { HelpEditemployeeComponent } from './administration/Employees/view-employees/edit-employee/help-editemployee/help-editemployee.component';
import { HelpViewemployeesComponent } from './administration/Employees/view-employees/help-viewemployees/help-viewemployees.component';
import { HelpAddsuppliertypeComponent } from './administration/Supplier Management/Supplier Types/add-suppliertype/help-addsuppliertype/help-addsuppliertype.component';
import { HelpEditsuppliertypeComponent } from './administration/Supplier Management/Supplier Types/edit-suppliertype/help-editsuppliertype/help-editsuppliertype.component';
import { HelpViewsuppliertypesComponent } from './administration/Supplier Management/Supplier Types/view-suppliertypes/help-viewsuppliertypes/help-viewsuppliertypes.component';
import { HelpAddsupplierComponent } from './administration/Supplier Management/Suppliers/add-supplier/help-addsupplier/help-addsupplier.component';
import { HelpEditsupplierComponent } from './administration/Supplier Management/Suppliers/edit-supplier/help-editsupplier/help-editsupplier.component';
import { HelpViewsupplierComponent } from './administration/Supplier Management/Suppliers/view-suppliers/help-viewsupplier/help-viewsupplier.component';
import { HelpViewinventorytypeComponent } from './administration/Inventory Management/Inventory Types/view-inventorytypes/help-viewinventorytype/help-viewinventorytype.component';
import { HelpEditinvetorytypeComponent } from './administration/Inventory Management/Inventory Types/edit-intventorytype/help-editinvetorytype/help-editinvetorytype.component';
import { HelpStocktakeComponent } from './administration/Inventory Management/Inventory Items/stock-take/help-stocktake/help-stocktake.component';
import { HelpReceiveorderComponent } from './administration/Inventory Management/Inventory Items/receive-order/help-receiveorder/help-receiveorder.component';
import { InventoryService } from './service/inventory.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NavbarComponent,
    UpdateProfileComponent,
    ViewProfileComponent,
    SignupComponent,
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
    AddMenuItemComponent, 
    EditMenuItemComponent,
    HomeComponent,
    NavbarComponent, 
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
    ChecklistComponent, 
    InventoryStocktypeComponent,
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
    EntertainmentTypesComponent, 
   CreateMenuItemCategoryComponent, 
   DrinkTypeComponent, 
   CreateDrinkTypeComponent,
    EditDrinkTypeComponent, 
    ViewDrinkComponent, 
    EditDrinkComponent, 
    CreateDrinkComponent, 
    InventoryComponent, 
    EmployeeComponent,
   InventoryReconciliationComponent, 
    SalesComponent, 
    ScheduleComponent,
    ResetComponent,
    LoginComponent,
    ChangePasswordComponent,
    ViewProfileComponent,
    SignupComponent,
    UpdateProfileComponent,
    StockTakeComponent,
    StockTakeListComponent,
    WriteOffStockComponent,
    LoginHelpComponent,
    SignHelpComponent,
    ChangeHelpComponent,
    ResetHelpComponent,
    UpdateHelpComponent,
    ViewHelpComponent,
    EntertainerHelpComponent,
    BookingHelpComponent,
    ManageHelpComponent,
    PriceModalComponent,
    EditItempriceComponent,
    HelpAddinventoryComponent,
    HelpEditinventoryitemComponent,
    HelpViewinventoryitemComponent,
    HelpAddinventorytypeComponent,
    HelpAddemployeesComponent,
    HelpEditemployeeComponent,
    HelpViewemployeesComponent,
    HelpAddsuppliertypeComponent,
    HelpEditsuppliertypeComponent,
    HelpViewsuppliertypesComponent,
    HelpAddsupplierComponent,
    HelpEditsupplierComponent,
    HelpViewsupplierComponent,
    HelpViewinventorytypeComponent,
    HelpEditinvetorytypeComponent,
    HelpStocktakeComponent,
    HelpReceiveorderComponent,
    EventDetailsDailogComponent,
    HelpAddeventComponent,
    HelpEditeventsComponent,
    HelpVieweventsComponent,
    HelpAddscheduleComponent,
    HelpEditscheduleComponent,
    HelpViewscheduleComponent,
    HelpAddentertainmentComponent,
    HelpEditentertainmentComponent,
    HelpViewentertainmentComponent,
    HelpAddemployeeroleComponent,
    HelpEditemployeeroleComponent,
    HelpViewemployeeroleComponent,
    SupplierComponent,
    BookingComponent,
    MenuReportComponent,
    ViewDrinkComponent,
    CreateOtherDrinkComponent,
    ViewOtherDrinkComponent,

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
    //Ng2SearchPipeModule,
    MatSelectModule,
    MatSnackBarModule,
    //NgChartsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FullCalendarModule,
    NgChartsModule, 
    ModalModule.forRoot(), 
    ModalModule.forRoot(),
    CalendarModule.forRoot({
    provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
