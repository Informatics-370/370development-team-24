// stocktake.ts
import { InventoryItem } from './inventoryitem';

export class StockTake {
  find(arg0: (data: any) => boolean) {
    throw new Error('Method not implemented.');
  }
  stockTake_Id!: number;
  date!: Date;
  stockQuantity!: number;
  InventoryItems!: InventoryItem[];
  InventoryItemName!: string; // Include the InventoryItemName property
}