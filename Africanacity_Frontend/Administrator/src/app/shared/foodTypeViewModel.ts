import { MenuCategoryFoodType } from "./menuCategoryFoodType";

export interface FoodTypeViewModel {
    name: string;
    description: string;
    menuCategoryFoodTypeItems: MenuCategoryFoodType[];
    // Add other properties as needed
  }