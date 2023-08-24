// export interface MenuItem {
//     menuItem_Id: number;
//     name:String;
//     description: String;
//     foodTypeName:String;//new property for name
//     menuTypeName:String;//new property for name
//     menuCategoryName:String;//new property for name
//     menuItemsPrices: { [menuItem_Id: number]: number };
//     // foodTypeId: number;
//     // menu_TypeId: number;
//     // menuItemCategory_Id: number;
// }
export class MenuItem {
    menuItem_Id!: number;
    name!:string;
    description!: string;
    foodTypeName!:string;//new property for name
    menuTypeName!:string;//new property for name
    menuCategoryName!:string;//new property for name
    menuItemsPrices: { [menuItem_Id: number]: number } = {};
    // foodTypeId: number;
    // menu_TypeId: number;
    // menuItemCategory_Id: number;
}

/*export class MenuItem
{
    menuItem_Id!: number;
    name!: string;
    description!: string;
    foodType!: string;
    category!: string;
}*/
