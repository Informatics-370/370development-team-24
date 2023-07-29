import { Injectable } from '@angular/core';
import { KitchenOrder } from '../shared/kitchen-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private kitchenOrdersKey = 'kitchenOrders';
  constructor() { }


  // Save kitchen orders to local storage
  saveKitchenOrders(orders: KitchenOrder[]): void {
    localStorage.setItem(this.kitchenOrdersKey, JSON.stringify(orders));
  }

  // Get kitchen orders from local storage
  getKitchenOrders(): KitchenOrder[] {
    const ordersString = localStorage.getItem(this.kitchenOrdersKey);
    return ordersString ? JSON.parse(ordersString) : [];
  }
}
