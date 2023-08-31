import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
import { SignUp } from '../shared/sign-up';
import{ map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private orderSummary: KitchenOrder | null = null;
  private notificationSubject = new Subject<string>();
  public notification$ = this.notificationSubject.asObservable()
  
  

  //linking to backend
  apiUrl = 'https://localhost:49991/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }


  //Sign up user
  /*signUp(username: string, email_address: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/EmployeeAppSignUp/SignUp`
    const body = {
      username: username,
      email_address: email_address,
      password: password
    };
return this.httpClient.post(url, body);
  }*/

  signUp(signUpData: SignUp): Observable<any> {
    // Send a POST request to the sign-up endpoint with the sign-up data
    return this.httpClient.post(`${this.apiUrl}EmployeeAppSignUp/SignUp`, signUpData,{responseType: 'text'}).pipe(
      map((response: string) =>{
        return response;
      })
    );
  }

  async login(credentials: { username: string; password: string }) {
    const url = `${this.apiUrl}EmployeeAppSignUp/IonicAppLogin`;

    // Send a POST request to your server with the user's credentials
    return this.httpClient.post<any>(url, credentials).toPromise();
  }





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
    return this.httpClient.get(`${this.apiUrl}OtherDrink/GetAllDrinks`)
    .pipe(map(result => result))
  }

  //get drink items prices
  GetAllDrinkItemPrices(): Observable<DrinkPrice[]>{
    return this.httpClient.get<DrinkPrice[]>(`${this.apiUrl}OtherDrink/GetAllDrinkItemPrices`).pipe(map(result => result))
  }

  //get drink item prices by id 
  GetADrinkItemPriceById(otherDrinkPriceId: number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}OtherDrink/GetADrinkItemPrice/${otherDrinkPriceId}`);
  }

  //get drink types
  GetAllDrinkTypes() {
    return this.httpClient.get(`${this.apiUrl}DrinkType/GetAllDrinkTypes`)
    .pipe(map(result => result))
  }

  //get a drink type
  GetDrinkTypeById(drink_TypeId: Number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}DrinkType/GetDrinkType/${drink_TypeId}`);
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
 



  //get Vat by Id
  GetVatItemById(vatId: number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Vat/GetAVatPercentage/${vatId}`);
  }

  //get Discount by Id
  GetDiscountItemById(discountId: number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Discount/GetADiscountPercentage/${discountId}`);
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

 ///add kitchen order 
 addKitchenOrder(
  tableNumber: string | null,
  kitchenOrderNumber: string,
  subtotal: number,
  vat: number,
  discount: number,
  total: number,
  orderedMenuItems: { menuItemId: number; quantity: number }[],
  orderedDrinks: { otherDrinkId: number; quantity: number }[],
  orderMenuItemDtos: { menuItemId: number; quantity: number }[],
  orderDrinkDtos: { otherDrinkId: number; quantity: number }[]
): Promise<void> {
  // Prepare the data to send to the backend
  if (!orderMenuItemDtos) {
    orderMenuItemDtos = [];
  }
  if (!orderDrinkDtos) {
    orderDrinkDtos = [];
  }
  const orderData = {
    tableNumber,
    kitchenOrderNumber,
    subtotal,
    vat,
    discount,
    total,
    orderedMenuItems,
    orderedDrinks,
    orderMenuItemDtos, // Include an empty array for orderMenuItemDtos
    orderDrinkDtos, // Include an empty array for orderDrinkDtos
    

  };

  // Send a POST request to the backend API to save the order
  return this.httpClient
    .post<void>(`${this.apiUrl}Order/AddKitchenOrder`, orderData)
    .toPromise();
}


  // Method to get a specific kitchen order by ID
  getKitchenOrderById(kitchenOrderId: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}Order/GetKitchenOrderById/${kitchenOrderId}`);
  }

  // Method to update a kitchen order
  updateKitchenOrder(kitchenOrderId: number, kitchenOrderData: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}Order/UpdateKitchenOrder/${kitchenOrderId}`, kitchenOrderData);
  }


  //get all kitchen orders
  getAllKitchenOrders(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}Order/GetAllKitchenOrders`);
  }

  //Get all ordered menu items
  GetAllOrderedMenuItems(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Order/GetAllOrderedMenuItems`).pipe(map(result=> result))
  }

  GetAllOrderedDrinksItems(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Order/GetAllOrderedDrinksItems`).pipe(map(result=> result))
  }






}

//user credentials class
class UserCredentials{
  EmailAddress:string = 'Addyouremailaddresshere';
  Password:string = 'Addyourpasswordhere'
}
