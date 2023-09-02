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
import { EditEmployeeRoleComponent } from './administration/EmployeeRole/edit-employee-role/edit-employee-role.component';
import { AddEmployeeRoleComponent } from './administration/EmployeeRole/add-employee-role/add-employee-role.component';
import { EmployeeRoleComponent } from './administration/EmployeeRole/employee-role/employee-role.component';
import { MenuTypesComponent } from './administration/menu-types/menu-types.component';//for menu types page
// routing for pages
import { AddEmployeeComponent } from './administration/Employees/add-employee/add-employee.component'; // for add employee page
import { ViewEmployeesComponent } from './administration/Employees/view-employees/view-employees.component';
import { AddHelpComponent } from './administration/Help Management/add-help/add-help.component';
import { ViewHelpListComponent } from './administration/Help Management/view-help-list/view-help-list.component';
import { EditEmployeeComponent } from './administration/Employees/view-employees/edit-employee/edit-employee.component';
import { EditHelpComponent } from './administration/Help Management/view-help-list/edit-help/edit-help.component';
import { AddMenuTypeComponent } from './administration/menu-types/add-menu-type/add-menu-type.component';
import { EditMenuTypeComponent } from './administration/menu-types/edit-menu-type/edit-menu-type.component';
import { FoodTypeComponent } from './administration/Food Type/view-food-type/food-type.component'; // for food type page
import { MenuItemCategoryComponent } from './administration/Menu Item Category/view-menu-item-category/menu-item-category.component'; // for menu item category page
import { EditFoodTypeComponent } from './administration/Food Type/edit-food-type/edit-food-type.component';
import { CreateFoodTypeComponent } from './administration/Food Type/create-food-type/create-food-type.component';
import { CreateMenuItemCategoryComponent } from './administration/Menu Item Category/create-menu-item-category/create-menu-item-category/create-menu-item-category.component';
import { EditMenuItemCategoryComponent } from './administration/Menu Item Category/edit-menu-item-category/edit-menu-item-category/edit-menu-item-category.component';
import { ViewSuppliersComponent } from './administration/Supplier Management/Suppliers/view-suppliers/view-suppliers.component';
import { EditSupplierComponent } from './administration/Supplier Management/Suppliers/edit-supplier/edit-supplier.component';
import { AddSupplierComponent } from './administration/Supplier Management/Suppliers/add-supplier/add-supplier.component';
import { ViewSuppliertypesComponent } from './administration/Supplier Management/Supplier Types/view-suppliertypes/view-suppliertypes.component';
import { AddSuppliertypeComponent } from './administration/Supplier Management/Supplier Types/add-suppliertype/add-suppliertype.component';
import { EditSuppliertypeComponent } from './administration/Supplier Management/Supplier Types/edit-suppliertype/edit-suppliertype.component';
import { ViewInventorytypesComponent } from './administration/Inventory Management/Inventory Types/view-inventorytypes/view-inventorytypes.component';
import { AddInventorytypesComponent } from './administration/Inventory Management/Inventory Types/add-inventorytypes/add-inventorytypes.component';
import { EditIntventorytypeComponent } from './administration/Inventory Management/Inventory Types/edit-intventorytype/edit-intventorytype.component';
import { ViewInventoryitemsComponent } from './administration/Inventory Management/Inventory Items/view-inventoryitems/view-inventoryitems.component';
import { AddInventoryitemComponent } from './administration/Inventory Management/Inventory Items/add-inventoryitem/add-inventoryitem.component';
import { EditInventoryitemComponent } from './administration/Inventory Management/Inventory Items/edit-inventoryitem/edit-inventoryitem.component';
import { SelectedInventorytypeComponent } from './administration/Inventory Management/Inventory Items/view-inventoryitems/selected-inventorytype/selected-inventorytype.component';
import { ChecklistComponent } from './administration/Inventory Management/Inventory Items/checklist/checklist.component';
import { InventoryStocktypeComponent } from './administration/Inventory Management/Inventory Items/inventory-stocktype/inventory-stocktype.component';
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

