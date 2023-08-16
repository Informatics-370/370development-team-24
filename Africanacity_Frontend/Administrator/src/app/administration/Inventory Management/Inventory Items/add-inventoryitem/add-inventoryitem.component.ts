import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { InventoryType } from 'src/app/shared/inventorytype';

@Component({
  selector: 'app-add-inventoryitem',
  templateUrl: './add-inventoryitem.component.html',
  styleUrls: ['./add-inventoryitem.component.css']
})
export class AddInventoryitemComponent {
  inventoryTypesData:InventoryType[]=[]
   toastContainer: any;

   constructor(private  inventoryservice: InventoryService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

   inventoryItemForm: FormGroup = new FormGroup({
    itemName: new FormControl('', [Validators.required]),
    inventoryType: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]) 
  });
  
   ngOnInit(): void {
     this.GetAllInventoryTypes()
   }

   cancel(){
     this.router.navigate(['/selected-inventorytype'])
   }

   incrementQuantity() {
    const quantityControl = this.inventoryItemForm.get('quantity');
    quantityControl?.setValue((quantityControl.value ?? 0) + 1);
  }
  
  decrementQuantity() {
    const quantityControl = this.inventoryItemForm.get('quantity');
    const currentValue = quantityControl?.value;
    if (currentValue && currentValue > 0) {
      quantityControl?.setValue(currentValue - 1);
    }
  }
  

   GetAllInventoryTypes(){
     this.inventoryservice.GetAllInventoryTypes().subscribe(result => {
       let inventoryTypeList:any[] = result
       inventoryTypeList.forEach((element) => {
         this.inventoryTypesData.push(element)
      });
     });
   }

   onSubmit() {
    if (this.inventoryItemForm.invalid) {
      return;
    }
  
    let inventoryitem = new InventoryItem();
    inventoryitem.itemName = this.inventoryItemForm.value.itemName;
    inventoryitem.inventoryType = this.inventoryItemForm.value.inventoryType;
    inventoryitem.description = this.inventoryItemForm.value.description;
    inventoryitem.quantity = this.inventoryItemForm.value.quantity;
    inventoryitem.price = this.inventoryItemForm.value.price;

   
    this.inventoryservice.AddInventoryItem(inventoryitem).subscribe(result => {
      this.router.navigate(['/selected-inventorytype'])
});
  
    this.snackBar.open(
      this.inventoryItemForm.get('itemName')!.value + ` created successfully`,
      'X',
      { duration: 5000 }
    );
  }
  
}
