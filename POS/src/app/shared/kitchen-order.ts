import { Drink } from "./drink";
import { MenuItem } from "./menu-item.model";

export interface KitchenOrder {
    menuItem?: MenuItem;
    drinkItem?: Drink;
    quantity: number;


}
