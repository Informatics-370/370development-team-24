import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../shared/menu-item.model';
import { MenuItemPrice } from '../shared/menu-item-price';
import { Drink } from '../shared/drink';
import { DrinkPrice } from '../shared/drink-price';
import { MainService } from '../service/main.service';
import { MenuType } from '../shared/menu-type';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KitchenOrder } from '../shared/kitchen-order';
import { OrderedItem } from '../shared/ordered-item';
import { OrderedDrink } from '../shared/ordered-drink';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [CurrencyPipe],
})
export class OrderComponent  implements OnInit {
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  orderedItems: OrderedItem[] = [];
  menuType: MenuType[] = [];
  menuPrices: MenuItemPrice[]=[];


  drinkItems: Drink[] = [];
  filteredDrinkItems: Drink[] = [];
  orderedDrinks: OrderedDrink[] = [];
  drinkPrices: DrinkPrice[]= [];

  isDrinkSelected = false;
  kitchenOrderNumber: string = '';
  tableNumber: string | null = null;
  selectedMenuItems: MenuItem[] = [];
  selectedDrinks: Drink[] = [];
 

  constructor(private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private orderService: OrderService,) { }

  ngOnInit() {

     // Get the table number from the route parameters
     this.route.paramMap.subscribe((params) => {
      const tableNumber = params.get('tableNumber');
      this.tableNumber = tableNumber;
     
    });

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
    this.isDrinkSelected = false;
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
    const existingItem = this.orderedItems.find((item) => item.name === menuItem.name);
  
    if (existingItem) {
      // If the item already exists in the order, update its quantity
      existingItem.quantity += 1;
    } else {
      // If it's a new item, set the quantity to 1
      const newOrderItem: OrderedItem = { name: menuItem.name, quantity: 1, menuItemId: menuItem.menuItemId, price: menuItem.price};
      this.orderedItems.push(newOrderItem);
    }
  
    this.updateSubtotal();
  }

  addToDrinkOrder(drink: Drink) {
    const existingDrink = this.orderedDrinks.find((item) => item.name === drink.name);
  
    if (existingDrink) {
      // If the drink already exists in the order, update its quantity
      existingDrink.quantity += 1;
    } else {
      // If it's a new drink, set the quantity to 1
      const newOrderItem: OrderedDrink = { name: drink.name, quantity: 1 , drinkId: drink.drinkId, price: drink.price};
      this.orderedDrinks.push(newOrderItem);
    }
    this.updateSubtotal();
  }

  //to submit to kitchen screen function
   submitOrder() {
    if (this.tableNumber) {
      
      this.kitchenOrderNumber = `SIT-${this.generateOrderNumber()}`;
    } else {
      this.tableNumber = null;
      this.kitchenOrderNumber = `TAKE-${this.generateOrderNumber()}`;
    }

     // Create arrays to store only the names of ordered items and drinks
      const orderedItemNames: string[] = [];
      const orderedDrinkNames: string[] = [];

       // Extract the names of ordered items
      for (const orderedItem of this.orderedItems) {
      orderedItemNames.push(orderedItem.name);
      }

  // Extract the names of ordered drinks
      for (const orderedDrink of this.orderedDrinks) {
      orderedDrinkNames.push(orderedDrink.name);
      }

 // Log the extracted item names and drink names
 console.log('Ordered Items:', orderedItemNames);
 console.log('Ordered Drinks:', orderedDrinkNames);


    // TODO: Implement submitting order to the kitchen
    const kitchenOrder: KitchenOrder = {
      kitchenOrderId: 0, // This will be ignored by the server as it generates the ID
      tableNumber: this.tableNumber || '', // Empty string if takeaway
      kitchenOrderNumber: this.kitchenOrderNumber,
      orderedItems:this.orderedItems,
      orderedDrinks: this.orderedDrinks,
      subtotal: Number(this.updateSubtotal()),
      status: ''
       // This will be calculated on the server
    };
     // Get existing kitchen orders from local storage
     const existingOrders: KitchenOrder[] = this.orderService.getKitchenOrders();

     // Append the new order to the existing orders
     existingOrders.push(kitchenOrder);
 
     // Save the updated kitchen orders array to local storage using the OrderService
     this.orderService.saveKitchenOrders(existingOrders);

    console.log('Sending Kitchen Order:', kitchenOrder);

    


    

    
  }


  //NEW SUBMIT METHOD
  

  //generateOrderNumber
  private generateOrderNumber(): string {
    const randomNum = Math.floor(Math.random() * 10000);
    return randomNum.toString();
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
  updateSubtotal(): number {
    let subtotal = 0;
  
    for (const orderedItem of this.orderedItems) {
      const menuItemPrice = this.getSelectedMenuItemPrice(orderedItem.menuItemId);
      subtotal += menuItemPrice * orderedItem.quantity;
    }
  
    for (const orderedDrink of this.orderedDrinks) {
      const drinkItemPrice = this.getSelectedDrinkItemPrice(orderedDrink.drinkId);
      subtotal += drinkItemPrice * orderedDrink.quantity;
    }
  
    return subtotal;
  }
}
  



