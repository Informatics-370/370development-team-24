// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { DataService } from 'src/app/service/data.Service';
// import { MenuItemCategory } from 'src/app/shared/menu-item-category';
// import { MatDialog } from '@angular/material/dialog';
// import { HelpMenuitemcategoryComponent } from './help-menuitemcategory/help-menuitemcategory.component';

// @Component({
//   selector: 'app-menu-item-category',
//   templateUrl: './menu-item-category.component.html',
//   styleUrls: ['./menu-item-category.component.css']
// })
// export class MenuItemCategoryComponent {
//   menuItemCategories: MenuItemCategory[] = [];
//   filteredMenuItemCategories: MenuItemCategory[] = [];
//   deletionSuccess = false;

//   constructor(private dataService: DataService, 
//     private router: Router, 
//     private httpClient: HttpClient, 
//     private snackBar: MatSnackBar, 
//     private dialog: MatDialog) {}


//   ngOnInit(): void {
//     this.GetAllMenuItemCategories();

//     this.filteredMenuItemCategories = this.menuItemCategories
//     console.log(this.filteredMenuItemCategories)
//   }

//   GetAllMenuItemCategories()
//   {
//     this.dataService.GetAllMenuItemCategories().subscribe(result => {
//       let MenuItemCategoryList: any[] = result
//       MenuItemCategoryList.forEach((element) => {
//         this.menuItemCategories.push(element)
//       });
//     })
  
//   }

//   deleteItem(menu_CategoryId: number): void {
//     const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete the MenuItem Category?', ' Delete', { duration: 5000 });
    
//     confirmationSnackBar.onAction().subscribe(() => {
//       this.deleteItemFromServer(menu_CategoryId); // Proceed with deletion if "Cancel Delete" is not clicked
//     });
//   }

//   deleteItemFromServer(menu_CategoryId: number): void {
//     // Display another confirmation before the actual deletion
//     const confirmDeletionSnackBar = this.snackBar.open('Confirm deletion?', 'Delete', { duration: 5000 });
    
//     confirmDeletionSnackBar.onAction().subscribe(() => {
//       // User confirmed deletion, proceed with the actual deletion
//       this.DeleteMenuItemCategory(menu_CategoryId);
//     });
//   }

    
//   DeleteMenuItemCategory(menu_CategoryId: number) {
//     this.dataService.DeleteMenuItemCategory(menu_CategoryId).subscribe(
//       () => {
//         // Deletion was successful
//         this.deletionSuccess = true;
//         this.snackBar.open('MenuItem Category deleted successfully.', '', { duration: 5000 });
//         window.location.reload();
//       },
//       (error) => {
//         // Deletion failed
//         this.deletionSuccess = false;
//         this.snackBar.open('Cannot delete menuItem category because it is linked to menu items and menu.', '', { duration: 5000 });
//       }
//     );
//   }

//   // search
//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
//     this.filteredMenuItemCategories = this.filteredMenuItemCategories.filter(menuItemCategories => {
//       const column2Value = menuItemCategories.name.toLowerCase() || menuItemCategories.name.toUpperCase();
//       const column3Value = menuItemCategories.description.toLowerCase();
  
//       return column2Value.includes(filterValue) || column3Value.includes(filterValue);
//     });
//   }
//   openHelpModal(field: string): void {
//     const dialogRef = this.dialog.open(HelpMenuitemcategoryComponent, {
//       width: '500px',
//       data: { field } // Pass the field name to the modal
//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       // Handle modal close if needed
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import { MatDialog } from '@angular/material/dialog';
import { HelpMenuitemcategoryComponent } from './help-menuitemcategory/help-menuitemcategory.component';

@Component({
  selector: 'app-menu-item-category',
  templateUrl: './menu-item-category.component.html',
  styleUrls: ['./menu-item-category.component.css']
})
export class MenuItemCategoryComponent implements OnInit {
  menuItemCategories: MenuItemCategory[] = [];
  filteredMenuItemCategories: MenuItemCategory[] = [];
  deletionSuccess = false;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllMenuItemCategories();
    this.filteredMenuItemCategories = this.menuItemCategories; // Initialize the filtered list
  }

  GetAllMenuItemCategories() {
    this.dataService.GetAllMenuItemCategories().subscribe((result) => {
      this.menuItemCategories = result as MenuItemCategory[];
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredMenuItemCategories = this.menuItemCategories.filter(
      (menuItemCategory) => {
        const column2Value = menuItemCategory.name.toLowerCase();
        const column3Value = menuItemCategory.description.toLowerCase();

        return (
          column2Value.includes(filterValue) ||
          column3Value.includes(filterValue)
        );
      }
    );
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpMenuitemcategoryComponent, {
      width: '500px',
      data: { field }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle modal close if needed
    });
  }

  deleteItem(menu_CategoryId: number): void {
    const confirmationSnackBar = this.snackBar.open(
      'Are you sure you want to delete the MenuItem Category?',
      ' Delete',
      { duration: 5000 }
    );

    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer(menu_CategoryId); // Proceed with deletion if "Cancel Delete" is not clicked
    });
  }

  deleteItemFromServer(menu_CategoryId: number): void {
    // Display another confirmation before the actual deletion
    const confirmDeletionSnackBar = this.snackBar.open(
      'Confirm deletion?',
      'Delete',
      { duration: 5000 }
    );

    confirmDeletionSnackBar.onAction().subscribe(() => {
      // User confirmed deletion, proceed with the actual deletion
      this.DeleteMenuItemCategory(menu_CategoryId);
    });
  }

  DeleteMenuItemCategory(menu_CategoryId: number) {
    this.dataService.DeleteMenuItemCategory(menu_CategoryId).subscribe(
      () => {
        // Deletion was successful
        this.deletionSuccess = true;
        this.snackBar.open('MenuItem Category deleted successfully.', '', {
          duration: 5000,
        });
        window.location.reload();
      },
      (error) => {
        // Deletion failed
        this.deletionSuccess = false;
        this.snackBar.open(
          'Cannot delete menuItem category because it is linked to menu items and menu.',
          '',
          { duration: 5000 }
        );
      }
    );
  }
}
