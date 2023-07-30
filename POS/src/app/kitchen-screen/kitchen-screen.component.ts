import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KitchenOrder } from '../shared/kitchen-order';
import { MainService } from '../service/main.service';
import { MenuItem } from '../shared/menu-item.model';
import { Drink } from '../shared/drink';
import { OrderService } from '../service/order.service';
import { NotificationService } from '../service/notification.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-kitchen-screen',
  templateUrl: './kitchen-screen.component.html',
  styleUrls: ['./kitchen-screen.component.scss'],
})
export class KitchenScreenComponent implements OnInit {
  kitchenOrders: KitchenOrder[] = [];


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private mainService: MainService, 
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // Fetch all kitchen orders
    this.kitchenOrders = this.orderService.getKitchenOrders();
    
  }


  markOrderAsComplete(order: KitchenOrder) {
    // Update the order status or perform any other logic here
     

    // Generate the notification message
    const message = `Kitchen Order ${order.kitchenOrderNumber} is completed!`;
    console.log('Complete button clicked. Sending notification.');
    // Send the notification using the NotificationService
    this.notificationService.addNotification(message);

    
    
  }
}


  

