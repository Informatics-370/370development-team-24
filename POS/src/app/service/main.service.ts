import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Login } from '../shared/login';
import { Register } from '../shared/register';
import { User } from '../shared/user';
import { MenuItem } from '../shared/menu-item.model';
import { MenuType } from '../shared/menu-type';
import { MenuItemPrice } from '../shared/menu-item-price';
import { Drink } from '../shared/drink';
import { DrinkType } from '../shared/drink-type';
import { DrinkPrice } from '../shared/drink-price';
import { KitchenOrder} from '../shared/kitchen-order';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private orderSummary: KitchenOrder | null = null;
  

  //linking to backend
  apiUrl = 'http://localhost:49991/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  //register user 
  RegisterUser(registerUser: Login){
    return this.httpClient.post(`${this.apiUrl}Authentication/Register`, registerUser, this.httpOptions)
  }


  //login user
  LoginUser(loginUser: Login){
    let user = new UserCredentials
    return this.httpClient.post<User>(`${this.apiUrl}Authentication/Login`, loginUser, this.httpOptions)
  }

  //get menu type

 GetAllMenuTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MenuType/GetAllMenuTypes`)
    .pipe(map(result => result));
  }

  GetMenuTypeById(menu_TypeId: Number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MenuType/GetMenuType/${menu_TypeId}`);
  }



  //Get Menu Item
  GetAllMenuItems() {
    return this.httpClient.get(`${this.apiUrl}MenuItems/GetAllMenuItems`)
    .pipe(map(result => result))
  }

  //get menu item prices
  GetAllMenuItemPrices(): Observable<MenuItemPrice[]>{
    return this.httpClient.get<MenuItemPrice[]>(`${this.apiUrl}MenuItem_Price/GetAllMenuItemPrices`).pipe(map(result => result))
  }

  //get a menu item price by the id
  GetAMenuItemPriceById(menuItem_PriceId: number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}MenuItem_Price/GetAMenuItemPrice/${menuItem_PriceId}`);
  }

  //get all drinks
  GetAllDrinkItems() {
    return this.httpClient.get(`${this.apiUrl}controller/GetAllDrinks`)
    .pipe(map(result => result))
  }

  //get drink items prices
  GetAllDrinkItemPrices(): Observable<DrinkPrice[]>{
    return this.httpClient.get<DrinkPrice[]>(`${this.apiUrl}DrinkPrice/GetAllDrinkItemPrices`).pipe(map(result => result))
  }

  //get drink item prices by id 
  GetADrinkItemPriceById(drink_PriceId: number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}DrinkPrice/GetADrinkItemPrice/${drink_PriceId}`);
  }

  //get drink types
  GetAllDrinkTypes() {
    return this.httpClient.get(`${this.apiUrl}drinkTypeController/GetAllDrinkTypes`)
    .pipe(map(result => result))
  }

  //get a drink type
  GetDrinkTypeById(drink_TypeId: Number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}drinkTypeController/GetDrinkType/${drink_TypeId}`);
  }

  //get all table numbers
  GetAllTableNumbers() {
    return this.httpClient.get(`${this.apiUrl}Order/GetAllTableNumbers`)
    .pipe(map(result => result))
  }

  //save kitchen order
  SaveKitchenOrder(kitchenOrder: KitchenOrder): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}Order/SaveKitchenOrder`, kitchenOrder);
  }

  

  //get all kitchen orders
  //get all kitchen orders
//get all kitchen orders
  getAllKitchenOrders(): Observable<KitchenOrder[]> {
  return this.httpClient.get<KitchenOrder[]>(`${this.apiUrl}Order/GetAllKitchenOrders`);
  }



  //get Vat by Id
  GetVatItemById(vatId: Number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Order/GetVatItem/${vatId}`);
  }

  //get Discount by Id
  GetDiscountItemById(discountId: Number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Order/GetDiscountItem/${discountId}`);
  }

  setOrderSummary(orderSummary: KitchenOrder) {
    this.orderSummary = orderSummary;
  }

  getOrderSummary(): KitchenOrder | null {
    return this.orderSummary;
  }

  clearOrderSummary() {
    this.orderSummary = null;
  }





}

//user credentials class
class UserCredentials{
  EmailAddress:string = 'Addyouremailaddresshere';
  Password:string = 'Addyourpasswordhere'
}
