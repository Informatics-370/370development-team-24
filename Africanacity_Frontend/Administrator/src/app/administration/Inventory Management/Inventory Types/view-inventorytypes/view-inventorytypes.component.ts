import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryType } from 'src/app/shared/inventorytype';
import { HelpViewinventorytypeComponent } from './help-viewinventorytype/help-viewinventorytype.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-inventorytypes',
  templateUrl: './view-inventorytypes.component.html',
  styleUrls: ['./view-inventorytypes.component.css']
})
export class ViewInventorytypesComponent {

  inventorytypes: InventoryType[] = [];
  filteredInventoryTypes: InventoryType[] = [];
  deletionSuccess = false;
  
  constructor(
    private inventoryservice: InventoryService, 
    private snackBar: MatSnackBar, 
    private httpClient: HttpClient, 
    private router: Router, 
    private dialog: MatDialog
    ){}


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

  deleteItem(inventory_TypeId: number): void {
    const confirmationSnackBar = this.snackBar.open(
      'Are you sure you want to delete the Inventory Type?',
      'Cancel Delete',
      { duration: 5000 }
    );

    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer(inventory_TypeId); // Proceed with deletion if "Cancel Delete" is not clicked
    });
  }

  deleteItemFromServer(employee_RoleId: number): void {
    // Display another confirmation before the actual deletion
    const confirmDeletionSnackBar = this.snackBar.open(
      'Confirm deletion?',
      'Delete',
      { duration: 5000 }
    );

    confirmDeletionSnackBar.onAction().subscribe(() => {
      // User confirmed deletion, proceed with the actual deletion
      this.DeleteInventoryType(employee_RoleId);
    });
  }

  DeleteInventoryType(inventory_TypeId: number) {
    this.inventoryservice.DeleteInventoryType(inventory_TypeId).subscribe(
      () => {
        // Deletion was successful
        this.deletionSuccess = true;
        this.snackBar.open('Inventory type deleted successfully.', '', {
          duration: 5000,
        });
        window.location.reload();
      },
      (error) => {
        // Deletion failed
        this.deletionSuccess = false;
        this.snackBar.open(
          'Cannot delete inventory type because it is linked to an inventory.',
          '',
          { duration: 5000 }
        );
      }
    );
  }
//   deleteItem(): void {
//     const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this inventory type?', 'Delete, Cancel',{
//       duration: 5000, // Display duration in milliseconds

//     });

    
//     //  cancel(){
//     //    this.router.navigate(['/home'])
//     //  }
  

//     confirmationSnackBar.onAction().subscribe(() => {
//       // Perform the deletion action here
//       this.deleteItemFromServer();
//       window.location.reload();
//     });
//   }

// deleteItemFromServer(): void {
//   this.DeleteInventoryType;
// }

//   DeleteInventoryType(inventory_TypeId: Number){
//     this.inventoryservice.DeleteInventoryType(inventory_TypeId).subscribe(result => {
//       this.deleteItem();
//       });
//     }


    openHelpModal(field: string): void {
      const dialogRef = this.dialog.open(HelpViewinventorytypeComponent, {
        width: '500px',
        data: { field } // Pass the field name to the modal
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Handle modal close if needed
      });
    }
}



