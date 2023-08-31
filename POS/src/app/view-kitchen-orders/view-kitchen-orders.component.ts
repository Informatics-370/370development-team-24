import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { KitchenOrder } from '../shared/kitchen-order';

@Component({
  selector: 'app-view-kitchen-orders',
  templateUrl: './view-kitchen-orders.component.html',
  styleUrls: ['./view-kitchen-orders.component.scss'],
})
export class ViewKitchenOrdersComponent  implements OnInit {

  kitchenOrders: KitchenOrder[] = [];
  filteredKitchenOrders: KitchenOrder [] = [];

  constructor(private mainService: MainService) { }

  ngOnInit() {
    // Fetch all kitchen orders when the component is initialized
    this.mainService.getAllKitchenOrders().subscribe((result: any) => {
      this.kitchenOrders = result;
      this.filteredKitchenOrders = this.kitchenOrders;
      console.log('Kitchen orders: ', this.filteredKitchenOrders)
    });

  }

}
