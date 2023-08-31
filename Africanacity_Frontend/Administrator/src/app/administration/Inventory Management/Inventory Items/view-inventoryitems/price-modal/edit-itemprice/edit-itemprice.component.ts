import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { Inventory_Prices } from 'src/app/shared/inventoryPrices';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-itemprice',
  templateUrl: './edit-itemprice.component.html',
  styleUrls: ['./edit-itemprice.component.css']
})
export class EditItempriceComponent {
  isEditClicked: boolean = false;

  constructor(
    private inventoryservice:InventoryService, 
    private router : Router , 
    private activated:ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private reactiveFormsModule: ReactiveFormsModule) { }

    editItemPrice: Inventory_Prices = new Inventory_Prices();

    updateItemPriceForm: FormGroup = new FormGroup({
      price: new FormControl([1, [Validators.required, Validators.min(1)]])
    })

    ngOnInit(): void {

      this.activated.params.subscribe(params => { 
        this.inventoryservice.GetInventoryPrice(params['id']).subscribe(res => {
          this.editItemPrice = res as Inventory_Prices;
          this.updateItemPriceForm.controls['price'].setValue(this.editItemPrice.price);
        });
   
       })
    }

    
    updateItemPrice() {
      let itemprice = new Inventory_Prices();
      itemprice.price = this.updateItemPriceForm.value.price;
    
      this.inventoryservice.EditInventoryPrice(this.editItemPrice.inventoryPrice_Id, itemprice)
        .subscribe((response: any) => {
          if (response.statusCode == 200) {
            this.router.navigate(['/selected-inventorytype']);
            window.location.reload();
          }
          // Add your else logic here if needed
    
          this.showSuccessMessage('Price Information updated successfully!');
        });
    }
  showSuccessMessage(message: string): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
  
    cancel(){
      this.router.navigate(['/selected-inventorytype'])
    }

    onEditClick(): void {
      this.isEditClicked = true;
    }

}