//import { EditMenuItemCategoryComponent } from './administration/Menu Item Category/edit-menu-item-category/edit-menu-item-category.component';
//import { CreateMenuItemCategoryComponent } from './administration/Menu Item Category/create-menu-item-category/create-menu-item-category.component';
import { AddMenuItemComponent } from './administration/menuitems/add-menu-item/add-menu-item.component';
import { EditMenuItemComponent } from './administration/menuitems/edit-menu-item/edit-menu-item.component';
import { CreateDrinkTypeComponent } from './administration/Drink Type/create-drink-type/create-drink-type.component';
import { EditDrinkTypeComponent } from './administration/Drink Type/edit-drink-type/edit-drink-type.component';
import { DrinkTypeComponent } from './administration/Drink Type/view-drink-type/view-drink-type.component';
import { CreateDrinkComponent } from './administration/Drink/create-drink/create-drink.component';
import { EditDrinkComponent } from './administration/Drink/edit-drink/edit-drink.component';
import { ViewDrinkComponent } from './administration/Drink/view-drink/view-drink.component';
import { EmployeeComponent } from './administration/Reports/employee/employee.component';
import { InventoryReconciliationComponent } from './administration/Reports/inventory-reconciliation/inventory-reconciliation.component';
import { InventoryComponent } from './administration/Reports/inventory/inventory.component';
import { SalesComponent } from './administration/Reports/sales/sales.component';
import { ScheduleComponent } from './administration/Reports/schedule/schedule.component';
import { BookingComponent } from './administration/Reports/booking/booking.component';
import { EntertainerReportComponent } from './administration/Reports/entertainer/entertainer.component';
import { MenuReportComponent } from './administration/Reports/menu/menu.component';
import { SupplierComponent } from './administration/Reports/supplier/supplier.component';
import { MenuitemsComponent } from './administration/menuitems/menuitems.component';
import { StockTakeComponent } from './administration/Inventory Management/Inventory Items/stock-take/stock-take.component';
import { StockTakeListComponent } from './administration/Inventory Management/Inventory Items/stock-take/stock-take-list/stock-take-list.component';
import { WriteOffStockComponent } from './administration/Inventory Management/Inventory Items/stock-take/write-off-stock/write-off-stock.component';
import { ChangeHelpComponent } from './login/change-password/change-help/change-help.component';
import { LoginHelpComponent } from './login/login/login-help/login-help.component';
import { ResetHelpComponent } from './login/reset/reset-help/reset-help.component';
import { SignHelpComponent } from './login/signup/sign-help/sign-help.component';
import { UpdateHelpComponent } from './login/update-profile/update-help/update-help.component';
import { ViewHelpComponent } from './login/view-profile/view-help/view-help.component';
import { EntertainerHelpComponent } from './administration/entertainer/entertainer-help/entertainer-help.component';
import { BookingHelpComponent } from './administration/entertainer/booking-listing/booking-help/booking-help.component';
import { ManageHelpComponent } from './administration/entertainer/manage-booking/manage-help/manage-help.component';
import { EditItempriceComponent } from './administration/Inventory Management/Inventory Items/view-inventoryitems/price-modal/edit-itemprice/edit-itemprice.component';
import { EventDetailsDailogComponent } from './administration/booking/schedule/event-details-dailog/event-details-dailog.component';
import { ViewOtherDrinkComponent } from './administration/otherDrink/view-other-drink/view-other-drink.component';
import { CreateOtherDrinkComponent } from './administration/otherDrink/create-other-drink/create-other-drink.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'home', component: HomeComponent , canActivate:[AuthGuard]},
  { path: 'add-employee', component: AddEmployeeComponent, canActivate:[AuthGuard] }, // for add employee page
  { path: 'edit-employee/:id', component: EditEmployeeComponent, canActivate:[AuthGuard]},//Edit employee
  { path: 'view-employees', component: ViewEmployeesComponent, canActivate:[AuthGuard] }, // for view employees page
  { path: 'add-help', component: AddHelpComponent, canActivate:[AuthGuard] }, // for add help page
  { path: 'view-help-list', component: ViewHelpListComponent, canActivate:[AuthGuard] }, // for view help list page 
  { path: 'edit-help/:id', component: EditHelpComponent, canActivate:[AuthGuard] }, // for edit help page
  { path: 'edit-menu-type/:id', component: EditMenuTypeComponent, canActivate:[AuthGuard]},//edit menu type 
  { path: 'add-employee-role', component: AddEmployeeRoleComponent, canActivate:[AuthGuard] },// for add employee role
  { path: 'edit-employee-role/:id', component: EditEmployeeRoleComponent , canActivate:[AuthGuard]},//for edit employee role
  { path: 'employee-role', component: EmployeeRoleComponent, canActivate:[AuthGuard] },// for view employee role
  { path: 'menu-types', component: MenuTypesComponent, canActivate:[AuthGuard] }, // for menu page
  { path: 'add-menu-type', component: AddMenuTypeComponent, canActivate:[AuthGuard]}, //add menu type page
  { path: 'menuitems', component: MenuitemsComponent, canActivate:[AuthGuard]},//For the menu item page
  { path: 'employee-role',component: EmployeeRoleComponent, canActivate:[AuthGuard] },
  { path: 'food-type', component: FoodTypeComponent, canActivate:[AuthGuard] }, // for foodType page
  { path: 'menu-item-category', component: MenuItemCategoryComponent, canActivate:[AuthGuard] }, // for Menu Item Category page
  { path: 'edit-food-type/:id', component: EditFoodTypeComponent, canActivate:[AuthGuard] }, // for edit food type
  { path: 'create-food-type', component: CreateFoodTypeComponent , canActivate:[AuthGuard]},
  { path: 'edit-menu-item-category/:id', component: EditMenuItemCategoryComponent, canActivate:[AuthGuard]}, // for edit Menu Item Category page
  { path: 'create-menu-item-category', component: CreateMenuItemCategoryComponent , canActivate:[AuthGuard]},
  { path: 'add-employee', component: AddEmployeeComponent , canActivate:[AuthGuard]}, // for add employee page
  { path: 'edit-employee/:id', component: EditEmployeeComponent, canActivate:[AuthGuard]},//Edit employee
  { path: 'view-employees', component: ViewEmployeesComponent , canActivate:[AuthGuard]}, // for view employees page
  { path: 'add-help', component: AddHelpComponent , canActivate:[AuthGuard]}, // for add help page
  { path: 'view-help-list', component: ViewHelpListComponent , canActivate:[AuthGuard]}, // for view help list page 
  { path: 'edit-help/:id', component: EditHelpComponent , canActivate:[AuthGuard]}, // for edit help page
  { path: 'edit-menu-type/:id', component: EditMenuTypeComponent, canActivate:[AuthGuard]},//edit menu type 
  { path: 'add-employee-role', component: AddEmployeeRoleComponent, canActivate:[AuthGuard] },// for add employee role
  { path: 'edit-employee-role/:id', component: EditEmployeeRoleComponent, canActivate:[AuthGuard] },//for edit employee role
  { path: 'employee-role', component: EmployeeRoleComponent, canActivate:[AuthGuard] },// for view employee role
  { path: 'menu-types', component: MenuTypesComponent, canActivate:[AuthGuard] }, // for menu page
  { path: 'add-menu-type', component: AddMenuTypeComponent, canActivate:[AuthGuard]}, //add menu type page
  { path: 'menuitems', component: MenuitemsComponent, canActivate:[AuthGuard]},//For the menu item page
  { path: 'employee-role',component: EmployeeRoleComponent, canActivate:[AuthGuard] },
  { path: 'food-type', component: FoodTypeComponent, canActivate:[AuthGuard] }, // for foodType page
  { path: 'menu-item-category', component: MenuItemCategoryComponent, canActivate:[AuthGuard] }, // for Menu Item Category page
  { path: 'edit-food-type/:id', component: EditFoodTypeComponent, canActivate:[AuthGuard] }, // for edit food type
  { path: 'create-food-type', component: CreateFoodTypeComponent, canActivate:[AuthGuard] },
  { path: 'edit-menu-item-category/:id', component: EditMenuItemCategoryComponent, canActivate:[AuthGuard]}, // for edit Menu Item Category page
  { path: 'create-menu-item-category', component: CreateMenuItemCategoryComponent, canActivate:[AuthGuard] },
  
   ///SCHEDULE
  {path:'schedule-display', component: ScheduleDisplayComponent, canActivate:[AuthGuard]},
  {path:'edit-schedule/:id', component: EditScheduleComponent, canActivate:[AuthGuard]},
  {path:'add-schedule', component: AddScheduleComponent, canActivate:[AuthGuard]},
 ///EVENTS
 {path:'view-events', component: ViewEventsComponent, canActivate:[AuthGuard]},
 {path:'edit-event/:id', component: EditEventComponent, canActivate:[AuthGuard]},
 {path:'add-event', component: AddEventComponent, canActivate:[AuthGuard]},
 ///ENTERTAINMENT TYPES
  {path:'entertainment-types', component: EntertainmentTypesComponent, canActivate:[AuthGuard]},
  {path:'edit-entertainment-type/:id', component: EditEntertainmentTypeComponent, canActivate:[AuthGuard]},
  {path:'add-entertainment-type', component: AddEntertainmentTypeComponent, canActivate:[AuthGuard]},
  {path:'view-suppliers', component: ViewSuppliersComponent, canActivate:[AuthGuard]}, // for View Suppliers
  {path: 'edit-supplier/:id', component: EditSupplierComponent, canActivate:[AuthGuard]},
  {path: 'add-supplier', component:AddSupplierComponent, canActivate:[AuthGuard]},
  {path:'view-suppliertypes', component: ViewSuppliertypesComponent, canActivate:[AuthGuard]},
  {path: 'add-suppliertype', component: AddSuppliertypeComponent, canActivate:[AuthGuard]},
  {path: 'edit-suppliertype/:id', component: EditSuppliertypeComponent, canActivate:[AuthGuard]},
  {path: 'view-inventorytypes', component: ViewInventorytypesComponent, canActivate:[AuthGuard]},
  {path: 'add-inventorytypes', component: AddInventorytypesComponent, canActivate:[AuthGuard]},
  {path: 'edit-inventorytype/:id', component: EditIntventorytypeComponent, canActivate:[AuthGuard]},
  {path: 'view-inventoryitems/:typeId', component: ViewInventoryitemsComponent, canActivate:[AuthGuard]},
  {path: 'add-inventoryitem', component: AddInventoryitemComponent, canActivate:[AuthGuard]},
  {path: 'edit-inventoryitem/:id', component: EditInventoryitemComponent, canActivate:[AuthGuard]},
  {path: 'selected-inventorytype', component: SelectedInventorytypeComponent, canActivate:[AuthGuard]},
  {path: 'checklist', component:ChecklistComponent, canActivate:[AuthGuard]},
  {path: 'inventory-stocktype', component: InventoryStocktypeComponent, canActivate:[AuthGuard]},
  {path: 'receive-order/:id', component:ReceiveOrderComponent, canActivate:[AuthGuard]},
  {path: 'view-orders', component:ViewOrdersComponent, canActivate:[AuthGuard]},
  {path:'signup', component:SignupComponent, canActivate:[AuthGuard]},
  {path:'reset', component:ResetComponent, canActivate:[AuthGuard]},
  {path:'view-profile',component:ViewProfileComponent, canActivate:[AuthGuard]},
  {path:'view-suppliers', component: ViewSuppliersComponent, canActivate:[AuthGuard]}, // for View Suppliers
  {path: 'edit-supplier/:id', component: EditSupplierComponent, canActivate:[AuthGuard]},
  {path: 'add-supplier', component:AddSupplierComponent, canActivate:[AuthGuard]},
  {path:'view-suppliertypes', component: ViewSuppliertypesComponent, canActivate:[AuthGuard]},
  {path: 'add-suppliertype', component: AddSuppliertypeComponent, canActivate:[AuthGuard]},
  {path: 'edit-suppliertype/:id', component: EditSuppliertypeComponent, canActivate:[AuthGuard]},
  {path: 'view-inventorytypes', component: ViewInventorytypesComponent, canActivate:[AuthGuard]},
  {path: 'add-inventorytypes', component: AddInventorytypesComponent, canActivate:[AuthGuard]},
  {path: 'edit-inventorytype/:id', component: EditIntventorytypeComponent, canActivate:[AuthGuard]},
  {path: 'view-inventoryitems/:typeId', component: ViewInventoryitemsComponent, canActivate:[AuthGuard]},
  {path: 'add-inventoryitem', component: AddInventoryitemComponent, canActivate:[AuthGuard]},
  {path: 'edit-inventoryitem/:id', component: EditInventoryitemComponent, canActivate:[AuthGuard]},
  {path: 'selected-inventorytype', component: SelectedInventorytypeComponent, canActivate:[AuthGuard]},
  {path: 'checklist', component:ChecklistComponent, canActivate:[AuthGuard]},
  {path: 'inventory-stocktype', component: InventoryStocktypeComponent, canActivate:[AuthGuard]},
  {path: 'receive-order/:id', component:ReceiveOrderComponent, canActivate:[AuthGuard]},
  {path: 'view-orders', component:ViewOrdersComponent, canActivate:[AuthGuard]},
  {path:'signup', component:SignupComponent, canActivate:[AuthGuard]},
  {path:'reset', component:ResetComponent, canActivate:[AuthGuard]},
  {path:'entertainment-types', component: EntertainmentTypesComponent, canActivate:[AuthGuard]},
  {path:'edit-entertainment-type/:id', component: EditEntertainmentTypeComponent, canActivate:[AuthGuard]},
  {path:'add-entertainment-type', component: AddEntertainmentTypeComponent, canActivate:[AuthGuard]},
  {path:'view-suppliers', component: ViewSuppliersComponent, canActivate:[AuthGuard]}, // for View Suppliers
  {path: 'edit-supplier/:id', component: EditSupplierComponent, canActivate:[AuthGuard]},
  {path: 'add-supplier', component:AddSupplierComponent, canActivate:[AuthGuard]},
  {path:'view-suppliertypes', component: ViewSuppliertypesComponent, canActivate:[AuthGuard]},
  {path: 'add-suppliertype', component: AddSuppliertypeComponent, canActivate:[AuthGuard]},
  {path: 'edit-suppliertype/:id', component: EditSuppliertypeComponent, canActivate:[AuthGuard]},
  {path: 'view-inventorytypes', component: ViewInventorytypesComponent, canActivate:[AuthGuard]},
  {path: 'add-inventorytypes', component: AddInventorytypesComponent, canActivate:[AuthGuard]},
  {path: 'edit-inventorytype/:id', component: EditIntventorytypeComponent, canActivate:[AuthGuard]},
  {path: 'view-inventoryitems/:typeId', component: ViewInventoryitemsComponent, canActivate:[AuthGuard]},
  {path: 'add-inventoryitem', component: AddInventoryitemComponent, canActivate:[AuthGuard]},
  {path: 'edit-inventoryitem/:id', component: EditInventoryitemComponent, canActivate:[AuthGuard]},
  {path: 'selected-inventorytype', component: SelectedInventorytypeComponent, canActivate:[AuthGuard]},
  {path: 'checklist', component:ChecklistComponent, canActivate:[AuthGuard]},
  {path: 'inventory-stocktype', component: InventoryStocktypeComponent, canActivate:[AuthGuard]},
  {path: 'receive-order/:id', component:ReceiveOrderComponent, canActivate:[AuthGuard]},
  {path: 'view-orders', component:ViewOrdersComponent, canActivate:[AuthGuard]},
  {path:'view-profile',component:ViewProfileComponent, canActivate:[AuthGuard]},
  {path:'change-password',component:ChangePasswordComponent, canActivate:[AuthGuard]},
  {path:'update-profile', component:UpdateProfileComponent, canActivate:[AuthGuard]},
  {path: 'navbar',component: NavbarComponent, canActivate:[AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]}, 
  {path: 'menu', component: MenuComponent, canActivate:[AuthGuard]}, 
  {path: 'entertainer', component: EntertainerComponent, canActivate:[AuthGuard]}, 
  {path: 'booking-listing', component: BookingListingComponent, canActivate:[AuthGuard]}, 
  {path: 'manage-booking', component:  ManageBookingComponent, canActivate:[AuthGuard]}, 
  { path: 'add-employee', component: AddEmployeeComponent , canActivate:[AuthGuard]}, // for add employee page
  { path: 'edit-employee/:id', component: EditEmployeeComponent, canActivate:[AuthGuard]},//Edit employee
  { path: 'view-employees', component: ViewEmployeesComponent , canActivate:[AuthGuard]}, // for view employees page
  { path: 'add-help', component: AddHelpComponent, canActivate:[AuthGuard] }, // for add help page
  { path: 'view-help-list', component: ViewHelpListComponent, canActivate:[AuthGuard] }, // for view help list page 
  { path: 'edit-help/:id', component: EditHelpComponent , canActivate:[AuthGuard]}, // for edit help page
  { path: 'edit-menu-type/:id', component: EditMenuTypeComponent, canActivate:[AuthGuard]},//edit menu type 
  { path: 'add-employee-role', component: AddEmployeeRoleComponent , canActivate:[AuthGuard]},// for add employee role
  { path: 'edit-employee-role/:id', component: EditEmployeeRoleComponent , canActivate:[AuthGuard]},//for edit employee role
  { path: 'employee-role', component: EmployeeRoleComponent , canActivate:[AuthGuard]},// for view employee role
  { path: 'menu-types', component: MenuTypesComponent , canActivate:[AuthGuard]}, // for menu page
  { path: 'add-menu-type', component: AddMenuTypeComponent, canActivate:[AuthGuard]}, //add menu type page
  { path: 'menuitems', component: MenuitemsComponent, canActivate:[AuthGuard]},//For the menu item page
  { path: 'add-menu-item',component:AddMenuItemComponent, canActivate:[AuthGuard]},//for add menu item page
  { path: 'edit-menu-item/:id', component:EditMenuItemComponent, canActivate:[AuthGuard]}, // for edit menu item page
  { path: 'employee-role',component: EmployeeRoleComponent , canActivate:[AuthGuard]},
  { path: 'food-type', component: FoodTypeComponent , canActivate:[AuthGuard]}, // for foodType page
  { path: 'menu-item-category', component: MenuItemCategoryComponent, canActivate:[AuthGuard] }, // for Menu Item Category page
  { path: 'edit-food-type/:id', component: EditFoodTypeComponent, canActivate:[AuthGuard] }, // for edit food type
  { path: 'create-food-type', component: CreateFoodTypeComponent, canActivate:[AuthGuard] },
  { path: 'edit-menu-item-category/:id', component: EditMenuItemCategoryComponent, canActivate:[AuthGuard]}, // for edit Menu Item Category page
  { path: 'create-menu-item-category', component: CreateMenuItemCategoryComponent , canActivate:[AuthGuard]},
  { path: 'manage-booking', component:  ManageBookingComponent, canActivate:[AuthGuard]}, 
  { path: 'add-employee', component: AddEmployeeComponent, canActivate:[AuthGuard] }, // for add employee page
  { path: 'edit-employee/:id', component: EditEmployeeComponent, canActivate:[AuthGuard]},//Edit employee
  { path: 'view-employees', component: ViewEmployeesComponent , canActivate:[AuthGuard]}, // for view employees page
  { path: 'add-help', component: AddHelpComponent , canActivate:[AuthGuard]}, // for add help page
  { path: 'view-help-list', component: ViewHelpListComponent , canActivate:[AuthGuard]}, // for view help list page 
  { path: 'edit-help/:id', component: EditHelpComponent , canActivate:[AuthGuard]}, // for edit help page
  { path: 'edit-menu-type/:id', component: EditMenuTypeComponent, canActivate:[AuthGuard]},//edit menu type 
  { path: 'add-employee-role', component: AddEmployeeRoleComponent , canActivate:[AuthGuard]},// for add employee role
  { path: 'edit-employee-role/:id', component: EditEmployeeRoleComponent , canActivate:[AuthGuard]},//for edit employee role
  { path: 'employee-role', component: EmployeeRoleComponent , canActivate:[AuthGuard]},// for view employee role
  { path: 'menu-types', component: MenuTypesComponent , canActivate:[AuthGuard]}, // for menu page
  { path: 'add-menu-type', component: AddMenuTypeComponent, canActivate:[AuthGuard]}, //add menu type page
  { path: 'menuitems', component: MenuitemsComponent, canActivate:[AuthGuard]},//For the menu item page
  { path: 'add-menu-item',component:AddMenuItemComponent, canActivate:[AuthGuard]},//for add menu item page
  { path: 'edit-menu-item/:id', component:EditMenuItemComponent, canActivate:[AuthGuard]}, // for edit menu item page
  { path: 'employee-role',component: EmployeeRoleComponent , canActivate:[AuthGuard]},
  { path: 'food-type', component: FoodTypeComponent , canActivate:[AuthGuard]}, // for foodType page
  { path: 'menu-item-category', component: MenuItemCategoryComponent , canActivate:[AuthGuard]}, // for Menu Item Category page
  { path: 'edit-food-type/:id', component: EditFoodTypeComponent , canActivate:[AuthGuard]}, // for edit food type
  { path: 'create-food-type', component: CreateFoodTypeComponent , canActivate:[AuthGuard]},
  { path: 'edit-menu-item-category/:id', component: EditMenuItemCategoryComponent, canActivate:[AuthGuard]}, // for edit Menu Item Category page
  { path: 'create-menu-item-category', component: CreateMenuItemCategoryComponent, canActivate:[AuthGuard] },
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
  {path:'schedule-display', component: ScheduleDisplayComponent, canActivate:[AuthGuard]},
  {path:'edit-schedule/:id', component: EditScheduleComponent, canActivate:[AuthGuard]},
  {path:'add-schedule', component: AddScheduleComponent, canActivate:[AuthGuard]},
  //event details dialog
  {path:'event-details-dailog', component:EventDetailsDailogComponent, canActivate:[AuthGuard]},
 ///EVENTS
 {path:'view-events', component: ViewEventsComponent, canActivate:[AuthGuard]},
 {path:'edit-event/:id', component: EditEventComponent, canActivate:[AuthGuard]},
 {path:'add-event', component: AddEventComponent, canActivate:[AuthGuard]},
 ///ENTERTAINMENT TYPES
  {path:'entertainment-types', component: EntertainmentTypesComponent, canActivate:[AuthGuard]},
  {path:'edit-entertainment-type/:id', component: EditEntertainmentTypeComponent, canActivate:[AuthGuard]},
  {path:'add-entertainment-type', component: AddEntertainmentTypeComponent, canActivate:[AuthGuard]},
  {path: 'navbar',component: NavbarComponent , canActivate:[AuthGuard]},
  {path: 'home', component: HomeComponent , canActivate:[AuthGuard]}, // for home page
  {path:'view-suppliers', component: ViewSuppliersComponent , canActivate:[AuthGuard]}, // for View Suppliers
  {path: 'edit-supplier/:id', component: EditSupplierComponent , canActivate:[AuthGuard]},
  {path: 'add-supplier', component:AddSupplierComponent , canActivate:[AuthGuard]},
  {path:'view-suppliertypes', component: ViewSuppliertypesComponent , canActivate:[AuthGuard]},
  {path: 'add-suppliertype', component: AddSuppliertypeComponent , canActivate:[AuthGuard]},
  {path: 'edit-suppliertype/:id', component: EditSuppliertypeComponent , canActivate:[AuthGuard]},
  {path: 'view-inventorytypes', component: ViewInventorytypesComponent , canActivate:[AuthGuard]},
  {path: 'add-inventorytypes', component: AddInventorytypesComponent , canActivate:[AuthGuard]},
  {path: 'edit-inventorytype/:id', component: EditIntventorytypeComponent , canActivate:[AuthGuard]},
  {path: 'view-inventoryitems/:typeId', component: ViewInventoryitemsComponent , canActivate:[AuthGuard]},
  {path: 'add-inventoryitem', component: AddInventoryitemComponent , canActivate:[AuthGuard]},
  {path: 'edit-inventoryitem/:id', component: EditInventoryitemComponent , canActivate:[AuthGuard]},
  {path: 'selected-inventorytype', component: SelectedInventorytypeComponent , canActivate:[AuthGuard]},
  {path: 'checklist', component:ChecklistComponent , canActivate:[AuthGuard]},
  {path: 'inventory-stocktype', component: InventoryStocktypeComponent , canActivate:[AuthGuard]},
  {path: 'receive-order/:id', component:ReceiveOrderComponent , canActivate:[AuthGuard]},
  {path: 'view-orders', component:ViewOrdersComponent , canActivate:[AuthGuard]},
  { path: 'view-drink-type', component: DrinkTypeComponent  , canActivate:[AuthGuard]}, //for drink type page
  { path: 'create-drink-type', component: CreateDrinkTypeComponent  , canActivate:[AuthGuard]}, // for create drink type page
  { path: 'edit-drink-type/:id', component: EditDrinkTypeComponent  , canActivate:[AuthGuard]}, // for edit drink type page
  { path: 'view-drink', component: ViewDrinkComponent  , canActivate:[AuthGuard]}, //for drink page
  { path: 'create-drink', component: CreateDrinkComponent , canActivate:[AuthGuard] }, // for create drink page
  { path: 'edit-drink/:id', component: EditDrinkComponent , canActivate:[AuthGuard] }, // for edit drink page
  { path: 'employee',component: EmployeeComponent  , canActivate:[AuthGuard]}, // for employee report
  { path: 'inventory',component: InventoryComponent  , canActivate:[AuthGuard]}, // for inventory report
  { path: 'inventory-reconciliation',component: InventoryReconciliationComponent  , canActivate:[AuthGuard]}, // for inventory reconciliation report
  { path: 'sales',component: SalesComponent  , canActivate:[AuthGuard]}, // for sales report
  { path: 'schedule',component: ScheduleComponent  , canActivate:[AuthGuard]},
  {path: 'stock-take', component:StockTakeComponent , canActivate:[AuthGuard]},
  {path: 'stock-take-list', component:StockTakeListComponent , canActivate:[AuthGuard]},
  {path: 'write-off-stock', component:WriteOffStockComponent , canActivate:[AuthGuard]},
