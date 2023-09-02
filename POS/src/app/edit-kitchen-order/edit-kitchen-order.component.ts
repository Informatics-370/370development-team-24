import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../service/main.service';
import { KitchenOrderView } from '../shared/kitchen-order-view';
import { ModalController, LoadingController } from '@ionic/angular';
import { ViewKitchenOrdersComponent } from '../view-kitchen-orders/view-kitchen-orders.component';

@Component({
  selector: 'app-edit-kitchen-order',
  templateUrl: './edit-kitchen-order.component.html',
  styleUrls: ['./edit-kitchen-order.component.scss'],
})
export class EditKitchenOrderComponent  implements OnInit {
 @Input() orderData!: KitchenOrderView;  //recieve the order data from the parent component


  kitchenOrder: any; // Define the kitchen order object
  KitchenOrderId!: number; // The ID of the kitchen order to edit
  //orderData!: KitchenOrderView;

  //////////IN LINE EDITING/////////
  // Properties to hold form data
  menuItemName!: string;
  updatedQuantity!: number;
  drinkItemName!: string;
  updatedDrinkQuantity!: number;
  updatedOrder: any;
  constructor(private mainService: MainService,
              private route: ActivatedRoute, 
              private router: Router,
              private modalController: ModalController,
              private loadingController: LoadingController) { }



 async ngOnInit() {
  // Get the ID of the kitchen order from the route parameter
  this.route.paramMap.subscribe(async (params) => {
    const kitchenOrderIdParam = params.get('KitchenOrderId');

    if (kitchenOrderIdParam !== null) {
      // Convert the parameter to a number and load the kitchen order data
      await this.loadKitchenOrder(+kitchenOrderIdParam);
    } else {
      // Handle the case where kitchenOrderIdParam is null, e.g., show an error message or redirect.
    }
  });


}


loadKitchenOrder(KitchenOrderId: number) {
  this.mainService.getKitchenOrderById(KitchenOrderId).subscribe(
    (kitchenOrder: KitchenOrderView) => {
      // Handle the retrieved kitchen order data
      console.log('API Response:', kitchenOrder);

      // Set this.orderData after the API call is complete
      this.orderData = kitchenOrder;

      // Now you can safely access this.orderData.OrderedMenuItems
      if (this.orderData && this.orderData.OrderedMenuItems) {
        // Access OrderedMenuItems safely
        console.log('OrderedMenuItems:', this.orderData.OrderedMenuItems);
      }
    },
    (error) => {
      // Handle errors, such as displaying an error message
      console.error('Error fetching kitchen order details:', error);
    }
  );
}



  // Function to update the kitchen order
  async openModal() {
    const modal = await this.modalController.create({
      component: EditKitchenOrderComponent, // Replace with your actual modal component
      componentProps: {
        // Pass any data or props to the modal if needed
      }
    });
  
    await modal.present();
  }

  async closeModal() {
    if (this.modalController) {
      const modal = await this.modalController.getTop(); // Get the top-most modal
  
      if (modal) {
        await modal.dismiss({ updatedOrder: this.updatedOrder });
      } else {
        console.warn('No modal to dismiss');
      }
    } else {
      console.warn('Modal controller is undefined');
    }
  }
  
  
 
 

  async onSubmit() {
    try {
      // Perform any validation or editing logic here
      // For example, ensure updatedQuantity is a valid number
      if (this.updatedQuantity < 0) {
        // Show an error message to the user
        console.error('Invalid quantity');
        return;
      }
  
      // Create an updated order object with all the edited fields
      const updatedOrder = {
        ...this.orderData,
        // Add the updated properties here based on your logic
        // For example:
        // OrderedMenuItems: updatedOrderedMenuItems,
        // OrderedDrinks: updatedOrderedDrinks,
      };
  
      // Check if the modal controller exists
      if (!this.modalController) {
        console.warn('Modal controller is undefined');
        return;
      }
  
      // Check if the modal is open
      const modal = await this.modalController.getTop();
      if (!modal) {
        console.warn('Modal is not open');
        return;
      }
  
      const loading = await this.loadingController.create({
        message: 'Saving changes...',
      });
      await loading.present();
  
      // Dismiss the modal and pass the updated data back to the calling component
      await this.modalController.dismiss({ updatedOrder }).then(() => {
        loading.dismiss();
      });
  
      // Dismiss the loading indicator
    } catch (error) {
      console.error('Error during modal dismissal:', error);
    }
  }
  
  
  

 


 

}
