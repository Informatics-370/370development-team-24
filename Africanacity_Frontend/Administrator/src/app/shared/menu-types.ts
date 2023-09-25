import { MenuItemCategory } from "./menu-item-category";
import { FoodType } from "./food-type";

export class MenuTypes{
    menu_TypeId?: number;
    name!: string;

    //tree diagram
    // Properties to store selected Menu Categories and Food Types
    menuCategories!: string[];
    foodTypes!: string[];

  
}