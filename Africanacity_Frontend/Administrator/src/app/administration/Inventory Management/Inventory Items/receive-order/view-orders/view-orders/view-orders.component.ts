import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { Supplier_Inventory } from 'src/app/shared/supplieritem';


@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit{
 
  supplieritems: Supplier_Inventory[] = []
  filteredsupplieritems: Supplier_Inventory[] = [];
  
  constructor(private inventoryservice: InventoryService, private snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router){}


  ngOnInit(): void {
    this.GetAllInventoryOrders()
    console.log(this.supplieritems)

    this.filteredsupplieritems = this.supplieritems
    console.log(this.filteredsupplieritems)

  }


  GetAllInventoryOrders()
  {
    this.inventoryservice.GetAllInventoryOrders().subscribe(result => {
      let supplieritemList:any[] = result
      supplieritemList.forEach((element) => {
        this.supplieritems.push(element)
        
      });
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredsupplieritems = this.supplieritems.filter(supplieritem => {
      const column2Value = supplieritem.inventoryItemName.toLowerCase(); // Assuming you want to filter by inventoryItemName
      const column3Value = supplieritem.supplierName.toLowerCase();
  
      return column2Value.includes(filterValue) || column3Value.includes(filterValue);
    });
  }
  


}
