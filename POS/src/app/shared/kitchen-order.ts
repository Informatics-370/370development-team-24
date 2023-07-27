// KitchenOrderViewModel.ts
import { MenuItem } from "./menu-item.model";
import { Drink } from "./drink";

export interface KitchenOrderViewModel {
  kitchenOrderId: number;
  tableNumber: string;
  kitchenOrderNumber: string;
  orderedItems: MenuItem[];
  orderedDrinks: Drink[];
  subtotal: number;
  vatId: number;
  discountId: number;
}
