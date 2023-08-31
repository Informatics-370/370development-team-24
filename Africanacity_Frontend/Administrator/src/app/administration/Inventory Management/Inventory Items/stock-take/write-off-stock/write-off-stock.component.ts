// import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { InventoryService } from 'src/app/service/inventory.service';
// import { InventoryItem } from 'src/app/shared/inventoryitem';

// @Component({
//   selector: 'app-write-off-stock',
//   templateUrl: './write-off-stock.component.html',
//   styleUrls: ['./write-off-stock.component.css'],
//   encapsulation: ViewEncapsulation.None 
// })
// export class WriteOffStockComponent implements OnInit{

//   // inventoryItems: InventoryItem[] = [];

//   // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


//   // onOkButtonClick() {
//   //   // Implement the logic you want to execute when the "OK" button is clicked
//   // }
//   constructor(
//     private inventoryService: InventoryService,
//     public dialogRef: MatDialogRef<WriteOffStockComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { items: any[] }
//   ) {}
//   ngOnInit(): void {
//     //throw new Error('Method not implemented.');
//   }

//   onOkButtonClick(): void {
//     // Map items to updatedItems
//     const updatedItems = this.data.items.map(item => ({
//       StockTakeItemId: item.inventory_ItemId,
//       Reason: item.reason
//     }));

//     // Call the method to add write-off records
//     this.inventoryService.AddWriteOffRecord(updatedItems).subscribe(
//       response => {
//         console.log('Write-off records added successfully:', response);
//         this.dialogRef.close();
//       },
//       error => {
//         console.error('Error adding write-off records:', error);
//       }
//     );
//   }


// }

import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from 'src/app/service/inventory.service';

@Component({
  selector: 'app-write-off-stock',
  templateUrl: './write-off-stock.component.html',
  styleUrls: ['./write-off-stock.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class WriteOffStockComponent implements OnInit {
  adminReason: string = '';  // Initialize adminReason

  constructor(
    private inventoryService: InventoryService,
    public dialogRef: MatDialogRef<WriteOffStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: any[], adminReason: string }  // Receive adminReason from parent component
  ) {}

  ngOnInit(): void {
    this.adminReason = this.data.adminReason;  // Assign adminReason received from parent component
  }

  onOkButtonClick(): void {
    // Map items to updatedItems with adminReason
    const updatedItems = this.data.items.map(item => ({
      inventory_ItemId: item.inventory_ItemId,
      reason: item.reason,
      adminReason: this.adminReason  // Include adminReason
    }));

    // Call the method to add write-off records
    this.inventoryService.AddWriteOffRecord(updatedItems).subscribe(
      response => {
        console.log('Write-off records added successfully:', response);
        this.dialogRef.close();
      },
      error => {
        console.error('Error adding write-off records:', error);
      }
    );
  }
}




