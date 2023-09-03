import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItemPrice } from '../shared/MenuItemPrice';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
    
  baseUrl = 'https://localhost:49991/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  getAllMenuItemPrices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}MenuItem_Price/GetAllMenuItemPrices`);
  }

  getAMenuItemPrice(MenuItem_PriceId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}MenuItem_Price/GetAMenuItemPrice/${MenuItem_PriceId}`);
  }

  addMenuItemPrice(menuItemPriceViewModel: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}MenuItem_Price/AddMenuItemPrice`, menuItemPriceViewModel);
  }

//   // Update a specific menu item's price
// editMenuItemPrice(menuItemPrice: MenuItemPrice): Observable<MenuItemPrice> {
//     return this.http.put<MenuItemPrice>(`${this.baseUrl}/EditMenuItemPrice/${menuItemPrice.menuItemPrice_Id}`, menuItemPrice);
//   }
  
editMenuItemPrice(menuItem_PriceId: number, menuItemPriceViewModel: any): Observable<any> {
    // Ensure that 'MenuItem_PriceId' is included in the request body
    menuItemPriceViewModel.MenuItem_PriceId = menuItem_PriceId;
  
    return this.http.put<any>(`${this.baseUrl}MenuItem_Price/EditMenuItemPrice/${menuItem_PriceId}`, menuItemPriceViewModel);
  }
  
  deleteMenuItemPrice(MenuItem_PriceId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}MenuItem_Price/DeleteMenuItemPrice/${MenuItem_PriceId}`);
  }




  //for drink
  getAllDrinkItemPrices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}OtherDrink/ GetAllDrinkItemPrices`);
  }

  getADrinkItemPrice(otherDrinkPriceId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}OtherDrink/GetADrinkItemPrice/${otherDrinkPriceId}`);
  }

  addDrinkPrice(drinkPriceViewModel: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}OtherDrink/AddDrinkPrice`, drinkPriceViewModel);
  }

//   // Update a specific menu item's price
// editMenuItemPrice(menuItemPrice: MenuItemPrice): Observable<MenuItemPrice> {
//     return this.http.put<MenuItemPrice>(`${this.baseUrl}/EditMenuItemPrice/${menuItemPrice.menuItemPrice_Id}`, menuItemPrice);
//   }
  
editDrinkItemPrice(otherDrinkPriceId: number, drinkPriceViewModel: any): Observable<any> {
    // Ensure that 'MenuItem_PriceId' is included in the request body
    drinkPriceViewModel.otherDrinkPriceId = otherDrinkPriceId;
  
    return this.http.put<any>(`${this.baseUrl}OtherDrink/EditDrinkPrice/${otherDrinkPriceId}`, drinkPriceViewModel);
  }
  
  deleteDrinkPrice(OtherDrinkPriceId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}OtherDrink/DeleteDrinkPrice/${OtherDrinkPriceId}`);
  }
}
