import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KitchenOrderViewModel } from '../shared/kitchen-order';

@Component({
  selector: 'app-kitchen-screen',
  templateUrl: './kitchen-screen.component.html',
  styleUrls: ['./kitchen-screen.component.scss'],
})
export class KitchenScreenComponent  implements OnInit {
  kitchenOrderNumber!: string | null;
  kitchenOrder!: KitchenOrderViewModel;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {

     // Get the kitchenOrderNumber from the route parameters
     this.route.paramMap.subscribe((params) => {
      this.kitchenOrderNumber = params.get('kitchenOrderNumber');
      // Fetch the order details based on the kitchenOrderNumber
      this.fetchKitchenOrderDetails();
    });
  }

  fetchKitchenOrderDetails() {
    // Send an HTTP GET request to fetch the order details based on the kitchenOrderNumber
    this.http
      .get<KitchenOrderViewModel>(
        `https://localhost:49991/api/Order/GetKitchenOrder/${this.kitchenOrderNumber}`
      )
      .subscribe(
        (order) => {
          // Order details fetched successfully
          this.kitchenOrder = order;
        },
        (error) => {
          console.error('Error fetching order details:', error);
          // Handle error if needed
        }
      );
  }

}
