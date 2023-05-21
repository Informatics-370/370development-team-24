export interface MenuItem {
    menuItem_Id: Number;
    name:String;
    description: String;
    foodTypeName:String;//new property for name
    menuTypeName:String;//new property for name
    menuCategoryName:String;//new property for name
    foodTypeId: number;
    menu_TypeId: number;
    menuItemCategory_Id: number;
}

/*export class MenuItem
{
    menuItem_Id!: number;
    name!: string;
    description!: string;
    foodType!: string;
    category!: string;
}*/