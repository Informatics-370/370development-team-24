

export class KitchenOrderView{
    KitchenOrderId!: number;
    TableNumber!: string;
    KitchenOrderNumber!: string;
    Subtotal!: number;
    VAT!: number;
    Discount!:number;
    Total!:number;
    description!: string;
    OrderedMenuItems!: OrderedMenuItem[];
    OrderedDrinkItems!: OrderedDrink[];
}

export class OrderedMenuItem {
    Quantity!: number;
    MenuItem!: MenuItem;
  }

  export class OrderedDrink {
    Quantity!: number;
    OtherDrink!: OtherDrink;
  }

  export class MenuItem {
    MenuItemId!: number;
    Name!: string;
    // Other properties...
  }
  
  export class OtherDrink {
    OtherDrinkId!: number;
    Name!: string;
    // Other properties...
  }

