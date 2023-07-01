export interface MenuItem {
    menuItem_Id: Number;
    name:String;
    description: String;
    foodTypeName:string;//new property for name
    menuTypeName:string;//new property for name
    menuCategoryName:string;//new property for name
    isDeleted:false;
   
}

/*export class MenuItem
{
    menuItem_Id!: number;
    name!: string;
    description!: string;
    foodType!: string;
    category!: string;
}*/