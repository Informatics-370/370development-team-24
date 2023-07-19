import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../shared/menu-item.model';
import { MenuItemPrice } from '../shared/menu-item-price';
import { Drink } from '../shared/drink';
import { DrinkPrice } from '../shared/drink-price';
import { MainService } from '../service/main.service';
import { MenuType } from '../shared/menu-type';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
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

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.GetAllMenuItems().subscribe((result: any) => {
      this.menuItems = result;
      this.filteredMenuItems = this.menuItems;
    });

    this.mainService.GetAllDrinkItems().subscribe((result: any) => {
      this.drinkItems = result;
      this.filteredDrinkItems = this.drinkItems;
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
      this.filteredDrinkItems = this.drinkItems.filter(
        (item) => item.drink_TypeId === drinkType
      );
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
  }

  //
  // Get menu item price by ID
  getMenuItemPrice(menuItemId: number): number {
    const menuItemPrice = this.menuPrices.find((amount) => amount.menuItemId === menuItemId);
    return menuItemPrice ? menuItemPrice.amount : 0;
  }

  getDrinkItemPrice(drinkId: number): number {
    const drinkItemPrice = this.drinkPrices.find((amount) => amount.drinkId === drinkId);
    return drinkItemPrice ? drinkItemPrice.amount : 0;
  }

}
