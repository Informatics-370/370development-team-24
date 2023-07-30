import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';

@Component({
  selector: 'app-edit-inventoryitem',
  templateUrl: './edit-inventoryitem.component.html',
  styleUrls: ['./edit-inventoryitem.component.css']
})
export class EditInventoryitemComponent {

  constructor(private inventoryservice: InventoryService, 
    private router: Router, 
    private activated:ActivatedRoute) { }
  
    editInventoryItem: InventoryItem = new InventoryItem();
  
    editInventoryItemForm: FormGroup = new FormGroup({
       itemName: new FormControl('',[Validators.required]),
       description: new FormControl('',[Validators.required])
    })
  
    ngOnInit(): void {
      this.activated.params.subscribe(params =>{
      this.inventoryservice.GetInventoryItem(params['id']).subscribe(result =>{
        this.editInventoryItem = result as InventoryItem;
        this.editInventoryItemForm.controls['itemName'].setValue(this.editInventoryItem.itemName);
        this.editInventoryItemForm.controls['description'].setValue(this.editInventoryItem.description);
      })
      })
  
    }
  
    cancel(){
      this.router.navigate(['/view-inventoryitems/ :typeId'])
    }
  
    onSubmit(){
      let inventoryitem = new InventoryItem();
      inventoryitem.itemName = this.editInventoryItemForm.value.itemName;
      inventoryitem.description = this.editInventoryItemForm.value.description;
  
      this.inventoryservice.EditInventoryItem(this.editInventoryItem.inventory_ItemId, inventoryitem).subscribe((result:any) => {
  
      this.router.navigate(['view-inventoryitems /: typeId'])
      });
    }
}
