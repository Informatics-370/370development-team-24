import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KitchenOrderView } from '../shared/kitchen-order-view';

@Injectable({
  providedIn: 'root'
})
export class Option2OrderService {
  private addedItemData: any[] = [];

  // Set the added item data
  setAddedItemData(data: any): void {
    this.addedItemData = data;
  }

  // Get the added item data
  getAddedItemData(): any[] {
    return this.addedItemData;
  }





}
