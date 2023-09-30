// stocktake-item.model.ts

// export interface StockTakeItem {
//     inventory_ItemId: number;
//     stockTakeQuantity: number;
//   }

  export interface StockTake {
    stockTakeId: number;
    stockQuantity: number;
    stockTakeDate: Date;
    stockTakeItems: StockTakeItem[];
    items: StockTakeItem[];
  }
  
  export interface StockTakeItem {
    quantity: number;
    inventory_ItemId: number;
    stock_TakeId: number;
  }
  

  
  