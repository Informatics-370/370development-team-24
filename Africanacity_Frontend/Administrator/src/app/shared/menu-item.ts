
export class MenuItem {
    menuItem_Id!: number;
    name!:string;
    description!: string;
    foodTypeName!:string;//new property for name
    menuTypeName!:string;//new property for name
    menuCategoryName!:string;//new property for name
    menuItemsPrices: { [menuItem_Id: number]: number } = {};
    price!:number;
    // foodTypeId: number;
    // menu_TypeId: number;
    // menuItemCategory_Id: number;
}

