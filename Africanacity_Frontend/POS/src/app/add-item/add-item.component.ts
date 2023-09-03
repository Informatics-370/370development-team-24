import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../shared/menu-item.model';
import { MenuItemPrice } from '../shared/menu-item-price';
import { Drink } from '../shared/drink';
import { DrinkPrice } from '../shared/drink-price';
import { MainService } from '../service/main.service';
import { MenuType } from '../shared/menu-type';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router,  NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KitchenOrder } from '../shared/kitchen-order';
import { OrderedItem } from '../shared/ordered-item';
import { OrderedDrink } from '../shared/ordered-drink';
import { OrderService } from '../service/order.service';
import { DrinkType } from '../shared/drink-type';
import { AlertController } from '@ionic/angular';
import { Option2OrderService } from '../service/option2-order.service';
import { KitchenOrderView } from '../shared/kitchen-order-view';
 

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent  implements OnInit {

  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  orderedItems: OrderedItem[] = [];
  menuType: MenuType[] = [];
  menuPrices: MenuItemPrice[]=[];


  drinkItems: Drink[] = [];
  filteredDrinkItems: Drink[] = [];
  orderedDrinks: OrderedDrink[] = [];
  drinkPrices: DrinkPrice[]= [];
  drinkType: DrinkType [] = [];

  isDrinkSelected = false;
  kitchenOrderNumber: string = '';
  kitchenOrderId!: number;
  tableNumber: string | null = null;
  selectedMenuItems: MenuItem[] = [];
  selectedDrinks: Drink[] = [];

  //for the amounts
 


  //Vat and discount'
   // Initialize VAT and Discount to 0
   vat: number = 0;
   discount: number = 0;
   totalVat: number = 0;
  totalDiscount: number = 0;
  finalTotal: number = 0;
  subtotal : number = 0;
  orderMenuItemDtos: any;
  orderDrinkDtos: any;
  orderData!: any;



  constructor(private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private orderService: OrderService,
    private alertController: AlertController,
    private option2OrderService: Option2OrderService) { }

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
      console.log('All drinks', this.filteredDrinkItems)
    });

    this.mainService.GetAllDrinkItemPrices().subscribe((prices: DrinkPrice[]) => {
      this.drinkPrices = prices;
      console.log('Prices of drinks', this.drinkPrices)
    });

      // Fetch VAT and Discount values from the DataService
      this.fetchVatById(1); // Replace 1 with the actual VAT ID you want to fetch
      this.fetchDiscountById(1);

      this.route.queryParams.subscribe((params) => {
        if (params) {
          // Retrieve and store the initial order data from the query parameters
          this.orderData = {
            KitchenOrderNumber: params['kitchenOrderNumber'],
            TableNumber: params['tableNumber'],
            OrderedMenuItems: params['orderedItems'],
            OrderedDrinks: params['orderedDrinks'],
            Subtotal: params['Subtotal'],
            VAT: params['VAT'],
            Total: params['Total']
            // Add other properties as needed
          };
        }
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


    //adding the items (Edit process)
     // Add this function to add an item to the shared service
  addMenuItemToSharedService(menuItem: MenuItem) {
    const newItemData = {
      name: menuItem.name,
      quantity: 1,
      menuItemId: menuItem.menuItemId,
      price: menuItem.price,
    };
    this.option2OrderService.setAddedItemData(newItemData);
  }

  // Add this function to add a drink to the shared service
  addDrinkToSharedService(drink: Drink) {
    const newItemData = {
      name: drink.name,
      quantity: 1,
      otherDrinkId: drink.otherDrinkId,
      price: drink.price,
    };
    this.option2OrderService.setAddedItemData(newItemData);
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
    
    this.addMenuItemToSharedService(menuItem);
    this.updateSubtotal();
    this.updateSubtotalAndTotals();

  }

  addToDrinkOrder(drink: Drink) {
    const existingDrink = this.orderedDrinks.find((item) => item.name === drink.name);
  
    if (existingDrink) {
      // If the drink already exists in the order, update its quantity
      existingDrink.quantity += 1;
    } else {
      // If it's a new drink, set the quantity to 1
      const newOrderItem: OrderedDrink = { name: drink.name, quantity: 1 , otherDrinkId: drink.otherDrinkId, price: drink.price};
      this.orderedDrinks.push(newOrderItem);
    }
    this.addDrinkToSharedService(drink);
    this.updateSubtotal();
    this.updateSubtotalAndTotals();
  }

  // Method to navigate to the "Edit Kitchen Order" screen and set data in SharedService
navigateToEditKitchenOrder() {
  const dataToPass = {
    kitchenOrderId: this.kitchenOrderId,
    kitchenOrderNumber: this.kitchenOrderNumber,
    tableNumber: this.tableNumber,
    orderedItems: this.orderedItems,
    orderedDrinks: this.orderedDrinks,
    subtotal: this.subtotal,
    vat: this.vat,
    discount: this.discount,
    total: this.finalTotal



  };

  // Set the added item data in the SharedService
  this.option2OrderService.setAddedItemData(dataToPass);

  // Navigate to the "Edit Kitchen Order" screen
  this.router.navigate(['/edit-kitchen-order', this.kitchenOrderNumber]);
}





  //NEW SUBMIT METHOD
  submitOrder() {
    // ... your existing code ...
  
    // Create a NavigationExtras object with the updated order data
    const navigationExtras: NavigationExtras = {
      state: {
        updatedOrderData: {
          tableNumber: this.tableNumber,
          kitchenOrderNumber: this.kitchenOrderNumber,
          orderedItems: this.orderedItems,
          orderedDrinks: this.orderedDrinks,
          subtotal: this.subtotal,
          totalVat: this.totalVat,
          totalDiscount: this.totalDiscount,
          finalTotal: this.finalTotal,
        },
      },
    };
  
    // Navigate back to the edit-kitchen-order screen and pass the updated data
    this.router.navigate(['/update-kitchen-order'], navigationExtras);
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
    const drinkItemPrice = this.drinkPrices.find((price) => price.otherDrinkId === drinkId);
    return drinkItemPrice ? drinkItemPrice.amount : 0;
  }

  getSelectedMenuItemPrice(menuItemId: number): number {
    const menuItemPrice = this.menuPrices.find((price) => price.menuItemId === menuItemId);
    return menuItemPrice ? menuItemPrice.amount : 0;
    
  }
  
  getSelectedDrinkItemPrice(drinkId: number): number {
    const drinkItemPrice = this.drinkPrices.find((price) => price.otherDrinkId === drinkId);
    return drinkItemPrice ? drinkItemPrice.amount : 0;
  }

  //method to calculate the subtotal
  updateSubtotal(): void{
    this.subtotal = 0;
  
    for (const orderedItem of this.orderedItems) {
      const menuItemPrice = this.getSelectedMenuItemPrice(orderedItem.menuItemId);
      this.subtotal += menuItemPrice * orderedItem.quantity;
    }
  
    for (const orderedDrink of this.orderedDrinks) {
      const drinkItemPrice = this.getSelectedDrinkItemPrice(orderedDrink.otherDrinkId);
      this.subtotal += drinkItemPrice * orderedDrink.quantity;
    }
  }

  //update all totals
  updateSubtotalAndTotals(): void {
    let subtotal = 0;
  
    for (const orderedItem of this.orderedItems) {
      const menuItemPrice = this.getSelectedMenuItemPrice(orderedItem.menuItemId);
      subtotal += menuItemPrice * orderedItem.quantity;
    }
  
    for (const orderedDrink of this.orderedDrinks) {
      const drinkItemPrice = this.getSelectedDrinkItemPrice(orderedDrink.otherDrinkId);
      subtotal += drinkItemPrice * orderedDrink.quantity;
    }
  
    // Calculate VAT and Discount based on fetched values
    const vatAmount = this.calculateVat(subtotal);
    const discountAmount = this.calculateDiscount(subtotal);

    console.log('Subtotal:', subtotal);
  console.log('VAT Amount:', vatAmount);
  console.log('Discount Amount:', discountAmount);

  
    

  
     // Calculate the final total
     this.finalTotal = subtotal + vatAmount - discountAmount;
    // Update the total VAT and total Discount
    this.totalVat = vatAmount;
    this.totalDiscount = discountAmount;
  }
  


  //fetching a vat %
  fetchVatById(vatId: number) {
    this.mainService.GetVatItemById(vatId).subscribe((data: any) => {
      this.vat = data.amount;
    });
  }

  //fetching a discount %
  fetchDiscountById(discountId: number) {
    this.mainService.GetDiscountItemById(discountId).subscribe((data: any) => {
      this.discount = data.amount;
    });
  }

   // Calculate VAT and set the vat property
   calculateVat(subtotal: number): number {
    const vatAmount = (this.vat) * subtotal;
     return vatAmount;
  }

  // Calculate Discount and set the discount property
  calculateDiscount(subtotal: number): number {
    // Calculate Discount based on the subtotal
  const discountAmount = (this.discount) * subtotal;
  return discountAmount;
  }


}
