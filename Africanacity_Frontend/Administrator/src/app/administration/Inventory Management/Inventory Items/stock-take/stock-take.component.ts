import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
//import { StockTakeViewModel, WriteOffStock } from 'src/app/shared/stocktake';
import { MatDialog } from '@angular/material/dialog';
import { WriteOffStockComponent } from './write-off-stock/write-off-stock.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.component.html',
  styleUrls: ['./stock-take.component.css']
})
export class StockTakeComponent implements OnInit {

  removeItem(index: number): void {
    this.items.removeAt(index);
  }
  stockTakeForm: FormGroup;
  inventoryItems: InventoryItem[] = [];
  items!: FormArray;
  dialogRef!: MatDialogRef<WriteOffStockComponent>;
  inputReason: string = '';


  constructor(private fb: FormBuilder, private inventoryService: InventoryService, private dialog: MatDialog,  private router: Router ) {
    this.stockTakeForm = this.fb.group({
      stockTakeDate: [new Date().toISOString().slice(0, 10)],
      items: this.fb.array([])
    });

    this.items = this.stockTakeForm.get('items') as FormArray;
  }

  ngOnInit(): void {
    this.fetchInventoryItems();
  }

  fetchInventoryItems(): void {
    this.inventoryService.GetAllInventoryItems().subscribe(
      (items) => {
        this.inventoryItems = items;
      },
      (error) => {
        console.error('Error fetching inventory items:', error);
      }
    );
  }

  addItem(): void {
    const itemControl = this.fb.group({
      inventory_ItemId: ['', Validators.required],
      quantity: ['', Validators.required]
    });

    this.items.push(itemControl);
  }
  createStockTake(): void {
    if (this.stockTakeForm.invalid) {
      return;
    }
  
    const currentDate = new Date();
    const stockTakeData = {
      stockTakeDate: currentDate as Date,
      items: this.stockTakeForm.value.items.map((item: any) => ({
        inventory_ItemId: item.inventory_ItemId,
        quantity: item.quantity
      }))
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
  }

  // openDiscrepancyModal(discrepancyItems: any[]): void {
  //   this.dialogRef = this.dialog.open(WriteOffStockComponent, {
  //     width: '400px',
  //     data: {
  //       items: discrepancyItems,
  //     },
  //   });


  //   this.dialogRef.afterClosed().subscribe(() => {
  //     console.log('Discrepancy modal closed');
  //   });
  // }

  openDiscrepancyModal(discrepancyItems: any[]): void {
    // Filter the discrepancy items to include only those with quantityDifference > 0
    const itemsWithQuantityDifference = discrepancyItems.filter(item => item.quantityDifference > 0);
  
    // Only open the modal if there are items with quantityDifference > 0
    if (itemsWithQuantityDifference.length > 0) {
      this.dialogRef = this.dialog.open(WriteOffStockComponent, {
        width: '400px',
        data: {
          items: itemsWithQuantityDifference, // Pass the filtered items
          adminReason: this.inputReason
        },
      });
  
      this.dialogRef.afterClosed().subscribe(() => {
        console.log('Discrepancy modal closed');
      });
    }
  }
  
  

}





