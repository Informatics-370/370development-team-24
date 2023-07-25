import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KitchenOrderViewModel } from '../shared/kitchen-order';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-kitchen-screen',
  templateUrl: './kitchen-screen.component.html',
  styleUrls: ['./kitchen-screen.component.scss'],
})
export class KitchenScreenComponent  implements OnInit {
  kitchenOrderNumber: KitchenOrderViewModel |undefined;
  kitchenOrder!: KitchenOrderViewModel;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private mainService: MainService
  ) { }

  ngOnInit() {

     // Get the kitchenOrderNumber from the route parameters
     this.route.paramMap.subscribe((params) => {
      const kitchenOrderNumber = params.get('kitchenOrderNumber');
      // Fetch the order details based on the kitchenOrderNumber
      this.fetchKitchenOrderDetails(kitchenOrderNumber);
    });
  }

  fetchKitchenOrderDetails(kitchenOrderNumber: string | null): void {
    
    if (kitchenOrderNumber) {
      this.mainService.getKitchenOrder(kitchenOrderNumber).subscribe(
        (result: KitchenOrderViewModel) => {
          this.kitchenOrder = result;
        },
        (error) => {
          console.error('Error fetching kitchen order:', error);
          // Handle error if needed
        }
      );
    }
  }

}
