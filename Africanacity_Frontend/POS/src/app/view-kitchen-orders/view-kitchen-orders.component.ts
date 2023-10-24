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
import { Option2OrderService } from '../service/option2-order.service';
import { AddKitchenOrderComponent } from '../add-kitchen-order/add-kitchen-order.component';
import { CustomAlertComponent } from '../success-custom-alert/custom-alert.component';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';


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

  completedOrders: KitchenOrderView[] = [];
  public progress = 0;
  

  constructor(private mainService: MainService,
    private modalController: ModalController, 
    private router: Router,
    private route: ActivatedRoute,
    private option2OrderService: Option2OrderService) {
      setInterval(() => {
        this.progress += 0.01;
  
        // Reset the progress bar when it reaches 100%
        // to continuously show the demo
       
      }, 50);
     }

     ngOnInit() {
      this.completedOrders = this.mainService.getCompletedOrders();
    }
    

 


    async showPaymentModal(order: any) {
      console.log('Opening payment modal');
      try {
        const modal = await this.modalController.create({
          component: PaymentModalComponent,
          componentProps: {
            order: order, // Pass the order data to the modal
          }
        });
       
        await modal.present();
      } catch (error) {
        console.error('Error opening payment modal:', error);
      }
    }
    



  


  
  


  

}

