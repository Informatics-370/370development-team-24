import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../service/main.service';
import { KitchenOrderView } from '../shared/kitchen-order-view';
import { ModalController, LoadingController } from '@ionic/angular';

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
  constructor(private mainService: MainService,
              private route: ActivatedRoute, 
              private router: Router,
              private modalController: ModalController,
              private loadingController: LoadingController) { }



 ngOnInit() {
    // Get the ID of the kitchen order from the route parameter
    console.log(this.orderData)
    this.route.paramMap.subscribe((params) => {
      const kitchenOrderIdParam = params.get('KitchenOrderId');

      if (kitchenOrderIdParam !== null) {
        this.loadKitchenOrder(+kitchenOrderIdParam); // Convert the parameter to a number and load the kitchen order data
      } else {
        // Handle the case where kitchenOrderIdParam is null, e.g., show an error message or redirect.
      }
    });
    
  }


 loadKitchenOrder(KitchenOrderId: number) {
    this.mainService.getKitchenOrderById(KitchenOrderId).subscribe(
      (kitchenOrder: KitchenOrderView) => {
        // Handle the retrieved kitchen order data
        console.log('API Response:', kitchenOrder)
        this.orderData = kitchenOrder;
      },
      (error) => {
        // Handle errors, such as displaying an error message
        console.error('Error fetching kitchen order details:', error);
      }
    );
    console.log(this.orderData)
  }

  // Function to update the kitchen order
 
  updateKitchenOrder() {
    this.mainService.updateKitchenOrder(this.orderData).subscribe(
      () => {
        // Redirect to a success page or update the UI as needed
        this.router.navigate(['/order']); // Redirect to a success page
      },
      (error) => {
        console.error('Error updating kitchen order:', error);
        // Handle the error, display a message, or update the UI accordingly
      }
    );
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
      const updatedOrder = { ...this.orderData };
        // Check if the modal controller exists before attempting to dismiss
        if (this.modalController) {
          const loading = await this.loadingController.create({
            message: 'Saving changes...',
          });
          await loading.present();
          
          // Dismiss the modal and pass the updated data back to the calling component
          await this.modalController.dismiss({ updatedOrder });
  
          // Dismiss the loading indicator
          await loading.dismiss();;
      } else {
        console.warn('Modal controller is undefined');
      }
    } catch (error) {
      console.error('Error during modal dismissal:', error);
    }
  }
  
  

 


 

}
