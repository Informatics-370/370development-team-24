/*export class MenuItem {
    menuItem_Id!: Number;
    name!:String;
    description!: String;
    foodType!:{foodTypeId: number, name: String, description: string} ;
    menuType!: {menu_TypeId: number, name: string};
    menuCategory!:{menuItemCategory_Id: number, name: string, description: string};
    foodType_Id!: Number;
    menu_TypeId!: Number;
    menuCategory_Id!: Number;
}*/

export class MenuItem
{
    menuItem_Id!: number;
    name!: string;
    description!: string;
    foodType!: string;
    category!: string;
}