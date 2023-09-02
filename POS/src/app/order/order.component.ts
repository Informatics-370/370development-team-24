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
import { DrinkType } from '../shared/drink-type';
import { AlertController, ToastController } from '@ionic/angular';

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
  drinkType: DrinkType [] = [];

  isDrinkSelected = false;
  kitchenOrderNumber: string = '';
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


  //for success alert
  isAlertOpen = false;
  public alertButtons = ['OK'];



  constructor(private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private orderService: OrderService,
    private toastController: ToastController,
    private alertController: AlertController) { }

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
    this.updateSubtotal();
    this.updateSubtotalAndTotals();
  }

  //to submit to kitchen screen function
   /*submitOrder() {
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

    


    

    
  }*/
  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Order submitted successfully!',
      duration: 5000, // You can adjust the duration as needed
      position: 'top', // You can change the position if desired
      color: 'success', // You can change the color to match your design
    });
    toast.present();
  }

  //NEW SUBMIT METHOD
  /*submitOrder(isOpen: boolean) {
    
    // Ensure that orderedMenuItemDtos and orderedDrinkDtos are initialized as empty arrays
  if (!this.orderMenuItemDtos) {
    this.orderMenuItemDtos = [];
  }
  if (!this.orderDrinkDtos) {
    this.orderDrinkDtos = [];
  }

  if (this.tableNumber) {
      
    this.kitchenOrderNumber = `SIT-${this.generateOrderNumber()}`;
  } else {
    this.tableNumber = '';
    this.kitchenOrderNumber = `TAKE-${this.generateOrderNumber()}`;
  }
    // Gather all the necessary order details
    const tableNumber = this.tableNumber;
    const kitchenOrderNumber = this.kitchenOrderNumber;
    const subtotal = this.subtotal;
    const vat = this.totalVat;
    const discount = this.totalDiscount;
    const total = this.finalTotal;
    const orderedMenuItems = this.orderedItems
    const orderedDrinks = this.orderedDrinks
    const orderedMenuItemDtos = this.orderedItems.map(item => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity
    }));
    const orderedDrinkDtos = this.orderedDrinks.map(drink => ({
      otherDrinkId: drink.otherDrinkId,
      quantity: drink.quantity
    }));

    try{
      
    
    // Call the service to send the order data to the backend
    this.mainService.addKitchenOrder(
      
      tableNumber,
      kitchenOrderNumber,
      subtotal,
      vat,
      discount,
      total,
      orderedMenuItems,
      orderedDrinks,
      orderedMenuItemDtos,
      orderedDrinkDtos,
      
    );
     // Display a success notification
    
   
    
      // The order was successfully submitted
      // You can add any additional logic here, e.g., clear the order form
      this.isAlertOpen = isOpen;
      this.router.navigate(['/view-kitchen-orders']);

    } catch(error) {
      // Handle any errors that occur during the submission
      console.error('Error submitting order:', error);
      // You can also display an error message to the user
    }
  }*/





  ///lets play
  

  async submitOrder() {
    // Ensure that orderedMenuItemDtos and orderedDrinkDtos are initialized as empty arrays
    if (!this.orderMenuItemDtos) {
      this.orderMenuItemDtos = [];
    }
    if (!this.orderDrinkDtos) {
      this.orderDrinkDtos = [];
    }

    // Generate a kitchen order number based on whether it's dine-in or take-away
    if (this.tableNumber) {
      this.kitchenOrderNumber = `SIT-${this.generateOrderNumber()}`;
    } else {
      this.tableNumber = '';
      this.kitchenOrderNumber = `TAKE-${this.generateOrderNumber()}`;
    }

    // Gather all the necessary order details
    const tableNumber = this.tableNumber;
    const kitchenOrderNumber = this.kitchenOrderNumber;
    const subtotal = this.subtotal;
    const vat = this.totalVat;
    const discount = this.totalDiscount;
    const total = this.finalTotal;
    const orderedMenuItems = this.orderedItems;
    const orderedDrinks = this.orderedDrinks;

    // Create DTOs for ordered items and drinks
    const orderedMenuItemDtos = this.orderedItems.map(item => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity,
    }));
    const orderedDrinkDtos = this.orderedDrinks.map(drink => ({
      otherDrinkId: drink.otherDrinkId,
      quantity: drink.quantity,
    }));

    try {
      // Call the service to send the order data to the backend
      await this.mainService.addKitchenOrder(
        tableNumber,
        kitchenOrderNumber,
        subtotal,
        vat,
        discount,
        total,
        orderedMenuItems,
        orderedDrinks,
        orderedMenuItemDtos,
        orderedDrinkDtos
      );

      // The order was successfully submitted
      // You can add any additional logic here, e.g., clear the order form

      // Display a success alert modal
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Order submitted!',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              // This function is called when the "OK" button is clicked
              // You can add any additional logic here if needed
              // Navigate to another page after clicking "OK"
              this.router.navigate(['/view-kitchen-orders']);
            },
          },
        ],
      });
      await alert.present();

      // Reset the ordered items and drinks after a successful order submission
      this.orderedItems = [];
      this.orderedDrinks = [];

      // Clear the table number and kitchen order number
      this.tableNumber = '';
      this.kitchenOrderNumber = '';

      // Reset subtotal, VAT, and Discount
      this.subtotal = 0;
      this.totalVat = 0;
      this.totalDiscount = 0;
      this.finalTotal = 0;
    } catch (error) {
      // Handle any errors that occur during the submission
      console.error('Error submitting order:', error);

      // Display an error alert modal
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error submitting order. Please try again.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  

  /*async presentSuccessAlert() {
    console.log('present alert');
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Order Submitted!',
      buttons: ['OK'],
    });
  
    await alert.present();
  }*/
  

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

  // Update subtotal, VAT, and Discount when ordered items change
  
}
  



