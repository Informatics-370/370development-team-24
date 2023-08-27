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
import { AbstractControl, ValidationErrors } from '@angular/forms';

function orderedDateValidator(control: AbstractControl): ValidationErrors | null {
  const orderedDate = new Date(control.value);
  const currentDate = new Date();

  if (orderedDate > currentDate) {
    return { orderedDateInvalid: true };
  }

  return null;
}
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
  orderedDateControl: AbstractControl | null = null; // Initialize it as null



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
      inventoryItemName: new FormControl('',[Validators.required]),
      supplierNames: new FormControl('',[Validators.required]),
      ordered_Date: new FormControl('',[Validators.required, orderedDateValidator ]),
      received_Date: [new Date().toISOString().slice(0, 10)],
      ordered_Quantity: new FormControl(['', [Validators.required, Validators.min(1)]])
    });
    // this.receiveOrderForm.controls['inventoryItemName'].disable();


  }



  ngOnInit(): void {


    this.getAllSuppliers();

    this.route.params.subscribe(params => {
      this.inventoryservice.GetInventoryItem(params['id']).subscribe(res => {
        this.editInventory = res as InventoryItem;
        this.receiveOrderForm.controls['inventoryItemName'].setValue(this.editInventory.itemName);
      });
    });

    this.GetAllInventoryItems()

    this.receiveOrderForm.get('ordered_Date')!.setValidators([orderedDateValidator]);
  }

  getAllSuppliers(): void {
    this.supplierservice.GetAllSuppliers().subscribe((result) => {
      this.supplierData = result;
    });
  }

  GetAllInventoryItems()
  {
    this.inventoryservice.GetAllInventoryItems().subscribe(result => {
      let itemList:any[] = result
      itemList.forEach((element) => {
        this.inventoryItems.push(element)

      });
    })
  }


  onSubmit() {
    if (this.receiveOrderForm.invalid) {
      return;
    }
  
    const currentDate = new Date();

    let receiveorder = new Supplier_Inventory();
    receiveorder.inventoryItemName = this.receiveOrderForm.value.inventoryItemName; 
    receiveorder.supplierNames = this.receiveOrderForm.value.supplierNames;
    receiveorder.ordered_Date = this.receiveOrderForm.value.ordered_Date;
    receiveorder.received_Date = currentDate as Date; // Explicit type assertion
    receiveorder.ordered_Quantity = this.receiveOrderForm.value.ordered_Quantity;
    this.inventoryservice.AddReceivedOrder(receiveorder).subscribe(
      (result) => {
        this.router.navigate(['/view-orders'])
      },
      (error) => {
        console.error('Error in AddReceivedOrder:', error);
      }
    );
  
    this.snackBar.open(
      this.receiveOrderForm.get('inventoryItemName')!.value + ` created successfully`,
      'X',
      { duration: 5000 }
    );
  }

  onCancel() {

    this.router.navigate(['/checklist']);
  }
}
