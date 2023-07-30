import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KitchenOrder } from '../shared/kitchen-order';

@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.scss'],
})
export class PrintReceiptComponent  implements OnInit {
  @Input() order!: KitchenOrder;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onPrintReceipt() {
    console.log('Print receipt button clicked!');
    // Implement your logic for printing the receipt here
    // For demonstration purposes, we'll just close the modal after clicking the print button
    this.modalController.dismiss();
  }

  onCancel() {
    this.modalController.dismiss();
  }

}
