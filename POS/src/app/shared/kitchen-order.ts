import { MenuItem } from "./menu-item.model";
import { Drink } from "./drink";

export interface KitchenOrderViewModel {
    kitchenOrderId: number; // Auto-generated ID on the server-side, you can ignore it when sending data to the server
    tableNumber: string; // The table number where the order was placed, can be an empty string for takeaway
    kitchenOrderNumber: string; // The generated kitchen order number ('SIT-XXXX' or 'TAKE-XXXX')
    orderedItems: MenuItem[]; // Array of ordered menu items
    orderedDrinks: Drink[]; // Array of ordered drinks
    subtotal: number; // The total amount of the order (excluding VAT and Discount)
    vat: number; // The VAT amount (to be calculated on the server-side)
    discount: number; // The discount amount (to be calculated on the server-side)
  }
  