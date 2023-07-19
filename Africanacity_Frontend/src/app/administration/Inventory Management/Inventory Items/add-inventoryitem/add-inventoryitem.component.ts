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
     itemName: new FormControl('',[Validators.required]),
     inventoryType: new FormControl([Validators.required]),
     description: new FormControl('',[Validators.required])
   })

   ngOnInit(): void {
     this.GetAllInventoryTypes()
   }

   cancel(){
     this.router.navigate(['/selected-inventorytype'])
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
    
  
    this.inventoryservice.AddInventoryItem(inventoryitem).subscribe(result => {
      this.router.navigate(['/view-inventoryitems/:typeId'])
});
  
    this.snackBar.open(
      this.inventoryItemForm.get('itemName')!.value + ` created successfully`,
      'X',
      { duration: 5000 }
    );
  }
  
}
