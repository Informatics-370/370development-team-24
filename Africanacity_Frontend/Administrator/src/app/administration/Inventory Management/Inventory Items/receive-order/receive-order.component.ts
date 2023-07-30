import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { Supplier } from 'src/app/shared/supplier';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Supplier_Inventory } from 'src/app/shared/supplieritem';

@Component({
  selector: 'app-receive-order',
  templateUrl: './receive-order.component.html',
  styleUrls: ['./receive-order.component.css']
})
export class ReceiveOrderComponent implements OnInit {

  supplierData: Supplier[] = [];
  inventoryItems: InventoryItem[] = [];
  receiveOrderForm!: FormGroup;
  editInventory: InventoryItem = new InventoryItem();
  supplieritems: Supplier_Inventory[] = []; // Add the supplieritems property
  filteredsupplieritems: Supplier_Inventory[] = [];
  datePipe = new DatePipe('en-US');
  selectedItemName: string = '';
  selectedSupplierName: string = '';
  orderDate: Date = new Date();
  receivedDate: Date = new Date();
  orderedQuantity: number = 0;

  constructor(
    private route: ActivatedRoute,
    private supplierservice: SupplierService,
    private inventoryservice: InventoryService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
   
  ) {
    this.receiveOrderForm = this.fb.group({
      itemName: ['', Validators.required],
      supplierId: ['', Validators.required],
      ordered_Date: ['', Validators.required],
      received_Date: [new Date().toISOString().slice(0, 10)],
      ordered_Quantity: ['', [Validators.required, Validators.min(1)]]
    });
    this.receiveOrderForm.controls['itemName'].disable();
    
  }

  onReceiveOrderClick(itemName: string) {
    this.router.navigate(['/receive-order'], { queryParams: { itemName: itemName } });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inventoryservice.GetInventoryItem(params['id']).subscribe(res => {
        this.editInventory = res as InventoryItem;
        this.receiveOrderForm.controls['itemName'].setValue(this.editInventory.itemName);
      });
    });

    this.getAllSuppliers();
  }

  getAllSuppliers(): void {
    this.supplierservice.GetAllSuppliers().subscribe((result) => {
      this.supplierData = result;
    });
  }

  // ...

// onSubmit() {
//   if (this.receiveOrderForm.invalid) {
//     return;
//   }

//   const formattedOrderedDate = this.datePipe.transform(
//     this.receiveOrderForm.value.ordered_Date,
//     'yyyy-MM-dd'
//   );

//   const currentDate = new Date();

//   let receiveorder = new Supplier_Inventory();
//   receiveorder.itemName = parseInt(this.receiveOrderForm.value.itemName, 10); // Parse to int
//   receiveorder.supplierNames = parseInt(this.receiveOrderForm.value.supplierId, 10); // Parse to int
//   receiveorder.ordered_Date = formattedOrderedDate!;
//   receiveorder.received_Date = currentDate.toISOString().slice(0, 10);
//   receiveorder.ordered_Quantity = this.receiveOrderForm.value.ordered_Quantity;

//   this.inventoryservice.AddReceivedOrder(receiveorder).subscribe(
//     (result) => {
//       // After adding the order, refresh the order list
//       this.GetAllInventoryOrders();
//     },
//     (error) => {
//       console.error('Error in AddReceivedOrder:', error);
//       // Show an error message to the user if desired
//     }
//   );

//   this.snackBar.open(
//     this.receiveOrderForm.get('itemName')!.value + ` created successfully`,
//     'X',
//     { duration: 5000 }
//   );
// }
onSubmit() {
  if (this.receiveOrderForm.invalid) {
    return;
  }

  const formattedOrderedDate = this.datePipe.transform(
    this.receiveOrderForm.value.ordered_Date,
    'yyyy-MM-dd'
  );

  let receiveorder: Supplier_Inventory = {
    itemName: 0,
    supplierNames: 0,
    ordered_Date: formattedOrderedDate!,
    received_Date: this.receiveOrderForm.value.received_Date,
    ordered_Quantity: this.receiveOrderForm.value.ordered_Quantity,
    inventoryItemName: '',
    supplierName: ''
  };

  // Convert the selected item and supplier names to numbers
  receiveorder.itemName = parseInt(this.receiveOrderForm.value.itemName, 10);
  receiveorder.supplierNames = parseInt(this.receiveOrderForm.value.supplierId, 10);

  this.inventoryservice.AddReceivedOrder(receiveorder).subscribe(
    (result) => {
      // After adding the order, refresh the order list
      this.GetAllInventoryOrders();
      this.snackBar.open(
        this.receiveOrderForm.get('itemName')!.value + ` created successfully`,
        'X',
        { duration: 5000 }
      );
    },
    (error) => {
      console.error('Error in AddReceivedOrder:', error);
      // Show an error message to the user if desired
    }
  );
}

GetAllInventoryOrders() {
  this.inventoryservice.GetAllInventoryOrders().subscribe((result) => {
    this.supplieritems = result;
    this.filteredsupplieritems = this.supplieritems;
  });
}
// ...


  onCancel() {
    // Here you can specify the route or action to navigate when the cancel button is clicked.
    // For example, you might want to navigate back to the previous page:
    this.router.navigate(['/checklist']);
  }

}
