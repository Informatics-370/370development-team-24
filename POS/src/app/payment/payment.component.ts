import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { KitchenOrder } from '../shared/kitchen-order';
import { ModalController } from '@ionic/angular';
import { PrintReceiptComponent } from '../print-receipt/print-receipt.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent  implements OnInit {

  order!: KitchenOrder | undefined;

  constructor(private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController ) { }

    ngOnInit() {
      this.route.params.subscribe((params) => {
        const kitchenOrderNumber = params['kitchenOrderNumber'];
        this.order = this.orderService.getKitchenOrderByNumber(kitchenOrderNumber);
      });
    }

   async onPaidButtonClick() {
      console.log('Paid button clicked!');

        // Show the print receipt modal here
      if (this.order) {
        // Perform any payment processing logic here
        // For demonstration purposes, we'll just update the order status
        this.order.status = 'paid';
  
        // Save the updated kitchen orders to local storage
        this.orderService.saveKitchenOrders(this.orderService.getKitchenOrders());
  
        // Show the print receipt modal here
        // You can use a third-party library like ngx-bootstrap or implement your custom modal
        // For demonstration purposes, we'll assume the receipt is printed and proceed to navigate back to the Kitchen Screen
        this.goBackToKitchenScreen();
      } else {
        // Handle the case where the order is undefined
        // For example, you can redirect to an error page or show a message
        console.log('Order not found or undefined.');
      }

      const modal = await this.modalController.create({
        component: 'modal', // Replace 'modal-content' with the actual name of your modal content template
        cssClass: 'my-custom-modal-class', // Replace with your custom CSS class if needed
        componentProps: {
          order: this.order // Pass the order object to the modal
        }
      });
      return await modal.present()
    }

  
    goBackToKitchenScreen() {
      // Navigate back to the Kitchen Screen
      // You can also pass any parameters if needed
      this.router.navigate(['/kitchen-screen']);
    }

    

}
