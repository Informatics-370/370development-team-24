import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { WriteOffStockComponent } from './write-off-stock/write-off-stock.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.component.html',
  styleUrls: ['./stock-take.component.css']
})
export class StockTakeComponent implements OnInit {
  stockTakeForm: FormGroup;
  inventoryItems: InventoryItem[] = [];
  dialogRef!: MatDialogRef<WriteOffStockComponent>;
  lastStockTakeDate: Date | null = null;
  allQuantityFieldsFilled: boolean = false;
  private MIN_QUANTITY: number = 1;
  adminReason: string = '';


  constructor(private fb: FormBuilder, private inventoryService: InventoryService, private dialog: MatDialog, private router: Router ) {
    this.stockTakeForm = this.fb.group({
      stockTakeDate: [new Date().toISOString().slice(0, 10)],
    });
  }

  ngOnInit(): void {
    this.fetchInventoryItems();
    //this.getLastStockTakeDate();
    this.stockTakeForm.valueChanges.subscribe(() => {
      this.updateCreateButtonState();
    });
    this.updateCreateButtonState();
  }

  fetchInventoryItems(): void {
    this.inventoryService.GetAllInventoryItems().subscribe(
      (items) => {
        this.inventoryItems = items;
        // Dynamically create form controls for quantity based on the number of inventory items
        items.forEach((item: { inventory_ItemId: any; }) => {
          this.stockTakeForm.addControl(
            item.inventory_ItemId,
            this.fb.control('', [Validators.min(1)]), // Add Validators.min(1) validation
          );
        });
      },
      (error) => {
        console.error('Error fetching inventory items:', error);
      }
    );
  }
// Add this method to check if the "Create Stock Take" button should be enabled
isCreateButtonEnabled(): boolean {
  return (
    this.stockTakeForm.valid &&
    this.inventoryItems.every((item, i) =>
      this.stockTakeForm.get(String(i))?.value !== null
    )
  );
}
updateCreateButtonState(): void {
  this.allQuantityFieldsFilled = this.inventoryItems.every((item, i) =>
    this.stockTakeForm.get(String(i))?.value !== null && this.stockTakeForm.get(String(i))?.value !== ''
  );
}


  // getLastStockTakeDate(): void {
  //   this.inventoryService.getLastStockTakeDate().subscribe(
  //     (date) => {
  //       this.lastStockTakeDate = date;
  //     },
  //     (error) => {
  //       console.error('Error fetching last stock take date:', error);
  //     }
  //   );
  // }
  addItem(): void {
    // You can implement this method if needed
  }

  removeItem(index: number): void {
    // You can implement this method if needed
  }

  createStockTake(): void {
    if (this.stockTakeForm.invalid) {
      return;
    }
  
    const currentDate = new Date();
    const stockTakeData = {
      stockTakeDate: currentDate as Date,
      items: this.inventoryItems.map((item) => ({
        inventory_ItemId: item.inventory_ItemId,
        quantity: this.stockTakeForm.get(String(item.inventory_ItemId))?.value || 0,
      })),
    };
  
    console.log('Stock take data sent to API:', stockTakeData);
    this.inventoryService.createStockTake(stockTakeData).subscribe(
      (response: any) => {
        if (response.discrepancyItems && response.discrepancyItems.length > 0) {
          // Handle discrepancy items
          console.log('Discrepancy items found:', response.discrepancyItems);
          this.openDiscrepancyModal(response.discrepancyItems);
        } else {
          // No discrepancies
          console.log('No discrepancies');
  
          // Redirect to the stock-take list page
          this.router.navigate(['/stock-take-list']); // Replace '/stock-take-list' with the actual route path
        }
      },
      (error: any) => {
        console.error('Error creating stock take:', error);
      }
    );
  
    // Send the stock take data to the backend API for updating inventory quantities
    this.inventoryService.updateInventoryQuantities(stockTakeData).subscribe(
      (response: any) => {
        // Handle the response from the backend, if needed
        console.log('Inventory quantities updated successfully:', response);
  
        // Redirect to the stock-take list page or perform other actions
        this.router.navigate(['/stock-take-list']); // Replace '/stock-take-list' with the actual route path
      },
      (error: any) => {
        console.error('Error updating inventory quantities:', error);
      }
    );
  }

  openDiscrepancyModal(discrepancyItems: any[]): void {
    const itemsWithQuantityDifference = discrepancyItems.filter(item => item.quantityDifference > 0);
  
    if (itemsWithQuantityDifference.length > 0) {
      this.dialogRef = this.dialog.open(WriteOffStockComponent, {
        width: '400px',
        data: {
          items: itemsWithQuantityDifference,
          adminReason: this.adminReason // Pass adminReason to the modal
        },
      });
  
      this.dialogRef.afterClosed().subscribe((adminReason: string) => {
        // Update the adminReason with the value from the modal
        this.adminReason = adminReason;
        console.log('Discrepancy modal closed');
      });
    }
  }
  
  
  
}