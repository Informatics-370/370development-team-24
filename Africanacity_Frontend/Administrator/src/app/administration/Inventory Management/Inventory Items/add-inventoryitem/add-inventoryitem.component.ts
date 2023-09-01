import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { InventoryType } from 'src/app/shared/inventorytype';
import { HelpAddinventoryComponent } from './help-addinventory/help-addinventory.component';

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
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl(['', [Validators.required, Validators.min(1)]])

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
      this.showErrorMessage('Please fill in all required fields.');
      // Highlight invalid controls
      Object.keys(this.inventoryItemForm.controls).forEach(controlName => {
        if (this.inventoryItemForm.controls[controlName].invalid) {
          this.inventoryItemForm.controls[controlName].markAsTouched();
        }
      });
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

  showErrorMessage(message: string): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
}
openHelpModal(field: string): void {
  const dialogRef = this.dialog.open(HelpAddinventoryComponent, {
    width: '500px',
    data: { field } // Pass the field name to the modal
  });

  dialogRef.afterClosed().subscribe(result => {
    // Handle modal close if needed
  });
}
  
}
