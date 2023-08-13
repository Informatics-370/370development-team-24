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
import { CreateDrinkTypeComponent } from './administration/Drink Type/create-drink-type/create-drink-type.component';
import { EditDrinkTypeComponent } from './administration/Drink Type/edit-drink-type/edit-drink-type.component';
import { DrinkTypeComponent } from './administration/Drink Type/view-drink-type/view-drink-type.component';
import { CreateDrinkComponent } from './administration/Drink/create-drink/create-drink.component';
import { EditDrinkComponent } from './administration/Drink/edit-drink/edit-drink.component';
import { ViewDrinkComponent } from './administration/Drink/view-drink/view-drink.component';
import { AddEmployeeRoleComponent } from './administration/EmployeeRole/add-employee-role/add-employee-role.component';
import { EditEmployeeRoleComponent } from './administration/EmployeeRole/edit-employee-role/edit-employee-role.component';
import { EmployeeRoleComponent } from './administration/EmployeeRole/employee-role/employee-role.component';
import { AddEmployeeComponent } from './administration/Employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './administration/Employees/view-employees/edit-employee/edit-employee.component';
import { ViewEmployeesComponent } from './administration/Employees/view-employees/view-employees.component';
import { CreateFoodTypeComponent } from './administration/Food Type/create-food-type/create-food-type.component';
import { EditFoodTypeComponent } from './administration/Food Type/edit-food-type/edit-food-type.component';
import { FoodTypeComponent } from './administration/Food Type/view-food-type/food-type.component';
import { AddHelpComponent } from './administration/Help Management/add-help/add-help.component';
import { EditHelpComponent } from './administration/Help Management/view-help-list/edit-help/edit-help.component';
import { ViewHelpListComponent } from './administration/Help Management/view-help-list/view-help-list.component';
import { AddInventoryitemComponent } from './administration/Inventory Management/Inventory Items/add-inventoryitem/add-inventoryitem.component';
import { ChecklistComponent } from './administration/Inventory Management/Inventory Items/checklist/checklist.component';
import { EditInventoryitemComponent } from './administration/Inventory Management/Inventory Items/edit-inventoryitem/edit-inventoryitem.component';
import { InventoryStocktypeComponent } from './administration/Inventory Management/Inventory Items/inventory-stocktype/inventory-stocktype.component';
import { ReceiveOrderComponent } from './administration/Inventory Management/Inventory Items/receive-order/receive-order.component';
import { ViewOrdersComponent } from './administration/Inventory Management/Inventory Items/receive-order/view-orders/view-orders/view-orders.component';
import { SelectedInventorytypeComponent } from './administration/Inventory Management/Inventory Items/view-inventoryitems/selected-inventorytype/selected-inventorytype.component';
import { ViewInventoryitemsComponent } from './administration/Inventory Management/Inventory Items/view-inventoryitems/view-inventoryitems.component';
import { AddInventorytypesComponent } from './administration/Inventory Management/Inventory Types/add-inventorytypes/add-inventorytypes.component';
import { EditIntventorytypeComponent } from './administration/Inventory Management/Inventory Types/edit-intventorytype/edit-intventorytype.component';
import { ViewInventorytypesComponent } from './administration/Inventory Management/Inventory Types/view-inventorytypes/view-inventorytypes.component';
import { CreateMenuItemCategoryComponent } from './administration/Menu Item Category/create-menu-item-category/create-menu-item-category/create-menu-item-category.component';
import { EditMenuItemCategoryComponent } from './administration/Menu Item Category/edit-menu-item-category/edit-menu-item-category/edit-menu-item-category.component';
import { MenuItemCategoryComponent } from './administration/Menu Item Category/view-menu-item-category/menu-item-category.component';
import { EmployeeComponent } from './administration/Reports/employee/employee.component';
import { InventoryReconciliationComponent } from './administration/Reports/inventory-reconciliation/inventory-reconciliation.component';
import { InventoryComponent } from './administration/Reports/inventory/inventory.component';
import { SalesComponent } from './administration/Reports/sales/sales.component';
import { ScheduleComponent } from './administration/Reports/schedule/schedule.component';
import { AddSuppliertypeComponent } from './administration/Supplier Management/Supplier Types/add-suppliertype/add-suppliertype.component';
import { EditSuppliertypeComponent } from './administration/Supplier Management/Supplier Types/edit-suppliertype/edit-suppliertype.component';
import { ViewSuppliertypesComponent } from './administration/Supplier Management/Supplier Types/view-suppliertypes/view-suppliertypes.component';
import { AddSupplierComponent } from './administration/Supplier Management/Suppliers/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './administration/Supplier Management/Suppliers/edit-supplier/edit-supplier.component';
import { ViewSuppliersComponent } from './administration/Supplier Management/Suppliers/view-suppliers/view-suppliers.component';
import { AddEntertainmentTypeComponent } from './administration/booking/entertainment/add-entertainment-type/add-entertainment-type.component';
import { EditEntertainmentTypeComponent } from './administration/booking/entertainment/edit-entertainment-type/edit-entertainment-type.component';
import { EntertainmentTypesComponent } from './administration/booking/entertainment/entertainment-types/entertainment-types.component';
import { AddEventComponent } from './administration/booking/events/add-event/add-event.component';
import { EditEventComponent } from './administration/booking/events/edit-event/edit-event.component';
import { ViewEventsComponent } from './administration/booking/events/view-events/view-events.component';
import { AddScheduleComponent } from './administration/booking/schedule/add-schedule/add-schedule.component';
import { EditScheduleComponent } from './administration/booking/schedule/edit-schedule/edit-schedule.component';
import { ScheduleDisplayComponent } from './administration/booking/schedule/schedule-display/schedule-display.component';
import { AddMenuTypeComponent } from './administration/menu-types/add-menu-type/add-menu-type.component';
import { EditMenuTypeComponent } from './administration/menu-types/edit-menu-type/edit-menu-type.component';
import { MenuTypesComponent } from './administration/menu-types/menu-types.component';
import { AddMenuItemComponent } from './administration/menuitems/add-menu-item/add-menu-item.component';
import { EditMenuItemComponent } from './administration/menuitems/edit-menu-item/edit-menu-item.component';
import { MenuitemsComponent } from './administration/menuitems/menuitems.component';
import { StockTakeComponent } from './administration/Inventory Management/Inventory Items/stock-take/stock-take.component';
import { StockTakeListComponent } from './administration/Inventory Management/Inventory Items/stock-take/stock-take-list/stock-take-list.component';
import { WriteOffStockComponent } from './administration/Inventory Management/Inventory Items/stock-take/write-off-stock/write-off-stock.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
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
  // open on this page
  // { path: '', component: ViewOrdersComponent },
  // { path: 'home', component: HomeComponent },
  //{ path: '', component: LoginComponent },
  { path: 'add-employee', component: AddEmployeeComponent }, // for add employee page
  { path: 'edit-employee/:id', component: EditEmployeeComponent},//Edit employee
  { path: 'view-employees', component: ViewEmployeesComponent }, // for view employees page
  { path: 'add-help', component: AddHelpComponent }, // for add help page
  { path: 'view-help-list', component: ViewHelpListComponent }, // for view help list page 
  { path: 'edit-help/:id', component: EditHelpComponent }, // for edit help page
  { path: 'edit-menu-type/:id', component: EditMenuTypeComponent},//edit menu type 
  { path: 'add-employee-role', component: AddEmployeeRoleComponent },// for add employee role
  { path: 'edit-employee-role/:id', component: EditEmployeeRoleComponent },//for edit employee role
  { path: 'employee-role', component: EmployeeRoleComponent },// for view employee role
  { path: 'menu-types', component: MenuTypesComponent }, // for menu page
  { path: 'add-menu-type', component: AddMenuTypeComponent}, //add menu type page
  { path: 'menuitems', component: MenuitemsComponent},//For the menu item page
  { path: 'add-menu-item',component:AddMenuItemComponent},//for add menu item page
  { path: 'edit-menu-item/:id', component:EditMenuItemComponent}, // for edit menu item page
  { path: 'employee-role',component: EmployeeRoleComponent },
  { path: 'food-type', component: FoodTypeComponent }, // for foodType page
  { path: 'menu-item-category', component: MenuItemCategoryComponent }, // for Menu Item Category page
  { path: 'edit-food-type/:id', component: EditFoodTypeComponent }, // for edit food type
  { path: 'create-food-type', component: CreateFoodTypeComponent },
  { path: 'edit-menu-item-category/:id', component: EditMenuItemCategoryComponent}, // for edit Menu Item Category page
  { path: 'create-menu-item-category', component: CreateMenuItemCategoryComponent },
   ///SCHEDULE
  {path:'schedule-display', component: ScheduleDisplayComponent},
  {path:'edit-schedule/:id', component: EditScheduleComponent},
  {path:'add-schedule', component: AddScheduleComponent},
 ///EVENTS
 {path:'view-events', component: ViewEventsComponent},
 {path:'edit-event/:id', component: EditEventComponent},
 {path:'add-event', component: AddEventComponent},
 ///ENTERTAINMENT TYPES
  {path:'entertainment-types', component: EntertainmentTypesComponent},
  {path:'edit-entertainment-type/:id', component: EditEntertainmentTypeComponent},
  {path:'add-entertainment-type', component: AddEntertainmentTypeComponent},
  { path: 'navbar',component: NavbarComponent },
  { path: 'home', component: HomeComponent }, // for home page
  {path:'view-suppliers', component: ViewSuppliersComponent}, // for View Suppliers
  {path: 'edit-supplier/:id', component: EditSupplierComponent},
  {path: 'add-supplier', component:AddSupplierComponent},
  {path:'view-suppliertypes', component: ViewSuppliertypesComponent},
  {path: 'add-suppliertype', component: AddSuppliertypeComponent},
  {path: 'edit-suppliertype/:id', component: EditSuppliertypeComponent},
  {path: 'view-inventorytypes', component: ViewInventorytypesComponent},
  {path: 'add-inventorytypes', component: AddInventorytypesComponent},
  {path: 'edit-inventorytype/:id', component: EditIntventorytypeComponent},
  {path: 'view-inventoryitems/:typeId', component: ViewInventoryitemsComponent},
  {path: 'add-inventoryitem', component: AddInventoryitemComponent},
  {path: 'edit-inventoryitem/:id', component: EditInventoryitemComponent},
  {path: 'selected-inventorytype', component: SelectedInventorytypeComponent},
  {path: 'checklist', component:ChecklistComponent},
  {path: 'inventory-stocktype', component: InventoryStocktypeComponent},
  {path: 'receive-order/:id', component:ReceiveOrderComponent},
  {path: 'view-orders', component:ViewOrdersComponent},
  { path: 'view-drink-type', component: DrinkTypeComponent }, //for drink type page
  { path: 'create-drink-type', component: CreateDrinkTypeComponent }, // for create drink type page
  { path: 'edit-drink-type/:id', component: EditDrinkTypeComponent }, // for edit drink type page
  { path: 'view-drink', component: ViewDrinkComponent }, //for drink page
  { path: 'create-drink', component: CreateDrinkComponent }, // for create drink page
  { path: 'edit-drink/:id', component: EditDrinkComponent }, // for edit drink page
  { path: 'employee',component: EmployeeComponent }, // for employee report
  { path: 'inventory',component: InventoryComponent }, // for inventory report
  { path: 'inventory-reconciliation',component: InventoryReconciliationComponent }, // for inventory reconciliation report
  { path: 'sales',component: SalesComponent }, // for sales report
  { path: 'schedule',component: ScheduleComponent },
  {path: 'stock-take', component:StockTakeComponent},
  {path: 'stock-take-list', component:StockTakeListComponent},
  {path: 'write-off-stock', component:WriteOffStockComponent},
// for schedule
  { path: '', redirectTo: 'login', pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }