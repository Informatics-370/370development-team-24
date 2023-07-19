import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { InventoryType } from 'src/app/shared/inventorytype';

@Component({
  selector: 'app-view-inventoryitems',
  templateUrl: './view-inventoryitems.component.html',
  styleUrls: ['./view-inventoryitems.component.css']
})
export class ViewInventoryitemsComponent implements OnInit {
  typeId?: number;
  inventoryItems: InventoryItem[] = [];
  selectedType: InventoryType | null = null;

  constructor(
    private route: ActivatedRoute,
    private inventoryservice: InventoryService,
    private snackBar: MatSnackBar
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