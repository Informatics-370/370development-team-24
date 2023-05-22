import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './administration/home/home.component';
import { MenuComponent } from './administration/menu/menu.component';
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
import { FoodTypeComponent } from './administration/Food Type/view-food-type/food-type.component';
import { MenuItemCategoryComponent } from './administration/Menu Item Category/view-menu-item-category/menu-item-category.component';
import { EditFoodTypeComponent } from './administration/Food Type/edit-food-type/edit-food-type.component';
import { CreateFoodTypeComponent } from './administration/Food Type/create-food-type/create-food-type.component';
import { EditMenuItemCategoryComponent } from './administration/Menu Item Category/edit-menu-item-category/edit-menu-item-category/edit-menu-item-category.component';
import { CreateMenuItemCategoryComponent } from './administration/Menu Item Category/create-menu-item-category/create-menu-item-category/create-menu-item-category.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    OtpComponent,
    ForgotPasswordComponent, 
    UpdatePasswordComponent, 
   
    HomeComponent, FoodTypeComponent, MenuItemCategoryComponent, EditFoodTypeComponent, CreateFoodTypeComponent, EditMenuItemCategoryComponent, CreateMenuItemCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
