import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { KitchenOrderView, OrderedMenuItem, OrderedDrink } from '../shared/kitchen-order-view'; // Import your data models

@Component({
  selector: 'app-add-kitchen-order',
  templateUrl: './add-kitchen-order.component.html',
  styleUrls: ['./add-kitchen-order.component.scss'],
})
export class AddKitchenOrderComponent {
  order: KitchenOrderView;
  newMenuItem: OrderedMenuItem = new OrderedMenuItem(); // Initialize a new item
  newDrinkItem: OrderedDrink = new OrderedDrink(); // Initialize a new item
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.order = this.navParams.get('order');
  }

  // Handle adding the new item
  addNewItem() {
    // You can perform validation here for the new item

    // Add the new item to the order's OrderedMenuItems array
    this.order.OrderedMenuItems.push(this.newMenuItem);
    this.order.OrderedDrinks.push(this.newDrinkItem);

    // Close the modal and pass back the updated order
    this.modalController.dismiss({ updatedOrder: this.order });
  }

  addNewDrinkItem() {
    // You can perform validation here for the new item

    // Add the new item to the order's OrderedMenuItems array
    this.order.OrderedDrinks.push(this.newDrinkItem);
    

    // Close the modal and pass back the updated order
    this.modalController.dismiss({ updatedOrder: this.order });
  }

  // Handle canceling the add operation
  cancel() {
    // Close the modal without adding the item
    this.modalController.dismiss();
  }
}
