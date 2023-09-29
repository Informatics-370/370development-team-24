import { MenuCategoryFoodType } from "./menuCategoryFoodType";

export class FoodType{
    foodTypeId!: number;
    name!: string;
    description!: string;
    foodTypeName: any;
    menuCategoryFoodTypeItems!: MenuCategoryFoodType[];
}