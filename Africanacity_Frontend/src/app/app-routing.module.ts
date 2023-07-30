import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './login/otp/otp.component';
import { UpdatePasswordComponent } from './login/update-password/update-password.component';
import { RegisterComponent } from './login/register/register.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { EditEmployeeRoleComponent } from './administration/EmployeeRole/edit-employee-role/edit-employee-role.component';
import { AddEmployeeRoleComponent } from './administration/EmployeeRole/add-employee-role/add-employee-role.component';
import { EmployeeRoleComponent } from './administration/EmployeeRole/employee-role/employee-role.component';
import { MenuTypesComponent } from './administration/menu-types/menu-types.component';//for menu types page
import { MenuitemsComponent } from './administration/menuitems/menuitems.component';
// routing for pages

import { HomeComponent } from './administration/home/home.component'; // for home page
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
import { DrinkTypeComponent } from './administration/Drink Type/view-drink-type/view-drink-type.component';
import { CreateDrinkTypeComponent } from './administration/Drink Type/create-drink-type/create-drink-type.component';
import { EditDrinkTypeComponent } from './administration/Drink Type/edit-drink-type/edit-drink-type.component';
import { ViewDrinkComponent } from './administration/Drink/view-drink/view-drink.component';
import { CreateDrinkComponent } from './administration/Drink/create-drink/create-drink.component';
import { EditDrinkComponent } from './administration/Drink/edit-drink/edit-drink.component';
import { EmployeeComponent } from './administration/Reports/employee/employee.component';
import { InventoryComponent } from './administration/Reports/inventory/inventory.component';
import { InventoryReconciliationComponent } from './administration/Reports/inventory-reconciliation/inventory-reconciliation.component';
import { SalesComponent } from './administration/Reports/sales/sales.component';
import { ScheduleComponent } from './administration/Reports/schedule/schedule.component';
//import { EditMenuItemCategoryComponent } from './administration/Menu Item Category/edit-menu-item-category/edit-menu-item-category.component';
//import { CreateMenuItemCategoryComponent } from './administration/Menu Item Category/create-menu-item-category/create-menu-item-category.component';

const routes: Routes = [
  // to open the app to open on this specific page

  { path: '', component: DrinkTypeComponent },
  // open on this page
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
  { path: 'employee-role',component: EmployeeRoleComponent },
  { path: 'food-type', component: FoodTypeComponent }, // for foodType page
  { path: 'menu-item-category', component: MenuItemCategoryComponent }, // for Menu Item Category page
  { path: 'edit-food-type/:id', component: EditFoodTypeComponent }, // for edit food type
  { path: 'create-food-type', component: CreateFoodTypeComponent },
  { path: 'edit-menu-item-category/:id', component: EditMenuItemCategoryComponent}, // for edit Menu Item Category page
  { path: 'create-menu-item-category', component: CreateMenuItemCategoryComponent },
  { path: 'navbar',component: NavbarComponent },
  { path: 'login',component: LoginComponent }, // Login paths
  { path: 'otp',  component: OtpComponent },  // otp path
  { path: 'register', component: RegisterComponent }, // register path
  { path: 'update-password', component: UpdatePasswordComponent }, // updatepassword path
  { path: 'forgot-password', component: ForgotPasswordComponent }, // forgotpassword path
  { path: 'reset-password',component: ResetPasswordComponent }, //resetpassword path
  { path: 'home', component: HomeComponent }, // for home page
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
  { path: 'schedule',component: ScheduleComponent }, // for schedule
  { path: '', redirectTo: 'login', pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }