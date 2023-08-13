import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';

@Component({
  selector: 'app-write-off-stock',
  templateUrl: './write-off-stock.component.html',
  styleUrls: ['./write-off-stock.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class WriteOffStockComponent implements OnInit{

  // inventoryItems: InventoryItem[] = [];

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


  // onOkButtonClick() {
  //   // Implement the logic you want to execute when the "OK" button is clicked
  // }
  constructor(
    private inventoryService: InventoryService,
    public dialogRef: MatDialogRef<WriteOffStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: any[] }
  ) {}

  onOkButtonClick(): void {
    // Update the write-off records with reasons
    const updatedItems = this.data.items.map(item => {
      return {
        StockTakeItemId: item.inventory_ItemId,
        Reason: item.reason
      };
    });

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
  ngOnInit(): void {}

}