// for schedule
  {path:'sign-help', component: SignHelpComponent, canActivate:[AuthGuard]},
  {path:'change-help', component:  ChangeHelpComponent, canActivate:[AuthGuard]},
  {path:'login-help', component:  LoginHelpComponent, canActivate:[AuthGuard]},
  {path:'reset-help', component:  ResetHelpComponent, canActivate:[AuthGuard]},
  {path:'update-help', component:  UpdateHelpComponent, canActivate:[AuthGuard]},
  {path:'view-help', component:  ViewHelpComponent, canActivate:[AuthGuard]},
  {path:'entertainer-help', component:  EntertainerHelpComponent, canActivate:[AuthGuard]},
  {path:'booking-help', component:  BookingHelpComponent, canActivate:[AuthGuard]},
  {path:'manage-help', component:   ManageHelpComponent, canActivate:[AuthGuard]},
  {path: 'edit-itemprice/:id', component:EditItempriceComponent , canActivate:[AuthGuard]},
  {path:'entertainment-types', component: EntertainmentTypesComponent, canActivate:[AuthGuard]},
  {path:'edit-entertainment-type/:id', component: EditEntertainmentTypeComponent, canActivate:[AuthGuard]},
  {path:'add-entertainment-type', component: AddEntertainmentTypeComponent, canActivate:[AuthGuard]},
  {path:'view-suppliers', component: ViewSuppliersComponent, canActivate:[AuthGuard]}, // for View Suppliers
  {path: 'edit-supplier/:id', component: EditSupplierComponent, canActivate:[AuthGuard]},
  {path: 'add-supplier', component:AddSupplierComponent, canActivate:[AuthGuard]},
  {path:'view-suppliertypes', component: ViewSuppliertypesComponent, canActivate:[AuthGuard]},
  {path: 'add-suppliertype', component: AddSuppliertypeComponent, canActivate:[AuthGuard]},
  {path: 'edit-suppliertype/:id', component: EditSuppliertypeComponent, canActivate:[AuthGuard]},
  {path: 'view-inventorytypes', component: ViewInventorytypesComponent, canActivate:[AuthGuard]},
  {path: 'add-inventorytypes', component: AddInventorytypesComponent, canActivate:[AuthGuard]},
  {path: 'edit-inventorytype/:id', component: EditIntventorytypeComponent, canActivate:[AuthGuard]},
  {path: 'view-inventoryitems/:typeId', component: ViewInventoryitemsComponent, canActivate:[AuthGuard]},
  {path: 'add-inventoryitem', component: AddInventoryitemComponent, canActivate:[AuthGuard]},
  {path: 'edit-inventoryitem/:id', component: EditInventoryitemComponent, canActivate:[AuthGuard]},
  {path: 'selected-inventorytype', component: SelectedInventorytypeComponent, canActivate:[AuthGuard]},
  {path: 'checklist', component:ChecklistComponent, canActivate:[AuthGuard]},
  {path: 'inventory-stocktype', component: InventoryStocktypeComponent, canActivate:[AuthGuard]},
  {path: 'receive-order/:id', component:ReceiveOrderComponent, canActivate:[AuthGuard]},
  {path: 'view-orders', component:ViewOrdersComponent, canActivate:[AuthGuard]},
  { path: 'view-drink-type', component: DrinkTypeComponent , canActivate:[AuthGuard]}, //for drink type page
  { path: 'create-drink-type', component: CreateDrinkTypeComponent, canActivate:[AuthGuard] }, // for create drink type page
  { path: 'edit-drink-type/:id', component: EditDrinkTypeComponent, canActivate:[AuthGuard] }, // for edit drink type page
  { path: 'view-drink', component: ViewDrinkComponent, canActivate:[AuthGuard] }, //for drink page
  { path: 'create-drink', component: CreateDrinkComponent, canActivate:[AuthGuard] }, // for create drink page
  { path: 'edit-drink/:id', component: EditDrinkComponent, canActivate:[AuthGuard] }, // for edit drink page
  { path: 'employee',component: EmployeeComponent, canActivate:[AuthGuard] }, // for employee report
  { path: 'inventory',component: InventoryComponent, canActivate:[AuthGuard] }, // for inventory report
  { path: 'inventory-reconciliation',component: InventoryReconciliationComponent, canActivate:[AuthGuard] }, // for inventory reconciliation report
  { path: 'sales',component: SalesComponent, canActivate:[AuthGuard] }, // for sales report
  { path: 'schedule',component: ScheduleComponent, canActivate:[AuthGuard] }, // for schedule report
  { path: 'entertainer-report',component: EntertainerReportComponent, canActivate:[AuthGuard] }, // for entertainer report
  { path: 'menu-report',component: MenuReportComponent, canActivate:[AuthGuard] }, // for menu report
  { path: 'booking',component: BookingComponent , canActivate:[AuthGuard]}, // for booking report
  { path: 'supplier',component: SupplierComponent, canActivate:[AuthGuard] }, // for supplier report
  {path: 'stock-take', component:StockTakeComponent, canActivate:[AuthGuard]},
  {path: 'stock-take-list', component:StockTakeListComponent, canActivate:[AuthGuard]},
  {path: 'write-off-stock', component:WriteOffStockComponent, canActivate:[AuthGuard]},// for schedule
  {path: 'view-other-drink', component: ViewOtherDrinkComponent, canActivate:[AuthGuard]},
  {path: 'create-other-drink', component: CreateOtherDrinkComponent, canActivate:[AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }