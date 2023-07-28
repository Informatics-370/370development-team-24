// KitchenOrderViewModel.ts
import { MenuItem } from "./menu-item.model";
import { Drink } from "./drink";

export interface KitchenOrder {
  kitchenOrderId: number;
  tableNumber: string;
  kitchenOrderNumber: string;
  orderedItems: string[];
  orderedDrinks: string[];
  subtotal: number;
  
}
