import { Component, OnInit } from '@angular/core';
import { OrderType } from '../shared/order-type.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  orderTypes: OrderType[] = [];

  constructor() { }

  ngOnInit() {
    //simulating API Call to fetch order types
    this.fetchOrderTypes();
  }

  fetchOrderTypes() {
    // Replace this with your actual API call to fetch order types
    // Example response data
    const apiResponse: OrderType[] = [
      { orderType_Id: 1, name: 'Sit-in' },
      { orderType_Id: 2, name: 'Takeaway' },
    ];

    this.orderTypes = apiResponse;
  }


}
