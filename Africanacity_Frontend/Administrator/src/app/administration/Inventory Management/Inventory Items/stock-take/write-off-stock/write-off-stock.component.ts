import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { WriteOffViewModel } from 'src/app/shared/stocktake';

@Component({
  selector: 'app-write-off-stock',
  templateUrl: './write-off-stock.component.html',
  styleUrls: ['./write-off-stock.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class WriteOffStockComponent implements OnInit{

  // inventoryItems: InventoryItem[] = [];

  updatedItems!: WriteOffViewModel[]

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


  // onOkButtonClick() {
  //   // Implement the logic you want to execute when the "OK" button is clicked
  // }
  constructor(
    private inventoryService: InventoryService,
    public dialogRef: MatDialogRef<WriteOffStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: any[] }
  ) {}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  onOkButtonClick(): void {
    // Map items to updatedItems
    /*const updatedItems = this.data.items.map(item => ({
      StockTakeItemId: item.inventory_ItemId,
      Reason: item.reason
    }));*/

    let updatedItems = new WriteOffViewModel();
    updatedItems.stockTakeItemId = updatedItems.stockTakeItemId,
    updatedItems.reason = updatedItems.reason

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
