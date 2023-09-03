import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KitchenOrder } from '../shared/kitchen-order';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.scss'],
})
export class PrintReceiptComponent  implements OnInit {
  @Input() order!: KitchenOrder;

  

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  

}
