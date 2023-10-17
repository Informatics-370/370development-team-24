// import { Component, OnInit} from '@angular/core';
// import { DataService } from 'src/app/service/data.Service';
// import { MenuTypes } from 'src/app/shared/menu-types';
// import {Router} from '@angular/router';
// import { EditMenuTypeComponent } from './edit-menu-type/edit-menu-type.component';
// import { HttpClient } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ConfirmationDialogComponent } from './add-menu-type/confirmation-dialog/confirmation-dialog.component';
// import { MenuItem } from 'src/app/shared/menu-item';
// import { FoodType } from 'src/app/shared/food-type';
// import { MenuItemCategory } from 'src/app/shared/menu-item-category';
// import { MatDialog } from '@angular/material/dialog';
// import { HelpViewmenutypeComponent } from './help-viewmenutype/help-viewmenutype.component';

// @Component({
//   selector: 'app-menu-types',
//   templateUrl: './menu-types.component.html',
//   /*template: `<button (click)="deleteItem()">Delete</button>`,*/
  
//   styleUrls: ['./menu-types.component.css']
// })
// export class MenuTypesComponent implements OnInit{
//   menuTypes:MenuTypes[] = []
//   filteredMenuTypes: MenuTypes[] = []
//   deletionSuccess = false;


//   constructor(private dataService: DataService, 
//     private router: Router,
//     private http: HttpClient,
//     private snackBar: MatSnackBar,
//     private dialog: MatDialog
//     ){}
   
//   deleteItem(menu_TypeId: Number): void {
//     const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete the Menu type?', ' Delete', { duration: 5000 });
    
//     confirmationSnackBar.onAction().subscribe(() => {
//       this.deleteItemFromServer(menu_TypeId); // Proceed with deletion if "Cancel Delete" is not clicked
//     });
//   }

//   deleteItemFromServer(menu_TypeId: Number): void {
//     // Display another confirmation before the actual deletion
//     const confirmDeletionSnackBar = this.snackBar.open('Confirm deletion?', 'Delete', { duration: 5000 });
    
//     confirmDeletionSnackBar.onAction().subscribe(() => {
//       // User confirmed deletion, proceed with the actual deletion
//       this.deleteMenuType(menu_TypeId);
//     });
//   }

    
//   deleteMenuType(menu_TypeId: Number) {
//     this.dataService.deleteMenuType(menu_TypeId).subscribe(
//       () => {
//         // Deletion was successful
//         this.deletionSuccess = true;
//         this.snackBar.open('Menu Type deleted successfully.', '', { duration: 5000 });
//         window.location.reload();
//       },
//       (error) => {
//         // Deletion failed
//         this.deletionSuccess = false;
//         this.snackBar.open('Cannot delete menu type because it is linked to menu items.', '', { duration: 5000 });
//       }
//     );
//   }

//   ngOnInit(): void{
//     this.GetAllMenuTypes()
    
//     console.log(this.menuTypes)
//     this.filteredMenuTypes = this.menuTypes
//     console.log(this.filteredMenuTypes)
//   }


//   //get all the menu types
//   GetAllMenuTypes()
//   {
//     this.dataService.GetAllMenuTypes().subscribe(result => {
//       let typesList:any[] = result
//       typesList.forEach((element) => {
//         this.menuTypes.push(element)
//       });
//     })
//   }


//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
//     this.filteredMenuTypes = this.menuTypes.filter(menutype => {
//       const column2Value = menutype.name.toLowerCase() || menutype.name.toUpperCase();
     
  
//       return column2Value.includes(filterValue);
//     });
//   }
//   openHelpModal(field: string): void {
//     const dialogRef = this.dialog.open(HelpViewmenutypeComponent, {
//       width: '500px',
//       data: { field } // Pass the field name to the modal
//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       // Handle modal close if needed
//     });
//   }
//}

import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { MenuTypes } from 'src/app/shared/menu-types';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HelpViewmenutypeComponent } from './help-viewmenutype/help-viewmenutype.component';

@Component({
  selector: 'app-menu-types',
  templateUrl: './menu-types.component.html',
  styleUrls: ['./menu-types.component.css']
})
export class MenuTypesComponent implements OnInit {
  menuTypes: MenuTypes[] = [];
  filteredMenuTypes: MenuTypes[] = [];
  deletionSuccess = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllMenuTypes();
    this.filteredMenuTypes = this.menuTypes; // Initialize the filtered list
  }

  // GetAllMenuTypes() {
  //   this.dataService.GetAllMenuTypes().subscribe((result) => {
  //     this.menuTypes = result as MenuTypes[];
  //   });
  // }

  GetAllMenuTypes()
  {
    this.dataService.GetAllMenuTypes().subscribe(result => {
      let eventsList:any[] = result
      eventsList.forEach((element) => {
        this.menuTypes.push(element)
        
      });
    })
  }

  //Delete menu type
  // deleteMenuType(menu_TypeId: number | undefined) {
  //   if (menu_TypeId !== undefined) {
  //     this.dataService.deleteMenuType(menu_TypeId).subscribe(result => {
  //       this.deleteItem();
  //     });
  //   }
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredMenuTypes = this.menuTypes.filter((menuType) => {
      const column2Value = menuType.name.toLowerCase();

      return column2Value.includes(filterValue);
    });
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpViewmenutypeComponent, {
      width: '500px',
      data: { field }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle modal close if needed
    });
  }

  deleteItem(menu_TypeId: Number): void {
    const confirmationSnackBar = this.snackBar.open(
      'Are you sure you want to delete the Menu type?',
      ' Delete',
      { duration: 5000 }
    );

    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer(menu_TypeId); // Proceed with deletion if "Cancel Delete" is not clicked
    });
  }

  deleteItemFromServer(menu_TypeId: Number): void {
    // Display another confirmation before the actual deletion
    const confirmDeletionSnackBar = this.snackBar.open(
      'Confirm deletion?',
      'Delete',
      { duration: 5000 }
    );

    confirmDeletionSnackBar.onAction().subscribe(() => {
      // User confirmed deletion, proceed with the actual deletion
      this.deleteMenuType(menu_TypeId);
    });
  }

  deleteMenuType(menu_TypeId: Number | undefined ) {
    if (menu_TypeId !== undefined) {
    this.dataService.deleteMenuType(menu_TypeId).subscribe(
      () => {
        // Deletion was successful
        this.deletionSuccess = true;
        this.snackBar.open('Menu Type deleted successfully.', '', {
          duration: 5000,
        });
        window.location.reload();
      },
      (error) => {
        // Deletion failed
        this.deletionSuccess = false;
        this.snackBar.open(
          'Cannot delete menu type because it is linked to menu items.',
          '',
          { duration: 5000 }
        );
      }
    );
    }
  }
}
