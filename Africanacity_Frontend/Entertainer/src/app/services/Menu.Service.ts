import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { MenuItem } from '../models/menu-item';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  

  apiUrl = 'https://localhost:49991/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
    }
    GetMenuByBarcode(barcode: string): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}MenuItems/MenuItemListing?barcode=${barcode}`);
    }

    /********************************MENU ITEM******************************/
    //GET MENU ITEMS
    getAllMenuItems(): Observable<any>{
        return this.httpClient.get(`${this.apiUrl}MenuItems/MenuItemListing`)
        .pipe(map(result => result));
      }
    
       // Generate QR code
  generateQRCode(data: string): string {
    const qr = require('qrcode-generator');
    const typeNumber = 0; // Automatic QR code type
    const errorCorrectionLevel = 'L'; // Low error correction level
    const qrCode = qr(typeNumber, errorCorrectionLevel);
    qrCode.addData(data);
    qrCode.make();
    return qrCode.createDataURL();
  }
  
  GetMenuItemPrice(MenuItemId: number) {
    return this.httpClient.get<any>(`${this.apiUrl}MenuItems/GetMenuItemPrice/${MenuItemId}`);
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
  
}