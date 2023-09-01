import { DecimalPipe } from "@angular/common";

export class Inventory_Prices{
    inventoryPrice_Id!: number;
    price!: DecimalPipe;
    date!: Date;
    inventory_ItemId!: number;
}