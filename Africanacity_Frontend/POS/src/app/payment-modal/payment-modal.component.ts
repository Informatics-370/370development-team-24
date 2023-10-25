import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent  implements OnInit {
  @Input() order:any;
  selectedPaymentMethod!: string;

  constructor(private modalController: ModalController, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('Received order prop:', this.order);
    this.changeDetectorRef.detectChanges();
  }

  onPaymentSelection() {
    // Handle the selected payment method and update the order status accordingly
    if (this.selectedPaymentMethod === 'Cash') {
      // Update the order status to 'Order Completed - Cash'
      this.updateOrderStatus('Order Completed - Cash');
    } else if (this.selectedPaymentMethod === 'Card') {
      // Update the order status to 'Order Completed - Card'
      this.updateOrderStatus('Order Completed - Card');
    }

    // Close the modal
    this.modalController.dismiss();
  }

  updateOrderStatus(newStatus: string) {
    // Implement the logic to update the order status here
    // You may need to send an API request or update the status in your data store
  }


}
