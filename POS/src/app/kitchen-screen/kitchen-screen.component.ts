import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KitchenOrder } from '../shared/kitchen-order';
import { MainService } from '../service/main.service';
import { MenuItem } from '../shared/menu-item.model';
import { Drink } from '../shared/drink';

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
    private mainService: MainService
  ) {}

  ngOnInit() {
    // Fetch all kitchen orders
    this.fetchKitchenOrderDetails();
  }

  fetchKitchenOrderDetails(): void {
    this.mainService.getAllKitchenOrders().subscribe(
      (result: KitchenOrder[]) => {
        this.kitchenOrders = result;
      },
      (error) => {
        console.error('Error fetching kitchen orders:', error);
        // Handle error if needed
      }
    );
  }

  // Method to display ordered items as a comma-separated string
  getOrderedItemsString(orderedItems: string[]): string {
    return orderedItems.join(', ');
  }

  // Method to display ordered drinks as a comma-separated string
  getOrderedDrinksString(orderedDrinks: string[]): string {
    return orderedDrinks.join(', ');
  }
}
