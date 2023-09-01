import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryType } from 'src/app/shared/inventorytype';
import { HelpEditinvetorytypeComponent } from './help-editinvetorytype/help-editinvetorytype.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-intventorytype',
  templateUrl: './edit-intventorytype.component.html',
  styleUrls: ['./edit-intventorytype.component.css']
})
export class EditIntventorytypeComponent {
  constructor(private inventoryservice: InventoryService, 
    private router: Router, 
    private activated:ActivatedRoute,  private dialog: MatDialog) { }
  
    editInventoryType: InventoryType = new InventoryType();
  
    editInventoryTypeForm: FormGroup = new FormGroup({
       name: new FormControl('',[Validators.required]),
       description: new FormControl('',[Validators.required])
    })
  
    ngOnInit(): void {
      this.activated.params.subscribe(params =>{
      this.inventoryservice.GetInventoryType(params['id']).subscribe(result =>{
        this.editInventoryType = result as InventoryType;
        this.editInventoryTypeForm.controls['name'].setValue(this.editInventoryType.name);
        this.editInventoryTypeForm.controls['description'].setValue(this.editInventoryType.description);
      })
      })
  
    }
  
    cancel(){
      this.router.navigate(['/view-inventorytypes'])
    }
  
    onSubmit(){
      let inventorytype = new InventoryType();
      inventorytype.name = this.editInventoryTypeForm.value.name;
      inventorytype.description = this.editInventoryTypeForm.value.description;
  
      this.inventoryservice.EditInventoryType(this.editInventoryType.inventory_TypeId, inventorytype).subscribe((result:any) => {
  
      this.router.navigate(['view-inventorytypes'])
      });
    }
    openHelpModal(field: string): void {
      const dialogRef = this.dialog.open(HelpEditinvetorytypeComponent, {
        width: '500px',
        data: { field } // Pass the field name to the modal
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Handle modal close if needed
      });
    }

}
