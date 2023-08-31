import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { KitchenOrder } from '../shared/kitchen-order';
import { OrderedItem } from '../shared/ordered-item';
import { OrderedMenuItem } from '../shared/ordered-menu-item';
import { OrderedDrinkItem } from '../shared/ordered-drink-item';
import { KitchenOrderView } from '../shared/kitchen-order-view';
import { ModalController } from '@ionic/angular';
import { EditKitchenOrderComponent } from '../edit-kitchen-order/edit-kitchen-order.component';

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

  constructor(private mainService: MainService,
    private modalController: ModalController) { }

  ngOnInit() {
     // Fetch all kitchen orders when the component is initialized
     this.mainService.getAllKitchenOrders().subscribe((orders: KitchenOrderView[]) => {
      this.kitchenOrders = orders;
    });
  


       // Fetch all kitchen orders when the component is initialized
   this.mainService.GetAllOrderedMenuItems().subscribe((result: any) => {
    this.orderedMenuItems = result;
    this.filteredOrderedMenuItems = this.orderedMenuItems;
    console.log('Drink orders: ', this.filteredOrderedMenuItems)
  });

  this.mainService.GetAllOrderedDrinksItems().subscribe((result: any) => {
    this.orderedDrinkItems = result;
    this.filteredOrderedDrinkItems = this.orderedDrinkItems;
    console.log('Drink orders: ', this.filteredOrderedDrinkItems)
  });

  }

  // Function to open the edit form for a specific order
  async editOrder(order: KitchenOrderView) {
    console.log("edit button clicked!")
    const modal = await this.modalController.create({
      component: EditKitchenOrderComponent,
      componentProps: {
        orderData: order // Pass the order data to the edit form component
      }
    });
  
    await modal.present();
  }

}
