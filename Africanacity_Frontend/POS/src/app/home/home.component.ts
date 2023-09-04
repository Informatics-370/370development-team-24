import { Component, OnInit } from '@angular/core';
import { OrderType } from '../shared/order-type.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showTabs = true;
  public progress = 0;


  orderTypes = [
    { orderType_Id: 1, name: 'Sit-in' },
    { orderType_Id: 2, name: 'Takeaway' },
  ];

  constructor(private router: Router) {
    setInterval(() => {
      this.progress += 0.01;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
     
    }, 50);
  }
   

  ngOnInit(): void {
    
  }

  navigateToOrderScreen(orderType: string): void {
    if (orderType === 'Sit-in') {
      this.router.navigate(['/table']);
    } else if (orderType === 'Takeaway') {
      this.router.navigate(['/order']);
    }
  }

 navigateToTable() {
    this.router.navigate(['table']);
  }


}
