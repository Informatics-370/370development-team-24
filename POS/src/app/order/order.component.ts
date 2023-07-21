import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../shared/menu-item.model';
import { MenuItemPrice } from '../shared/menu-item-price';
import { Drink } from '../shared/drink';
import { DrinkPrice } from '../shared/drink-price';
import { MainService } from '../service/main.service';
import { MenuType } from '../shared/menu-type';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [CurrencyPipe],
})
export class OrderComponent  implements OnInit {
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  orderedItems: MenuItem[] = [];
  menuType: MenuType[] = [];
  menuPrices: MenuItemPrice[]=[];

  drinkItems: Drink[] = [];
  filteredDrinkItems: Drink[] = [];
  orderedDrinks: Drink[] = [];
  drinkPrices: DrinkPrice[]= [];

  isDrinkSelected = false;
  kitchenOrderNumber: string = '';

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.GetAllMenuItems().subscribe((result: any) => {
      this.menuItems = result;
      this.filteredMenuItems = this.menuItems;
    });

    this.mainService.GetAllMenuItemPrices().subscribe((prices: MenuItemPrice[]) => {
      this.menuPrices = prices;
    });

    this.mainService.GetAllDrinkItems().subscribe((result: any) => {
      this.drinkItems = result;
      this.filteredDrinkItems = this.drinkItems;
    });

    this.mainService.GetAllDrinkItemPrices().subscribe((prices: DrinkPrice[]) => {
      this.drinkPrices = prices;
    });

  }

  //filter function based on selected menutype


  filterMenuItems(menuType: number) {
    if (menuType === 0) {
      this.filteredMenuItems = this.menuItems;
    } else {
      this.filteredMenuItems = this.menuItems.filter(
        (item) => item.menu_TypeId=== menuType
      );
    }
    
  }


  //filter functio based on selected drink type
  filterDrinkItems(drinkType: number) {
    if (drinkType === 0) {
      this.filteredDrinkItems = this.drinkItems;
    } else {
      this.isDrinkSelected = true;
      this.filteredDrinkItems = this.drinkItems.filter(
        (item) => item.drink_TypeId === drinkType
      );
    }
  }

    // Filter items based on menu type or drink type
    filterItems(typeId: number, isDrink: boolean): void {
      if (isDrink) {
        this.isDrinkSelected = true;
        this.filteredDrinkItems = this.drinkItems.filter((item) => item.drink_TypeId === typeId);
      } else {
        this.isDrinkSelected = false;
        this.filteredMenuItems = this.menuItems.filter((item) => item.menu_TypeId === typeId);
      }
    }

  // add to order screen function
  addToMenuItemOrder(menuItem: MenuItem) {
    this.orderedItems.push(menuItem);
  }

  addToDrinkOrder(drink: Drink) {
    this.orderedDrinks.push(drink);
  }

  //to submit to kitchen screen function
   submitOrder() {
    // TODO: Implement submitting order to the kitchen
    this.kitchenOrderNumber = 'TAKE-' + Math.floor(Math.random() * 10000).toString();
  }

  //
  // Get menu item price by ID
  fetchMenuItemPrice(menuItemId: number): number {
    const menuItemPrice = this.menuPrices.find((price) => price.menuItemId === menuItemId);
    return menuItemPrice ? menuItemPrice.amount : 0;
  }

  fetchDrinkItemPrice(drinkId: number): number {
    const drinkItemPrice = this.drinkPrices.find((price) => price.drinkId === drinkId);
    return drinkItemPrice ? drinkItemPrice.amount : 0;
  }

  getSelectedMenuItemPrice(menuItemId: number): number {
    const menuItemPrice = this.menuPrices.find((price) => price.menuItemId === menuItemId);
    return menuItemPrice ? menuItemPrice.amount : 0;
  }
  
  getSelectedDrinkItemPrice(drinkId: number): number {
    const drinkItemPrice = this.drinkPrices.find((price) => price.drinkId === drinkId);
    return drinkItemPrice ? drinkItemPrice.amount : 0;
  }

  //method to calculate the subtotal
  calculateSubtotal(): number {
    let subtotal = 0;
  
    for (const orderedItem of this.orderedItems) {
      const menuItemPrice = this.getSelectedMenuItemPrice(orderedItem.menuItemId);
      subtotal += menuItemPrice;
    }
  
    for (const orderedDrink of this.orderedDrinks) {
      const drinkItemPrice = this.getSelectedDrinkItemPrice(orderedDrink.drinkId);
      subtotal += drinkItemPrice;
    }
  
    return subtotal;
  }
  


}
