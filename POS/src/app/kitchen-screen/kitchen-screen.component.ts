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
  kitchenOrderNumber: KitchenOrderViewModel | undefined;
  kitchenOrder!: KitchenOrderViewModel;
  orderSummary: KitchenOrderViewModel | null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private mainService: MainService
  ) { 
    this.orderSummary = this.mainService.getOrderSummary();
  }


  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const kitchenOrderNumber = params.get('kitchenOrderNumber');
      console.log('Kitchen Order Number from URL:', kitchenOrderNumber);

      if (kitchenOrderNumber) {
        this.mainService
          .getKitchenOrder(kitchenOrderNumber)
          .subscribe((kitchenOrder) => {
            console.log('Kitchen Order Data:', kitchenOrder);
            this.kitchenOrderNumber = kitchenOrder;
            console.log('Kitchen Order Display:', this.kitchenOrderNumber);
          });
      }
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

  clearOrderSummary() {
    this.mainService.clearOrderSummary();
    this.orderSummary = null; // Set the Order Summary data to null in the component as well
  }

}
