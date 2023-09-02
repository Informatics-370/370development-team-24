import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { KitchenOrder } from '../shared/kitchen-order';
import { OrderedItem } from '../shared/ordered-item';
import { OrderedMenuItem } from '../shared/ordered-menu-item';
import { OrderedDrinkItem } from '../shared/ordered-drink-item';
import { KitchenOrderView } from '../shared/kitchen-order-view';
import { ModalController } from '@ionic/angular';
import { EditKitchenOrderComponent } from '../edit-kitchen-order/edit-kitchen-order.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Option2OrderService } from '../service/option2-order.service';
import { AddKitchenOrderComponent } from '../add-kitchen-order/add-kitchen-order.component';
//service for the edit process


@Component({
  selector: 'app-view-kitchen-orders',
  templateUrl: './view-kitchen-orders.component.html',
  styleUrls: ['./view-kitchen-orders.component.scss'],
})
export class ViewKitchenOrdersComponent  implements OnInit {

  //kitchenOrders: KitchenOrder[] = [];
  filteredKitchenOrders: KitchenOrder [] = [];
  kitchenOrders: KitchenOrderView [] = [];

  orderedMenuItems: OrderedMenuItem [] = [];
  filteredOrderedMenuItems: OrderedMenuItem [] = [];

  orderedDrinkItems: OrderedDrinkItem [] = [];
  filteredOrderedDrinkItems: OrderedDrinkItem [] = [];

  //for edit purposes

  // Create a property to store the selected order for editing
  selectedOrder!: KitchenOrderView;
  // Create a boolean flag to control the visibility of the edit form
  isEditFormVisible: boolean = false;

  orderData!: KitchenOrderView;
  

  constructor(private mainService: MainService,
    private modalController: ModalController, 
    private router: Router,
    private route: ActivatedRoute,
    private option2OrderService: Option2OrderService) { }

  ngOnInit() {
     // Fetch all kitchen orders when the component is initialized
     this.mainService.getAllKitchenOrders().subscribe((orders: KitchenOrderView[]) => {
      this.kitchenOrders = orders;
    });
  


  // Fetch all kitchen orders when the component is initialized
   this.mainService.GetAllOrderedMenuItems().subscribe((result: any) => {
    this.orderedMenuItems = result;
    this.filteredOrderedMenuItems = this.orderedMenuItems;
    console.log('Menu Items orderes: ', this.filteredOrderedMenuItems)
  });

  this.mainService.GetAllOrderedDrinksItems().subscribe((result: any) => {
    this.orderedDrinkItems = result;
    this.filteredOrderedDrinkItems = this.orderedDrinkItems;
    console.log('Drink orders: ', this.filteredOrderedDrinkItems)
  });

  }

  // Function to open the edit form for a specific order
  editOrder(order: KitchenOrderView) {
    console.log("edit button clicked! for order:", order)
    this.router.navigate(['/edit-kitchen-order/:KitchenOrderId', { KitchenOrderId: order.KitchenOrderId }]);
  }


  //inline editing option
  /*async editMenuItem(order: KitchenOrderView, menuItem: KitchenOrderView['OrderedMenuItems'][0]) {
    const modal = await this.modalController.create({
      component: EditKitchenOrderComponent,
      componentProps: {
        order,
        menuItem,
      },
      cssClass: 'my-custom-modal' 
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
  
    if (data && data.updatedMenuItem) {
      // Update the menu item or perform other actions as needed
      // You can access the updated menu item data using data.updatedMenuItem
      const updatedMenuItem = data.updatedMenuItem;
      // Find the index of the menuItem in the order and update it
      const index = order.OrderedMenuItems.findIndex((omi) => omi === menuItem);
      if (index !== -1) {
        order.OrderedMenuItems[index] = updatedMenuItem;
      }
    }
  }
  
  async editDrinkItem(order: KitchenOrderView, drinkItem: KitchenOrderView['OrderedDrinks'][0]) {
    const modal = await this.modalController.create({
      component: EditKitchenOrderComponent,
      componentProps: {
        order,
        drinkItemName: drinkItem.OtherDrink.Name, // Access the menu item name using MenuItem.Name
        quantity: drinkItem.Quantity,
      },
      cssClass: 'my-custom-modal' 
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
  
    if (data && data.updatedQuantity !== undefined) {
      // Update the quantity in the order or perform other actions as needed
      drinkItem.Quantity = data.updatedQuantity; // Update the Quantity property of menuItem
    }
  }


  removeMenuItem(order: KitchenOrderView, index: number) {
    // Remove the menu item from the order
    if (index >= 0 && index < order.OrderedMenuItems.length) {
      order.OrderedMenuItems.splice(index, 1);
    }
  }

  removeDrinkItem(order: KitchenOrderView, index: number) {
    // Remove the menu item from the order
    if (index >= 0 && index < order.OrderedDrinks.length) {
      order.OrderedDrinks.splice(index, 1);
    }
  }


  async addMenuItemToOrder(order: KitchenOrderView) {
    const modal = await this.modalController.create({
      component: AddKitchenOrderComponent, // Create a new modal component for adding items
      componentProps: {
        order,
      },
      cssClass: 'my-custom-modal' 
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
  
    if (data && data.newMenuItem) {
      // Add the new menu item to the order
      order.OrderedMenuItems.push(data.newMenuItem);
    }
  }

  async addDrinkItemToOrder(order: KitchenOrderView) {
    const modal = await this.modalController.create({
      component: AddKitchenOrderComponent, // Create a new modal component for adding items
      componentProps: {
        order,
      },
      cssClass: 'my-custom-modal' 
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
  
    if (data && data.newMenuItem) {
      // Add the new menu item to the order
      order.OrderedDrinks.push(data.newDrinkItem);
    }
  }*/
  


  

}

