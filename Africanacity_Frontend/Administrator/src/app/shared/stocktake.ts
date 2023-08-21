export class StockTakeViewModel {
  stockTake_Id!: number;
  stockQuantity!: number;
  stockTake_Date!: string; // You might need to adjust the data type for dates
  inventory_ItemId!: number[]; // List of selected Inventory_ItemIds
}

export class StockTakeRecon{
  stockTakeItemId!: number;
  inventoryItemName!: string;
  inventoryQuantity!: number;
  quantity!: number;
  quantityDifference!: number;
}

export class WriteOffViewModel {
  stockTakeItemId!: number;
  reason!: string;
  //discrepencyItems: DiscrepencyItem[];
}