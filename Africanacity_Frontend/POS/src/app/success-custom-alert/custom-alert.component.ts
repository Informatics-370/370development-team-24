import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss'],
})
export class CustomAlertComponent {
  @Input() order!: any;
  paymentOptions: any[] = [
    { label: 'Cash', checked: false },
    { label: 'Card', checked: false },
    // Add more payment options as needed
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  
  dismiss() {
    this.modalController.dismiss();
  }

  completePayment() {
    // Implement the logic to mark the order as paid using the selected payment methods
    // You can pass this information back to the parent component if needed
    // Close the modal
    this.modalController.dismiss();
  }

}
