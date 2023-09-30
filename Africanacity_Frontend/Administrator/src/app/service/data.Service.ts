import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { LoginUser } from '../shared/login-user';
import { User } from '../shared/user';
import { Employee_Role} from '../shared/EmployeeRole';
import { MenuTypes } from '../shared/menu-types'; //Menu Types
import { MenuItem } from '../shared/menu-item';
import { FoodType } from '../shared/food-type';
import { MenuItemCategory } from '../shared/menu-item-category';
import { Schedule } from '../shared/schedule';
import { BookingEvent } from '../shared/bookingevent';
import { Entertainment_Type } from '../shared/entertainmentType';
import { DrinkType } from '../shared/Drink_Type';
import { Drink } from '../shared/Drink';
import { EventInput } from '@fullcalendar/core';
import { KitchenOrder } from '../shared/Kitchen_Order';
import { Discount } from '../shared/Discount';
import { VAT } from '../shared/Vat';
import { OtherDrink } from '../shared/other-drink';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  apiUrl = 'https://localhost:49991/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }
  private calendarEventsSubject = new BehaviorSubject<EventInput[]>([]);
  calendarEvents$ = this.calendarEventsSubject.asObservable();

  constructor(private httpClient: HttpClient) {   
  }
  updateCalendarEvents(newEvents: EventInput[]) {
    this.calendarEventsSubject.next(newEvents);
  }
