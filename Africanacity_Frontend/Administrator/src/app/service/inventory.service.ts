import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { InventoryType } from '../shared/inventorytype';
import { InventoryItem } from '../shared/inventoryitem';
import { BehaviorSubject} from 'rxjs';
import { Supplier } from '../shared/supplier';
import { Supplier_Inventory } from '../shared/supplieritem';
import { StockTake } from '../shared/stocktakeitem';

@Injectable({
    providedIn: 'root'
  })
  export class InventoryService {
  
    apiUrl = 'https://localhost:49991/api/'
    private inventoryItems: InventoryItem[] = [];
    private checklistItems: InventoryItem[] = [];
    public inventoryItemsChanged$ = new Subject<InventoryItem[]>();
  
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

      UpdateInventoryItem(inventory_ItemId: number, inventoryitem: InventoryItem): Observable<any> {
    
        const updatedItemIndex = this.inventoryItems.findIndex(item => item.inventory_ItemId === inventory_ItemId);
        if (updatedItemIndex !== -1) {
          this.inventoryItems[updatedItemIndex] = inventoryitem;
          console.log('Inventory item updated successfully.'); // Success message
        } else {
          console.log('Failed to update inventory item: Item not found.'); // Error message
        }
    
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
    
        return this.httpClient.put(`${this.apiUrl}InventoryItem/UpdateItems/${inventory_ItemId}`, inventoryitem, httpOptions);
      }

    // Get Inventory Types

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

    //GET INVENTORY PRICE
    GetInventoryItemPrice(itemId: number) {
      return this.httpClient.get<any>(`${this.apiUrl}InventoryItem/GetInventoryItemPrice/${itemId}`);
    }
    

    addItem(item: InventoryItem) {
      this.checklistItems.push(item);
    }

    getChecklistItems(): InventoryItem[] {
      return this.checklistItems;
    }
    
    addStockTake(stockTake: any): Observable<any> {
      const url = `${this.apiUrl}InventoryItem/AddStockTake`; // Use the correct endpoint
      return this.httpClient.post(url, stockTake);
    }
  

    getInventoryItemsByType(typeId: number): Observable<InventoryItem[]> {
      return this.httpClient.get<InventoryItem[]>(`${this.apiUrl}StockTake/${typeId}`);
    }

    SendEmailNotification(item: InventoryItem, predefinedLevel: number) {
      console.log('ItemName:', item.itemName);
      console.log('Quantity:', item.quantity);
      // Make a request to the backend API to check inventory levels
      // and send email notifications if necessary
      return this.httpClient.post(`${this.apiUrl}SendNotification/SendEmailNotification`, {}).pipe(
        catchError((error) => {
          console.error('Failed to send notification:', error);
        
          return throwError(error);
        })
      );
    }
    addToChecklist(item: InventoryItem) {
      // Check if the item is already in the checklist
      const existingItem = this.checklistItems.find(
        (checklistItem) => checklistItem.inventory_ItemId === item.inventory_ItemId
      );
      if (existingItem) {
        existingItem.quantity = item.quantity;
      } else {
        this.checklistItems.push(item);
        console.log('Item added to the checklist:', item);
      }
  
      // Emit changes to the checklistItems
      this.emitInventoryItemsChanged(this.checklistItems);
    }
  
    emitInventoryItemsChanged(items: InventoryItem[]) {
      this.inventoryItemsChanged$.next(items);
    }
  
    // Observable to subscribe to changes in inventory items
    get inventoryItemsChanged(): Observable<InventoryItem[]> {
      return this.inventoryItemsChanged$.asObservable();
    }

    getSuppliersFromInventoryItem(item: InventoryItem): Observable<Supplier[]> {
      return this.httpClient.get<Supplier[]>(`${this.apiUrl}Suppliers/GetSuppliersByItemId/${item.inventory_ItemId}`)
        .pipe(
          catchError(error => {
            console.error('Error fetching suppliers:', error);
            return [];
          })
        );
    }

    GetAllSuppliers(): Observable<any>{
      return this.httpClient.get(`${this.apiUrl}Supplier/GetAllSuppliers`)
      .pipe(map(result => result))
    }
    
    GetInventoryItemByName(itemName: string): Observable<InventoryItem> {
      return this.httpClient.get<InventoryItem>(`${this.apiUrl}InventoryItem/GetInventoryItemByName/${itemName}`);
    }

    AddReceivedOrder(receiveorder: Supplier_Inventory): Observable<any> {
      return this.httpClient.post(`${this.apiUrl}InventoryItem/AddReceivedOrder`, receiveorder, this.httpOptions);
    }
  
    GetAllInventoryOrders(): Observable<Supplier_Inventory[]> {
      return this.httpClient.get<Supplier_Inventory[]>(`${this.apiUrl}InventoryItem/GetAllInventoryOrders`)
        .pipe(map(result => result));
    }

    createStockTake(stockTake: any): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.httpClient.post(`${this.apiUrl}InventoryItem/CreateStockTake`, stockTake, httpOptions);
    }
  
    
  getAllStockTakes(): Observable<StockTake[]> {
    return this.httpClient.get<StockTake[]>(`${this.apiUrl}InventoryItem/Stocktake`);
  }

  //Recon Method

  GetAllReconItems(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}InventoryItem/GetAllReconItems`)
    .pipe(map(result => result))
  }

  AddWriteOffRecord(writeOffData: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}InventoryItem/AddWriteOffRecord`, writeOffData);
  }

}