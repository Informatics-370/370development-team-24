import { Inventory_Prices } from "./inventoryPrices";

export class InventoryItem{
    inventory_ItemId!: number;
    itemName!: string;
    description!: string;
    inventoryTypeName!: string;
    inventoryType!: number; 
    quantity!: number;
    stockTakeQuantity!: number;
    isChecked!: boolean;
    ordered: boolean = false;
    price!: number;
    isModified: boolean = false;
    
    Inventory_Prices!: Inventory_Prices[];

}