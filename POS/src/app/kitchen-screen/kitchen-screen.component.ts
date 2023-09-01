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
import { IonToast } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-kitchen-screen',
  templateUrl: './kitchen-screen.component.html',
  styleUrls: ['./kitchen-screen.component.scss'],
})
export class KitchenScreenComponent  implements OnInit {
  completionToast: HTMLIonToastElement | undefined;

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

  
  orderData: KitchenOrderView | undefined;
  
  
  constructor(private mainService: MainService,
    private modalController: ModalController, 
    private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController) { 
      
    }

  ngOnInit() {
     // Fetch all kitchen orders when the component is initialized
     this.mainService.getAllKitchenOrders().subscribe((orders: KitchenOrderView[]) => {
      this.kitchenOrders = orders;

      
    });
    const KitchenOrderId = 1; 
    this.mainService.getKitchenOrderById(KitchenOrderId).subscribe((order: KitchenOrderView) => {
      this.orderData = order; // Assign the fetched order data to orderData
    });
  


       // Fetch all kitchen orders when the component is initialized
   this.mainService.GetAllOrderedMenuItems().subscribe((result: any) => {
    this.orderedMenuItems = result;
    this.filteredOrderedMenuItems = this.orderedMenuItems;
    console.log('Menu Items orders: ', this.filteredOrderedMenuItems)
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

  // Call showCompletionNotification with the orderData when needed
showNotification() {
  if (this.orderData) {
    this.showCompletionNotification(this.orderData);
  }
}

  // Function to show the completion status notification
// Function to show the completion status notification
async showCompletionNotification(orderData: KitchenOrderView) {
  // Create a toast notification
  console.log('Complete button clicked!', orderData)
  this.completionToast = await this.toastController.create({
    message: `Order ${orderData.KitchenOrderNumber} is complete!`,
    duration: 3000, // Duration in milliseconds
    position: 'bottom', // Position of the notification
    buttons: [
      {
        text: 'Close',
        role: 'cancel',
      },
    ],
  });

  // Present the toast notification
  if (this.completionToast) {
    await this.completionToast.present();
  }
}
}