// Register user
  RegisterUser(registerUser: LoginUser){
    return this.httpClient.post(`${this.apiUrl}Authentication/Register`, registerUser, this.httpOptions)
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
      return this.httpClient.get(`${this.apiUrl}MenuItems/MenuItemListing`)
      .pipe(map(result => result));
    }
  
  
    //fetch menu item food
    GetMenuItemById(menuItemId: number): Observable<any>{
      return this.httpClient.get(`${this.apiUrl}MenuItems/GetMenuItem/${menuItemId}`);
    }

    //add a new menu item
  addMenuItem(file:FormData, amount: number){
    return this.httpClient.post(`${this.apiUrl}MenuItems/AddMenuItem`, file)
  }

  //edit menu item
  editMenuItem(MenuItemId: number, menuItem: MenuItem): Observable<MenuItem> {
    return this.httpClient.put<MenuItem>(`${this.apiUrl}MenuItems/EditMenuItem/${MenuItemId}`, menuItem,this.httpOptions);
  }

  editMenuItemWithPrice(menuItemId: number, updatedMenuItem: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/EditMenuItemWithPrice/${menuItemId}`, {updatedMenuItem});
  }



  
    /*Delete Menu type*/
    deleteMenuItem(menu_ItemId: Number){
      return this.httpClient.delete<string>(`${this.apiUrl}MenuItems/DeleteMenuItem` + "/" + menu_ItemId, this.httpOptions)
    }

    GetMenuItemPrice(MenuItemId: number) {
      return this.httpClient.get<any>(`${this.apiUrl}MenuItems/GetMenuItemPrice/${MenuItemId}`);
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
      return this.httpClient.get(`${this.apiUrl}FoodType/GetAllFoodTypes`).pipe(map(result => result)) 
    }
  
    GetFoodType(foodTypeId: number)
    {
      return this.httpClient.get(`${this.apiUrl}FoodType/GetFoodType` + "/" + foodTypeId).pipe(map(result => result))
    }
  
    AddFoodType(foodType : FoodType)
    {
      return this.httpClient.post(`${this.apiUrl}FoodType/AddFoodType`, foodType, this.httpOptions)
    }
  
    EditFoodType(foodTypeId: number, foodType: FoodType)
    {
      return this.httpClient.put(`${this.apiUrl}FoodType/EditFoodType/${foodTypeId}`, foodType, this.httpOptions)
    }
  
    DeleteFoodType(foodTypeId: number)
    {
      return this.httpClient.delete<string>(`${this.apiUrl}FoodType/DeleteFoodType` + "/" + foodTypeId, this.httpOptions)
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
  /******************************SCHEDULE**********************/
  //Get All Schedules
  ScheduleDisplay(): Observable<any>
  {
    return this.httpClient.get(`${this.apiUrl}Schedule/ScheduleDisplay`)
    .pipe(map(results => results))
  }
  
  GetSchedule(scheduleId: number) {
    return this.httpClient.get<any>(`${this.apiUrl}Schedule/GetSchedule/${scheduleId}`).pipe(map(result => result));
  }
  
  
  

  //Unati
  GetAllDrinkTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}DrinkType/GetAllDrinkTypes`)
    .pipe(map(result => result));
  }

  GetDrinkType(drinkTypeId: number)
  {
    return this.httpClient.get(`${this.apiUrl}DrinkType/GetDrinkType` + "/" + drinkTypeId).pipe(map(result => result))
  }

  AddDrinkType(drinkType : DrinkType)
  {
    return this.httpClient.post(`${this.apiUrl}DrinkType/AddDrinkType`, drinkType, this.httpOptions)
  }

  EditDrinkType(drinkTypeId: number, drinkType: DrinkType)
  {
    return this.httpClient.put(`${this.apiUrl}DrinkType/EditDrinkType/${drinkTypeId}`, drinkType, this.httpOptions)
  }

  DeleteDrinkType(drinkTypeId: number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}DrinkType/DeleteDrinkType` + "/" + drinkTypeId, this.httpOptions)
  }

  // drink 
  /*GetAllDrinks(): Observable<any>
  {
    return this.httpClient.get(`${this.apiUrl}controller/DrinkItemListing`).pipe(map(result => result)) 
  }*/

  GetDrink(drinkId: number): Observable<any>
  {
    return this.httpClient.get(`${this.apiUrl}controller/GetDrink/${drinkId}`);
  }

  /*AddDrink(drink: Drink)
  {
    return this.httpClient.post(`${this.apiUrl}controller/AddDrink`, drink, this.httpOptions)
  }*/

  EditDrink(drinkId: number, drink: Drink)
  {
    return this.httpClient.put(`${this.apiUrl}controller/EditDrink/${drinkId}`, drink, this.httpOptions)
  }

  DeleteDrink(drinkId: number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}controller/DeleteDrink` + "/" + drinkId, this.httpOptions)
  }


  

 // KITCHEN ORDER METHODS

   /********************************OTHER DRINK******************************/
    
    GetAllDrinks(): Observable<any>{
      return this.httpClient.get(`${this.apiUrl}OtherDrink/DrinkItemListing`)
      .pipe(map(result => result));
    }
 private orderSummary: KitchenOrder | null = null;

 GetDrinkItemById(otherDrinkId: number): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}OtherDrink/GetDrinkItem/${otherDrinkId}`);
}

editDrinkItem(OtherDrinkId: number, drinkItem: OtherDrink): Observable<OtherDrink> {
  return this.httpClient.put<OtherDrink>(`${this.apiUrl}OtherDrink/EditDrinkPrice/${OtherDrinkId}`, drinkItem,this.httpOptions);
}

 //get all table numbers
  GetAllTableNumbers() {
    return this.httpClient.get(`${this.apiUrl}Order/GetAllTableNumbers`)
    .pipe(map(result => result))
  }

    //add a new menu item
  AddDrink(file:FormData, amount: number){
    return this.httpClient.post(`${this.apiUrl}OtherDrink/AddDrinkItem`, file)
  }


AddSchedule(schedule: Schedule)
{
   return this.httpClient.post(`${this.apiUrl}Schedule/AddSchedule`, schedule, this.httpOptions)
}


// EditSchedule(scheduleId: number, schedule: FormData): Observable<any> {
//   const url = `${this.apiUrl}Schedule/EditSchedule/${scheduleId}`;
//   return this.httpClient.put(url, schedule);
// }

EditSchedule(scheduleId: number, schedule: Schedule)
{
  return this.httpClient.put(`${this.apiUrl}Schedule/EditSchedule/${scheduleId}`, schedule, this.httpOptions)
}

RemoveSchedule(scheduleId: Number)
{
  return this.httpClient.delete<string>(`${this.apiUrl}Schedule/RemoveSchedule` + "/" + scheduleId, this.httpOptions)
}

/************************************EVENTS******************************/
GetAllEvents(): Observable<any>
{
  return this.httpClient.get(`${this.apiUrl}Event/GetAllEvents`)
  .pipe(map(results => results))
}

// GetAllScheduleStatus(): Observable<any>
// {
//   return this.httpClient.get(`${this.apiUrl}Schedule/GetAllScheduleStatus`)
//   .pipe(map(results => results))
// }
GetEvent(eventId: Number)
{
  return this.httpClient.get(`${this.apiUrl}Event/GetEvent` + "/" + eventId).pipe(map(result => result))
}


AddNewEvent(file:FormData){
    
  return this.httpClient.post(`${this.apiUrl}Event/AddNewEvent`, file)
}

// EditEvent(eventId: Number, bookingevent: BookingEvent)
// {
//   return this.httpClient.put(`${this.apiUrl}Event/EditEvent/${eventId}`, bookingevent, this.httpOptions)
// }
EditEvent(eventId: number, bookingevent: FormData) {
  const url = `${this.apiUrl}Event/EditEvent/${eventId}`;
   return this.httpClient.put(url, bookingevent);
  }

DeleteEvent(eventId: Number)
{
  return this.httpClient.delete<string>(`${this.apiUrl}Event/DeleteEvent` + "/" + eventId, this.httpOptions)
}

/*******************ENTERTAINMENT TYPE********************/
GetEntertainmentTypes(): Observable<any>
{
  return this.httpClient.get(`${this.apiUrl}EntertainmentType/GetEntertainmentTypes`)
  .pipe(map(results => results))
}

GetEntertainmentType(entertainment_TypeId: Number)
{
  return this.httpClient.get(`${this.apiUrl}EntertainmentType/GetEntertainmentType` + "/" + entertainment_TypeId).pipe(map(result => result))
}

AddEntertainmentType(entertainmentType : Entertainment_Type)
{
  return this.httpClient.post(`${this.apiUrl}EntertainmentType/AddEntertainmentType`, entertainmentType, this.httpOptions)
}

EditEntertainmentType(entertainment_TypeId: Number, entertainmentType: Entertainment_Type)
{
  return this.httpClient.put(`${this.apiUrl}EntertainmentType/EditEntertainmentType/${entertainment_TypeId}`, entertainmentType, this.httpOptions)
}

DeleteEntertainmentType(entertainment_TypeId: Number)
{
  return this.httpClient.delete<string>(`${this.apiUrl}EntertainmentType/DeleteEntertainmentType` + "/" + entertainment_TypeId, this.httpOptions)
}

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
  /////////////////////////////////////DISCOUNT//////////////////////////////
  GetAllDiscountPercentages(): Observable<any>
{
  return this.httpClient.get(`${this.apiUrl}Discount/GetAllDiscountPercentages`)
  .pipe(map(results => results))
}

GetADiscountPercentage(discountId: Number)
{
  return this.httpClient.get(`${this.apiUrl}Discount/GetADiscountPercentage` + "/" + discountId).pipe(map(result => result))
}

AddADiscountPercentage(Discount : Discount)
{
  return this.httpClient.post(`${this.apiUrl}Discount/AddADiscountPercentage`, Discount, this.httpOptions)
}

EditADiscountPercentage(discountId: Number, Discount: Discount)
{
  return this.httpClient.put(`${this.apiUrl}Discount/EditADiscountPercentage/${discountId}`, Discount, this.httpOptions)
}

DeleteADiscountPercentage(discountId: Number)
{
  return this.httpClient.delete<string>(`${this.apiUrl}Discount/DeleteADiscountPercentage` + "/" + discountId, this.httpOptions)
}

//////////////VAT///////////
GetAllVatPercentages(): Observable<any>
{
  return this.httpClient.get(`${this.apiUrl}Vat/GetAllVatPercentages`)
  .pipe(map(results => results))
}

GetAVatPercentage(vatId: Number)
{
  return this.httpClient.get(`${this.apiUrl}Vat/GetAVatPercentage` + "/" + vatId).pipe(map(result => result))
}

AddAVatPercentage(vat : VAT)
{
  return this.httpClient.post(`${this.apiUrl}Vat/AddAVatPercentage`, vat, this.httpOptions)
}
}
