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
import { KitchenOrderViewModel } from '../shared/kitchen-order';

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
  tableNumber: string | null = null;
 

  constructor(private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { }

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
    const existingItem = this.orderedItems.find((item) => item.menuItemId === menuItem.menuItemId);

    if (existingItem) {
      // If the item already exists in the order, update its quantity
      existingItem.quantity += 1;
    } else {
      // If it's a new item, set the quantity to 1
      menuItem.quantity = 1;
      this.orderedItems.push(menuItem);
    }

    this.updateSubtotal();
  }

  addToDrinkOrder(drink: Drink) {
    const existingDrink = this.orderedDrinks.find((item) => item.drinkId === drink.drinkId);

    if (existingDrink) {
      // If the drink already exists in the order, update its quantity
      existingDrink.quantity += 1;
    } else {
      // If it's a new drink, set the quantity to 1
      drink.quantity = 1;
      this.orderedDrinks.push(drink);
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
    // TODO: Implement submitting order to the kitchen
    const kitchenOrder: KitchenOrderViewModel = {
      kitchenOrderId: 0, // This will be ignored by the server as it generates the ID
      tableNumber: this.tableNumber || '', // Empty string if takeaway
      kitchenOrderNumber: this.kitchenOrderNumber,
      orderedItems: this.orderedItems,
      orderedDrinks: this.orderedDrinks,
      subtotal: this.updateSubtotal(),
      vat: 0, // This will be calculated on the server
      discount: 0, // This will be calculated on the server
    };
    
    this.mainService.saveKitchenOrder(kitchenOrder).subscribe(
      (response) => {
        // Order successfully saved in the backend
        console.log('Order saved successfully:', response);
  
        // Redirect to the Kitchen Screen to display the order details
        this.router.navigate(['/kitchen', this.kitchenOrderNumber]);
      },
      (error) => {
        console.error('Error saving order:', error);
        // Handle error if needed
      }
    );



    

    
  }


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
