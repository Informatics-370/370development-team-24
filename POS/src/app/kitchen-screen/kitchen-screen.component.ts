import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KitchenOrder } from '../shared/kitchen-order';
import { MainService } from '../service/main.service';
import { MenuItem } from '../shared/menu-item.model';
import { Drink } from '../shared/drink';
import { OrderService } from '../service/order.service';

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
    private orderService: OrderService
  ) {}

  ngOnInit() {
    // Fetch all kitchen orders
    this.kitchenOrders = this.orderService.getKitchenOrders();
    
  }


  
}
