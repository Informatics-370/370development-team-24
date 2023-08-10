import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { InventoryType } from 'src/app/shared/inventorytype';
import { ChecklistComponent } from '../checklist/checklist.component';

@Component({
  selector: 'app-view-inventoryitems',
  templateUrl: './view-inventoryitems.component.html',
  styleUrls: ['./view-inventoryitems.component.css']
})
export class ViewInventoryitemsComponent implements OnInit {

  typeId?: number;
  inventoryItems: InventoryItem[] = [];
  selectedType: InventoryType | null = null;
  inventoryitem?: number;
  predefinedLevel: number = 5;


  constructor(
    private route: ActivatedRoute,
    private inventoryservice: InventoryService,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {}

  deleteItem(): void {
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this supplier?', 'Delete, Cancel',{
      duration: 5000, // Display duration in milliseconds

    });

    
    //  cancel(){
    //    this.router.navigate(['/home'])
    //  }
  

    confirmationSnackBar.onAction().subscribe(() => {
      // Perform the deletion action here
      this.deleteItemFromServer();
      window.location.reload();
    });
  }

deleteItemFromServer(): void {
  this.DeleteInventoryItem;
}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.typeId = +params['typeId'];
      if (this.typeId) {
        this.GetInventoryItemsByType(this.typeId);
      }
    });
  }

  GetInventoryItemsByType(typeId: number): void {
    this.inventoryservice.GetInventoryItemsByType(typeId).subscribe(
      (items) => {
        this.inventoryItems = items;
      },
      (error) => {
        console.error('Failed to fetch inventory items:', error);
      }
    );
  }
  

  
  incrementQuantity(inventoryItem: InventoryItem) {
    inventoryItem.quantity++;
    this.updateQuantityOnServer(inventoryItem);
  }

  decrementQuantity(inventoryItem: InventoryItem) {
    if (inventoryItem.quantity > 0) {
      inventoryItem.quantity--;
      this.updateQuantityOnServer(inventoryItem);

      if (inventoryItem.quantity < this.predefinedLevel) {
        this.addToChecklist(inventoryItem);
        this.inventoryservice.SendEmail(inventoryItem, this.predefinedLevel).subscribe(
          () => {
            console.log('Notification sent successfully.');
          },
          (error: any) => {
            console.error('Failed to send notification:', error);
          }
        );
      }
    }
  }

  
  updateQuantityOnServer(inventoryItem: InventoryItem) {
    this.inventoryservice.UpdateInventoryItem(inventoryItem.inventory_ItemId, inventoryItem).subscribe(
      () => {
        console.log('Inventory item updated successfully.'); // Success message or additional logic if needed
        this.updateInventoryItemInArray(inventoryItem); // Update the item in the array
      },
      (error: any) => {
        console.error('Failed to update inventory item:', error);
      }
    );
  }

  updateInventoryItemInArray(updatedItem: InventoryItem) {
    const index = this.inventoryItems.findIndex((item) => item.inventory_ItemId === updatedItem.inventory_ItemId);
    if (index !== -1) {
      this.inventoryItems[index] = { ...updatedItem }; // Replace the item in the array
    }
  }

  addToChecklist(item: InventoryItem) {
    this.inventoryservice.addToChecklist(item);
  }
  
  
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.inventoryItems = this.inventoryItems.filter(inventoryitem => {
      const column2Value = inventoryitem.itemName.toLowerCase() || inventoryitem.itemName.toUpperCase();
      const column3Value = inventoryitem.description.toLowerCase();
  
      return column2Value.includes(filterValue) || column3Value.includes(filterValue);
    });
  }

  DeleteInventoryItem(inventory_ItemId: Number){
    this.inventoryservice.DeleteInventoryItem(inventory_ItemId).subscribe(result => {
      this.deleteItem();
      });
    }
}