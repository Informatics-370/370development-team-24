import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryType } from 'src/app/shared/inventorytype';

@Component({
  selector: 'app-view-inventorytypes',
  templateUrl: './view-inventorytypes.component.html',
  styleUrls: ['./view-inventorytypes.component.css']
})
export class ViewInventorytypesComponent {

  inventorytypes: InventoryType[] = []
  filteredInventoryTypes: InventoryType[] = [];
  
  constructor(private inventoryservice: InventoryService, private snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router){}

  deleteItem(): void {
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this inventory type?', 'Delete, Cancel',{
      duration: 5000, // Display duration in milliseconds

    });

    
    //  cancel(){
    //    this.router.navigate(['/home'])
    //  }
  

    confirmationSnackBar.onAction().subscribe(() => {
      // Perform the deletion action here
      this.deleteItemFromServer();
      window.location.reload();
    });
  }

deleteItemFromServer(): void {
  this.DeleteInventoryType;
}

  ngOnInit(): void {
    this.GetAllInventoryTypes()
    console.log(this.inventorytypes)

    this.filteredInventoryTypes = this.inventorytypes
    console.log(this.filteredInventoryTypes)

  }

  GetAllInventoryTypes()
  {
    this.inventoryservice.GetAllInventoryTypes().subscribe(result => {
      let inventoryTypeList:any[] = result
      inventoryTypeList.forEach((element) => {
        this.inventorytypes.push(element)
        
      });
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredInventoryTypes = this.inventorytypes.filter(inventorytype => {
      const column2Value = inventorytype.name.toLowerCase() || inventorytype.name.toUpperCase();
      const column3Value = inventorytype.description.toLowerCase();
  
      return column2Value.includes(filterValue) || column3Value.includes(filterValue);
    });
  }


  DeleteInventoryType(inventory_TypeId: Number){
    this.inventoryservice.DeleteInventoryType(inventory_TypeId).subscribe(result => {
      this.deleteItem();
      });
    }


}
