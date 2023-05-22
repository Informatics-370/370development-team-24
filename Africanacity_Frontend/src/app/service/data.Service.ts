import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginUser } from '../shared/login-user';
import { RegisterUser } from '../shared/register-user';
import { User } from '../shared/user';
import { MenuTypes } from '../shared/menu-types'; //Menu Types
import { MenuItem } from '../shared/menu-item';

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

  RegisterUser(registerUser: RegisterUser){
    return this.httpClient.post(`${this.apiUrl}Authentication/Register`, registerUser, this.httpOptions)
  }

  LoginUser(loginUser: LoginUser){
    return this.httpClient.post<User>(`${this.apiUrl}Authentication/Login`, loginUser, this.httpOptions)
  }

  ValidateOtp(user: User){
    return this.httpClient.post(`${this.apiUrl}Authentication/Otp`, user, this.httpOptions)
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
    return this.httpClient.delete<string>(`${this.apiUrl}MenuType/DeleteMenuType` + "/" + menu_TypeId, this.httpOptions)
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


  /******************FOOD TYPE**************/

  GetAllFoodTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}FoodType/GetAllFoodTypes`)
    .pipe(map(result => result));
  }


  // fetch food type name
  GetFoodTypeById(foodTypeId: Number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}foodTypeController/GetFoodType/${foodTypeId}`);
  }

  /********** MENU CATEGORY***************/
  GetAllMenuItemCategories(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MenuItem_Category/GetAllMenuItemCategories`)
    .pipe(map(result => result));
  }


  // fetch food type name
  GetMenuItemCategoryById(menuItemCategory_Id: Number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MenuItem_Category/GetMenuItemCategory/${menuItemCategory_Id}`);
  }

}
