import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KitchenOrderView } from '../shared/kitchen-order-view';

@Injectable({
  providedIn: 'root'
})
export class Option2OrderService {
  private selectedOrderSubject = new BehaviorSubject<KitchenOrderView | null>(null);
  selectedOrder$ = this.selectedOrderSubject.asObservable();

  constructor() { }
  setSelectedOrder(order: KitchenOrderView) {
    this.selectedOrderSubject.next(order);
  }

  getSelectedOrder() {
    return this.selectedOrderSubject.value;
  }

  clearSelectedOrder() {
    this.selectedOrderSubject.next(null);
  }
}
