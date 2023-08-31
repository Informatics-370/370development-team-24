import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../service/main.service';
import { KitchenOrderView } from '../shared/kitchen-order-view';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-edit-kitchen-order',
  templateUrl: './edit-kitchen-order.component.html',
  styleUrls: ['./edit-kitchen-order.component.scss'],
})
export class EditKitchenOrderComponent  implements OnInit {
  @Input() orderData!: KitchenOrderView;  //recieve the order data from the parent component


  kitchenOrder: any; // Define the kitchen order object
  kitchenOrderId!: number; // The ID of the kitchen order to edit

  constructor(private mainService: MainService,
              private route: ActivatedRoute, 
              private router: Router,
              private modalController: ModalController) { }



 ngOnInit() {
  // Get the ID of the kitchen order from the route parameter
  this.route.paramMap.subscribe(params => {
    const kitchenOrderIdParam = params.get('kitchenOrderId');
    
    if (kitchenOrderIdParam !== null) {
      this.kitchenOrderId = +kitchenOrderIdParam; // Convert the parameter to a number
      this.loadKitchenOrder(this.kitchenOrderId); // Load the kitchen order data
    } else {
      // Handle the case where kitchenOrderIdParam is null, e.g., show an error message or redirect.
    }
  });
}

loadKitchenOrder(kitchenOrderId: number) {
  this.mainService.getKitchenOrderById(kitchenOrderId).subscribe(
    (kitchenOrder) => {
      // Handle the retrieved kitchen order data
      this.kitchenOrder = kitchenOrder;
    },
    (error) => {
      // Handle errors, such as displaying an error message
      console.error('Error fetching kitchen order details:', error);
    }
  );
}

  // Function to update the kitchen order
  updateKitchenOrder() {
    this.mainService.updateKitchenOrder(this.kitchenOrder).subscribe(() => {
      // Redirect to a success page or update the UI as needed
      this.router.navigate(['/order']); // Redirect to a success page
    }, error => {
      console.error('Error updating kitchen order:', error);
      // Handle the error, display a message, or update the UI accordingly
    });
  }

  async closeModal() {
    await this.modalController.dismiss(); // Close the modal
  }

}
