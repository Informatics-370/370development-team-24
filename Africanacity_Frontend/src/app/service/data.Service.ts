import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { LoginUser } from '../shared/login-user';
import { RegisterUser } from '../shared/register-user';
import { User } from '../shared/user';
import { FoodType } from '../shared/food-type';
import { MenuItemCategory } from '../shared/menu-item-category';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  apiUrl = 'http://localhost:4002/api/' //'https://localhost:4002/swagger/index.html'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {   
  }

  RegisterUser(registerUser: RegisterUser){
    return this.httpClient.post(`${this.apiUrl}Authentication/Register`, registerUser, this.httpOptions)
  }

  LoginUser(loginUser: LoginUser){
    return this.httpClient.post<User>(`${this.apiUrl}Authentication/Login`, loginUser, this.httpOptions)
  }

  ValidateOtp(user: User){
    return this.httpClient.post(`${this.apiUrl}Authentication/Otp`, user, this.httpOptions)
  }

  // food type
  GetAllFoodTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}foodTypeController/GetAllFoodTypes`).pipe(map(result => result)) 
  }

  GetFoodType(foodTypeId: number)
  {
    return this.httpClient.get(`${this.apiUrl}foodTypeController/GetFoodType` + "/" + foodTypeId).pipe(map(result => result))
  }

  AddFoodType(foodType : FoodType)
  {
    return this.httpClient.post(`${this.apiUrl}foodTypeController/AddFoodType`, foodType, this.httpOptions)
  }

  EditFoodType(foodTypeId: number, foodType: FoodType)
  {
    return this.httpClient.put(`${this.apiUrl}foodTypeController/EditFoodType/${foodTypeId}`, foodType, this.httpOptions)
  }

  DeleteFoodType(foodTypeId: number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}foodTypeController/DeleteFoodType` + "/" + foodTypeId, this.httpOptions)
  }

  // menu item category
  GetAllMenuItemCategories(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MenuItemCategoryController/GetAllMenuItemCategories`).pipe(map(result => result)) 
  }

  GetMenuItemCategory(MenuItemCategoryId: number)
  {
    return this.httpClient.get(`${this.apiUrl}MenuItemCategoryController/GetMenuItemCategory` + "/" + MenuItemCategoryId).pipe(map(result => result))
  }

  AddMenuItemCategory(menuItemCategory : MenuItemCategory)
  {
    return this.httpClient.post(`${this.apiUrl}MenuItemCategoryController/AddMenuItemCategory`, MenuItemCategory, this.httpOptions)
  }

  EditMenuItemCategory(MenuItemCategoryId: number, menuItemCategory: MenuItemCategory)
  {
    return this.httpClient.put(`${this.apiUrl}MenuItemCategoryController/EditMenuItemCategory/${MenuItemCategoryId}`, MenuItemCategory, this.httpOptions)
  }

  DeleteMenuItemCategory(MenuItemCategoryId: number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}MenuItemCategoryController/DeleteMenuItemCategory` + "/" + MenuItemCategoryId, this.httpOptions)
  }

}
