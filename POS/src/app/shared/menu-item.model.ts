// menu-item.model.ts
export interface MenuItem {
    menuItemId: number;
    name: string;
    description: string;
    menu_TypeId: number;
    foodTypeId: number;
    menuCategoryId: number;
    price: number;
    quantity: number;

    // Add other necessary properties
  }
  