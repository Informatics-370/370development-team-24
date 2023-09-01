import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { InventoryType } from 'src/app/shared/inventorytype';
import { HelpEditinventoryitemComponent } from './help-editinventoryitem/help-editinventoryitem.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-inventoryitem',
  templateUrl: './edit-inventoryitem.component.html',
  styleUrls: ['./edit-inventoryitem.component.css']
})
export class EditInventoryitemComponent {
  inventoryTypesData:InventoryType[]=[]

  constructor(private inventoryservice: InventoryService, 
    private router: Router, 
    private activated:ActivatedRoute,
    private dialog: MatDialog) { }
  
    editInventoryItem: InventoryItem = new InventoryItem();
  
    editInventoryItemForm: FormGroup = new FormGroup({
       itemName: new FormControl('',[Validators.required]),
       description: new FormControl('',[Validators.required]),
       inventoryType: new FormControl('',[Validators.required]),
    })
  
    ngOnInit(): void {
      this.activated.params.subscribe(params =>{
      this.inventoryservice.GetInventoryItem(params['id']).subscribe(result =>{
        this.editInventoryItem = result as InventoryItem;
        this.editInventoryItemForm.controls['itemName'].setValue(this.editInventoryItem.itemName);
        this.editInventoryItemForm.controls['description'].setValue(this.editInventoryItem.description);
        const selectedType = this.inventoryTypesData.find(type => type.name === this.editInventoryItem.inventoryTypeName);
        if (selectedType) {
          this.editInventoryItemForm.controls['inventoryType'].patchValue(selectedType.inventory_TypeId);
        }
      });
      });
      this.GetAllInventoryTypes(); 
  
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
  
    onSubmit(){
      let inventoryitem = new InventoryItem();
      inventoryitem.itemName = this.editInventoryItemForm.value.itemName;
      inventoryitem.inventoryType = this.editInventoryItemForm.value.inventoryType; 
      inventoryitem.description = this.editInventoryItemForm.value.description;
  
      this.inventoryservice.EditInventoryItem(this.editInventoryItem.inventory_ItemId, inventoryitem).subscribe((result:any) => {
  
        this.router.navigate(['/selected-inventorytype'])
      });
    }
    openHelpModal(field: string): void {
      const dialogRef = this.dialog.open(HelpEditinventoryitemComponent, {
        width: '500px',
        data: { field } // Pass the field name to the modal
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Handle modal close if needed
      });
    }
}
