import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryType } from 'src/app/shared/inventorytype';

@Component({
  selector: 'app-add-inventorytypes',
  templateUrl: './add-inventorytypes.component.html',
  styleUrls: ['./add-inventorytypes.component.css']
})
export class AddInventorytypesComponent {

  inventorytypes:InventoryType[] = []

  constructor(private inventoryservice: InventoryService, private router: Router, 
    private activated: ActivatedRoute,
    private snackBar: MatSnackBar) {}

    inventoryTypeForm: FormGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required])
     })

     ngOnInit(): void {
    }
  
    cancel(){
      this.router.navigate(['/view-inventorytypes'])
    }
  
    onSubmit(){
      if (this.inventoryTypeForm.invalid) {
        this.showErrorMessage('Please fill in all required fields.');
        // Highlight invalid controls
        Object.keys(this.inventoryTypeForm.controls).forEach(controlName => {
          if (this.inventoryTypeForm.controls[controlName].invalid) {
            this.inventoryTypeForm.controls[controlName].markAsTouched();
          }
        });
        return;
      }

      let inventorytype = new InventoryType();
      inventorytype.name = this.inventoryTypeForm.value.name;
      inventorytype.description = this.inventoryTypeForm.value.description;
     
       this.inventoryservice.AddInventoryType(inventorytype).subscribe(result => {
        this.router.navigate(['/view-inventorytypes'])
       });

       this.showSuccessMessage('Inventory Type Added successfully');

    }
    // Success notification
    showSuccessMessage(message:string) : void {
      const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
    showErrorMessage(message: string): void {
      const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
        duration: 5000, // Duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
  }

}
