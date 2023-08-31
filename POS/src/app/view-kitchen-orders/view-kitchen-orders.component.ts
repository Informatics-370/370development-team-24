import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { KitchenOrder } from '../shared/kitchen-order';
import { OrderedItem } from '../shared/ordered-item';
import { OrderedMenuItem } from '../shared/ordered-menu-item';
import { OrderedDrinkItem } from '../shared/ordered-drink-item';

@Component({
  selector: 'app-view-kitchen-orders',
  templateUrl: './view-kitchen-orders.component.html',
  styleUrls: ['./view-kitchen-orders.component.scss'],
})
export class ViewKitchenOrdersComponent  implements OnInit {

  kitchenOrders: KitchenOrder[] = [];
  filteredKitchenOrders: KitchenOrder [] = [];

  orderedMenuItems: OrderedMenuItem [] = [];
  filteredOrderedMenuItems: OrderedMenuItem [] = [];

  orderedDrinkItems: OrderedDrinkItem [] = [];
  filteredOrderedDrinkItems: OrderedDrinkItem [] = [];

  constructor(private mainService: MainService) { }

  ngOnInit() {
     // Fetch all kitchen orders when the component is initialized
   this.mainService.getAllKitchenOrders().subscribe((result: any) => {
      this.kitchenOrders = result;
      this.filteredKitchenOrders = this.kitchenOrders;
      console.log('Kitchen orders: ', this.filteredKitchenOrders)
    });

       // Fetch all kitchen orders when the component is initialized
   this.mainService.GetAllOrderedMenuItems().subscribe((result: any) => {
    this.orderedMenuItems = result;
    this.filteredOrderedMenuItems = this.orderedMenuItems;
    console.log('Drink orders: ', this.filteredOrderedMenuItems)
  });

  this.mainService.GetAllOrderedDrinksItems().subscribe((result: any) => {
    this.orderedDrinkItems = result;
    this.filteredOrderedDrinkItems = this.orderedDrinkItems;
    console.log('Drink orders: ', this.filteredOrderedDrinkItems)
  });

  }

}
