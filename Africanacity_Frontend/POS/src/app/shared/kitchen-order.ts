// KitchenOrderViewModel.ts
import { MenuItem } from "./menu-item.model";
import { Drink } from "./drink";
import { OrderedItem } from "./ordered-item";
import { OrderedDrink } from "./ordered-drink";

export interface KitchenOrder {
  kitchenOrderId: number;
  tableNumber: string;
  kitchenOrderNumber: string;
  orderedItems: OrderedItem[];
  orderedDrinks: OrderedDrink[];
  subtotal: number;
  status: string;
  
}
