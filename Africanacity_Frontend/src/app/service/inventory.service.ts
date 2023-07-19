import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { InventoryType } from '../shared/inventorytype';
import { InventoryItem } from '../shared/inventoryitem';

@Injectable({
    providedIn: 'root'
  })
  export class InventoryService {
  
    apiUrl = 'http://localhost:49991/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }

    constructor(private httpClient: HttpClient) { 
    }
    //Get All Inventory Items
    GetAllInventoryItems(): Observable<any>{
        return this.httpClient.get(`${this.apiUrl}InventoryItem/GetAllInventoryItems`)
        .pipe(map(result => result))
      }

      GetInventoryItem(inventory_ItemId: number) {
        return this.httpClient.get(`${this.apiUrl}InventoryItem/GetInventoryItem` + "/" + inventory_ItemId)
        .pipe(map(result => result))
      }

      DeleteInventoryItem(inventory_ItemId: Number)
      {
        return this.httpClient.delete<string>(`${this.apiUrl}InventoryItem/DeleteInventoryItem` + "/" + inventory_ItemId, this.httpOptions)
      }

      // EditSupplier(supplierId: Number, supplier: Supplier)
      // {
      //   return this.httpClient.put(`${this.apiUrl}Supplier/EditSupplier/${supplierId}`,supplier, this.httpOptions)
      // }

      EditInventoryItem(inventory_ItemId: number, inventoryitem: InventoryItem): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this.httpClient.put(`${this.apiUrl}InventoryItem/EditInventoryItem/${inventory_ItemId}`, inventoryitem, httpOptions);
      }

      AddInventoryItem(inventoryitem: InventoryItem) {
        return this.httpClient.post(`${this.apiUrl}InventoryItem/AddInventoryItem`, inventoryitem, this.httpOptions)
          .pipe(
            catchError(error => {
              console.error('Error adding inventory item:', error);
              return throwError(error);
            })
          );
      }


    // Get Supplier Types

    GetAllInventoryTypes(): Observable<any>{
      return this.httpClient.get(`${this.apiUrl}InventoryType/GetAllInventoryTypes`)
      .pipe(map(result => result))
    }
    

    GetInventoryType(inventory_TypeId: Number) {
      return this.httpClient.get(`${this.apiUrl}InventoryType/GetInventoryType` + "/" + inventory_TypeId)
      .pipe(map(result => result))
    }
    
    DeleteInventoryType(inventory_TypeId: Number)
    {
      return this.httpClient.delete<string>(`${this.apiUrl}InventoryType/DeleteInventoryType` + "/" + inventory_TypeId, this.httpOptions)
    }

    EditInventoryType(inventory_TypeId: number, inventorytype: InventoryType)
    {
      return this.httpClient.put(`${this.apiUrl}InventoryType/EditInventoryType/${inventory_TypeId}`,inventorytype, this.httpOptions)
    }

    AddInventoryType(inventorytype: InventoryType)
    {
       return this.httpClient.post(`${this.apiUrl}InventoryType/AddInventoryType`, inventorytype, this.httpOptions)
    }
  
    GetInventoryItemsByType(inventory_TypeId: number): Observable<InventoryItem[]> {
      return this.httpClient.get<InventoryItem[]>(`${this.apiUrl}InventoryItem/items/${inventory_TypeId}`)
        .pipe(
          catchError(error => {
            console.error('Error retrieving inventory items:', error);
            return throwError(error);
          })
        );
    }
    
}