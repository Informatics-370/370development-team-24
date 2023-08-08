import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { InventoryType } from '../shared/inventorytype';
import { InventoryItem } from '../shared/inventoryitem';
import { StockTake } from '../shared/stocktake';
import { BehaviorSubject} from 'rxjs';
import { Supplier } from '../shared/supplier';
import { Supplier_Inventory } from '../shared/supplieritem';

@Injectable({
    providedIn: 'root'
  })
  export class InventoryService {
  
    apiUrl = 'http://localhost:49991/api/'
    private inventoryItems: InventoryItem[] = [];
    private checklistItems: InventoryItem[] = [];
    // private inventoryItemsChanged$ = new BehaviorSubject<InventoryItem[]>([]);
    public inventoryItemsChanged$ = new Subject<InventoryItem[]>();

  // ... Your existing code ...
  
  
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

      UpdateInventoryItem(inventory_ItemId: number, inventoryitem: InventoryItem): Observable<any> {
        // Perform client-side operations or validations here
        // Update the item locally
    
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

    addItem(item: InventoryItem) {
      this.checklistItems.push(item);
    }

    getChecklistItems(): InventoryItem[] {
      return this.checklistItems;
    }
    
    // addToChecklist(item: InventoryItem) {
    //   // Check if the item is already in the checklist
    //   const existingItem = this.checklistItems.find((checklistItem) => checklistItem.inventory_ItemId === item.inventory_ItemId);
    //   if (existingItem) {
    //     // Item already exists in the checklist, handle accordingly (e.g., show error message)
    //     console.error('Item already exists in the checklist.');
    //     return;
    //   }
  
    //   // Add the item to the checklist
    //   this.checklistItems.push(item);
    //   console.log('Item added to the checklist:', item);
    // }

    //Submit Stock Take 
 
    submitStockTake(stockTake: StockTake): Observable<any> {
      return this.httpClient.post<any>(`${this.apiUrl}StockTake/SubmitStockTake`, stockTake);
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
        // Item already exists in the checklist, update its properties (e.g., quantity)
        existingItem.quantity = item.quantity;
      } else {
        // Add the item to the checklist
        this.checklistItems.push(item);
        console.log('Item added to the checklist:', item);
      }
  
      // Emit changes to the checklistItems
      this.emitInventoryItemsChanged(this.checklistItems);
    }
    
  
    // ... Your existing code ...
  
    emitInventoryItemsChanged(items: InventoryItem[]) {
      this.inventoryItemsChanged$.next(items);
    }
  
    // Observable to subscribe to changes in inventory items
    get inventoryItemsChanged(): Observable<InventoryItem[]> {
      return this.inventoryItemsChanged$.asObservable();
    }

    getSuppliersFromInventoryItem(item: InventoryItem): Observable<Supplier[]> {
      // Implement a method to retrieve the suppliers related to the inventory item.
      // For example, you can make an API call to get the suppliers based on item ID.
      // Replace the URL with your actual API endpoint to fetch suppliers for the given item ID.
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
}