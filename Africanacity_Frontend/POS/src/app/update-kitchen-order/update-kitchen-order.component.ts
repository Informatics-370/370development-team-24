import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../service/main.service';
import { KitchenOrderView } from '../shared/kitchen-order-view';
import { Option2OrderService } from '../service/option2-order.service';

@Component({
  selector: 'app-update-kitchen-order',
  templateUrl: './update-kitchen-order.component.html',
  styleUrls: ['./update-kitchen-order.component.scss'],
})
export class UpdateKitchenOrderComponent  implements OnInit {
  @Input() orderData!: KitchenOrderView;
  kitchenOrder: any; // Define the kitchen order object
  KitchenOrderId!: number;

  constructor(private mainService: MainService,
    private route: ActivatedRoute, 
    private router: Router,
    private option2OrderService: Option2OrderService
  ) { }

  async ngOnInit() {
    // Get the ID of the kitchen order from the route parameter
    this.route.paramMap.subscribe(async (params) => {
      const kitchenOrderIdParam = params.get('KitchenOrderId');
  
      if (kitchenOrderIdParam !== null) {
        // Convert the parameter to a number and load the kitchen order data
        await this.loadKitchenOrder(+kitchenOrderIdParam);
      } else {
        // Handle the case where kitchenOrderIdParam is null, e.g., show an error message or redirect.
      }
    });
  
  
  }

  loadKitchenOrder(KitchenOrderId: number) {
    this.mainService.getKitchenOrderById(KitchenOrderId).subscribe(
      (kitchenOrder: KitchenOrderView) => {
        // Handle the retrieved kitchen order data
        console.log('API Response:', kitchenOrder);
  
        // Set this.orderData after the API call is complete
        this.orderData = kitchenOrder;
  
        // Now you can safely access this.orderData.OrderedMenuItems
        if (this.orderData && this.orderData.OrderedMenuItems) {
          // Access OrderedMenuItems safely
          console.log('OrderedMenuItems:', this.orderData.OrderedMenuItems);
        }
      },
      (error) => {
        // Handle errors, such as displaying an error message
        console.error('Error fetching kitchen order details:', error);
      }
    );
  }

  navigateToAddItem() {
    // Navigate to the add-item screen and pass the existing order data as query parameters
    const queryParams = {
      kitchenOrderNumber: this.orderData.KitchenOrderNumber,
      tableNumber: this.orderData.TableNumber,
      orderedItems: this.orderData.OrderedMenuItems,
      orderedDrinks: this.orderData.OrderedDrinks,
      subtotal: this.orderData.Subtotal,
      vat: this.orderData.VAT,
      discount: this.orderData.Discount,
      total: this.orderData.Total
      
      // Add other properties as needed
    };
  
    this.router.navigate(['/add-item'], { queryParams });
  }
  

  onSubmit() {
    // Call your service to update the KitchenOrder in the database with the modified orderData
    this.mainService.updateKitchenOrder(this.orderData).subscribe(
      (response) => {
        // Handle success, e.g., show a success message
        console.log('Order updated successfully:', response);
      },
      (error) => {
        // Handle error, e.g., show an error message
        console.error('Error updating order:', error);
      }
    );
  }
  

}
