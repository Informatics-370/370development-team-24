import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
//import { StockTakeViewModel, WriteOffStock } from 'src/app/shared/stocktake';
import { MatDialog } from '@angular/material/dialog';
import { WriteOffStockComponent } from './write-off-stock/write-off-stock.component';
import { MatDialogRef } from '@angular/material/dialog';

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


  constructor(private fb: FormBuilder, private inventoryService: InventoryService, private dialog: MatDialog) {
    this.stockTakeForm = this.fb.group({
      stockTakeDate: ['', Validators.required],
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
  
    const stockTakeData = {
      stockTakeDate: this.stockTakeForm.value.stockTakeDate,
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
        }
      },
      (error: any) => {
        console.error('Error creating stock take:', error);
      }
    );
  }

  openDiscrepancyModal(discrepancyItems: any[]): void {
    this.dialogRef = this.dialog.open(WriteOffStockComponent, {
      width: '400px',
      data: {
        items: discrepancyItems,
      },
    });


    this.dialogRef.afterClosed().subscribe(() => {
      console.log('Discrepancy modal closed');
    });
  }
//   openDiscrepancyModal(discrepancyItems: any[]): void {
//     this.dialogRef = this.dialog.open(WriteOffStockComponent, {
//       width: '400px',
//       data: {
//         items: discrepancyItems,
//       },
//     });

//     this.dialogRef.afterClosed().subscribe(() => {
//       console.log('Discrepancy modal closed');
//     });
//   }
//   saveWriteOffReasons(reasons: any[]): void {
//     // Call the API to save reasons to the WriteOff table
//     this.inventoryService.AddWriteOffRecord(reasons).subscribe(
//         (response: any) => {
//             console.log('Write-off records added successfully:', response);
//             // You can perform additional actions if needed
//         },
//         (error: any) => {
//             console.error('Error adding write-off records:', error);
//             // Handle error response
//         }
//     );
// }
  
}





