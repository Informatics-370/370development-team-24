import { Component, OnInit } from '@angular/core';
import { OrderType } from '../shared/order-type.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  orderTypes = [
    { orderType_Id: 1, name: 'Sit-in' },
    { orderType_Id: 2, name: 'Takeaway' },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  navigateToOrderScreen(orderType: string){
    this.router.navigate(['order', {type: orderType}]);
  }

 navigateToTable() {
    this.router.navigate(['table']);
  }


}
