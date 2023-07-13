import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { User } from '../shared/user';
import { Employee_Role} from '../shared/EmployeeRole';
import { MenuTypes } from '../shared/menu-types'; //Menu Types
import { MenuItem } from '../shared/menu-item';
import { FoodType } from '../shared/food-type';
import { LoginUser } from '../shared/login-user';
import { MenuItemCategory } from '../shared/menu-item-category';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  apiUrl = 'http://localhost:49991/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {   
  }
// Register user
  RegisterUser(registerUser: LoginUser){
    return this.httpClient.post(`${this.apiUrl}Authentication/Register`, registerUser, this.httpOptions)
  }

  //Login user
  LoginUser(loginUser: LoginUser){
    let user = new UserCredentials
    return this.httpClient.post<User>(`${this.apiUrl}Authentication/Login`, loginUser, this.httpOptions)
  }


//Change user password
   ChangePassword(loginUser: LoginUser){
    let user = new UserCredentials
    return this.httpClient.post<User>(`${this.apiUrl}Authentication/Forgotpassword`, loginUser, this.httpOptions)
  }
  
// Generate otp 
  ValidateOtp(user: User){
    return this.httpClient.post(`${this.apiUrl}Authentication/Otp`, user, this.httpOptions)
  }

  //Code Related to employee role
  GetEmployeeRole(employee_RoleId: number) {
    return this.httpClient.get(`${this.apiUrl}EmployeeRole/GetEmployeeRole` + "/" + employee_RoleId)
    .pipe(map(result => result))
  }

  GetAllEmployeeRoles(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}EmployeeRole/GetAllEmployeeRoles`)
    .pipe(map(results => results))
    
  }

  AddEmployeeRole(employeeRole: Employee_Role)
  {
    return this.httpClient.post(`${this.apiUrl}EmployeeRole/AddEmployeeRole`, employeeRole, this.httpOptions)
  }

  DeleteEmployeeRole(employee_RoleId: Number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}EmployeeRole/DeleteEmployeeRole` + "/" + employee_RoleId, this.httpOptions)
  }

  EditEmployeeRole(employee_RoleId: number, employeeRole: Employee_Role)
  {
    return this.httpClient.put(`${this.apiUrl}EmployeeRole/EditEmployeeRole/${employee_RoleId}`,employeeRole, this.httpOptions)
  }
  /***************Menu Types************/

  //Create menu type
  AddMenuType(menuType: MenuTypes){
    return this.httpClient.post(`${this.apiUrl}MenuType/AddMenuType`,menuType);
  }

  GetAllMenuTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MenuType/GetAllMenuTypes`)
    .pipe(map(result => result));
  }


  //Edit menu type
  GetMenuTypeById(menu_TypeId: Number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MenuType/GetMenuType/${menu_TypeId}`);
  }

  
        //Update function
  EditMenuType(Menu_TypeId:Number, menuType:MenuTypes){
    //send put request to update a single course
    // return this.httpClient.put(this.apiUrl + 'MenuType/EditMenuType/' + menu_TypeId,menuType);
    return this.httpClient.put(`${this.apiUrl}MenuType/EditMenuType/${Menu_TypeId}`, menuType, this.httpOptions);
    console.log();
  }

  //Delete Menu type
  deleteMenuType(menu_TypeId: Number){
    return this.httpClient.delete<string>(`${this.apiUrl}MenuType/DeleteMenuType` + "/" + menu_TypeId, this.httpOptions);
  }



  /********************************MENU ITEM******************************/
  //GET MENU ITEMS
  GetAllMenuItems(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MenuItems/GetAllMenuItems`)
    .pipe(map(result => result));
  }


  //fetch menu item food
  GetMenuItemById(menu_ItemId: Number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MenuItems/GetMenuItem/${menu_ItemId}`);
  }

  /*Delete Menu type*/
  deleteMenuItem(menu_ItemId: Number){
    return this.httpClient.delete<string>(`${this.apiUrl}MenuItems/DeleteMenuItem` + "/" + menu_ItemId, this.httpOptions)
  }


  /******************FOOD TYPE**************/

  // GetAllFoodTypes(): Observable<any>{
  //   return this.httpClient.get(`${this.apiUrl}FoodType/GetAllFoodTypes`)
  //   .pipe(map(result => result));
  // }


  // fetch food type name
  // GetFoodTypeById(foodTypeId: Number): Observable<any>{
  //   return this.httpClient.get(`${this.apiUrl}foodTypeController/GetFoodType/${foodTypeId}`);
  // }

  /********** MENU CATEGORY***************/
  // GetAllMenuItemCategories(): Observable<any>{
  //   return this.httpClient.get(`${this.apiUrl}MenuItem_Category/GetAllMenuItemCategories`)
  //   .pipe(map(result => result));
  // }

  // fetch food type name
  // GetMenuItemCategoryById(menuItemCategory_Id: Number): Observable<any>{
  //   return this.httpClient.get(`${this.apiUrl}MenuItem_Category/GetMenuItemCategory/${menuItemCategory_Id}`);
  // }
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
    return this.httpClient.get(`${this.apiUrl}MenuItem_Category/GetAllMenuItemCategories`).pipe(map(result => result)) 
  }

  GetMenuItemCategory(menu_CategoryId: number)
  {
    return this.httpClient.get(`${this.apiUrl}MenuItem_Category/GetMenuItemCategory/${menu_CategoryId}`);
    //return this.httpClient.get(`${this.apiUrl}MenuItem_Category/GetMenuItemCategory` + "/" + Menu_CategoryId) //.pipe(map(result => result))
  }

  AddMenuItemCategory(menuItemCategory : MenuItemCategory)
  {
    return this.httpClient.post(`${this.apiUrl}MenuItem_Category/AddMenuItemCategory`, menuItemCategory, this.httpOptions)
  }

  EditMenuItemCategory(menu_CategoryId: number, menuItemCategory: MenuItemCategory)
  {
    return this.httpClient.put(`${this.apiUrl}MenuItem_Category/EditMenuItemCategory/${menu_CategoryId}`, menuItemCategory, this.httpOptions)
  }

  DeleteMenuItemCategory(menu_CategoryId: number)
  {
    //return this.httpClient.delete<string>(`${this.apiUrl}MenuItem_Category/DeleteMenuItemCategory` + "/" + Menu_CategoryId, this.httpOptions)
    return this.httpClient.delete<string>(`${this.apiUrl}MenuItem_Category/DeleteMenuItemCategory` + "/" + menu_CategoryId, this.httpOptions)
  }

}

class UserCredentials  {
  EmailAddress:string = 'Addyouremailaddresshere';
  Password:string = 'Addyourpasswordhere'
   }



