import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './login/otp/otp.component';
import { RegisterComponent } from './login/register/register.component';

// routing for pages

import { HomeComponent } from './administration/home/home.component'; // for home page
import { MenuComponent } from './administration/menu/menu.component'; // for menu page
import { FoodTypeComponent } from './administration/Food Type/view-food-type/food-type.component'; // for food type page
import { MenuItemCategoryComponent } from './administration/Menu Item Category/view-menu-item-category/menu-item-category.component'; // for menu item category page
import { EditFoodTypeComponent } from './administration/Food Type/edit-food-type/edit-food-type.component';
import { CreateFoodTypeComponent } from './administration/Food Type/create-food-type/create-food-type.component';
//import { EditMenuItemCategoryComponent } from './administration/Menu Item Category/edit-menu-item-category/edit-menu-item-category.component';
//import { CreateMenuItemCategoryComponent } from './administration/Menu Item Category/create-menu-item-category/create-menu-item-category.component';

const routes: Routes = [
  // to open the app to open on this specific page

  { path: 'home', component: HomeComponent }, // for home page
  { path: 'menu', component: MenuComponent }, // for menu page
  { path: 'food-type', component: FoodTypeComponent }, // for foodType page
  { path: 'menu-item-category', component: MenuItemCategoryComponent }, // for Menu Item Category page
  { path: 'edit-food-type/:id', component: EditFoodTypeComponent }, // for edit food type
  { path: 'create-food-type', component: CreateFoodTypeComponent },
  { path: 'edit-menu-item-category/:id', component: EditFoodTypeComponent }, // for edit Menu Item Category page
  { path: 'create-menu-item-category', component: CreateFoodTypeComponent },
    
  {
    path: '',
    component: FoodTypeComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'otp',
   component:OtpComponent
  },
   {
    path: 'register', 
   component:RegisterComponent
  },
  // /*{path: '', 
  // redirectTo: 'login', pathMatch:'full'}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }