// import { HttpClient } from '@angular/common/http';
// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { DataService } from 'src/app/service/data.Service';
// import { FoodType } from 'src/app/shared/food-type';
// import { NavbarComponent } from 'src/app/navbar/navbar.component';
// import { MatDialog } from '@angular/material/dialog';
// import { HelpViewfoodtypesComponent } from './help-viewfoodtypes/help-viewfoodtypes.component';

// @Component({
//   selector: 'app-food-type',
//   templateUrl: './food-type.component.html',
//   styleUrls: ['./food-type.component.css']
// })

// export class FoodTypeComponent {
//   foodType: FoodType[] = []
//   filteredFoodTypes: FoodType[] = [];
//   deletionSuccess = false;

//   constructor(private dataService: DataService, 
//     private router: Router, 
//     private httpClient: HttpClient, 
//     private snackBar: MatSnackBar,
//     private dialog: MatDialog) {}

  
//   GetAllFoodTypes()
//   {
//     this.dataService.GetAllFoodTypes().subscribe(result => {
//       let foodTypesList: any[] = result
//       foodTypesList.forEach((element) => {
//         this.foodType.push(element)
//       });
//     })
  
//   }

//   ngOnInit(): void {
//     this.GetAllFoodTypes();

//     this.filteredFoodTypes = this.foodType
//     console.log(this.filteredFoodTypes)
//   }

//   deleteItem(foodTypeId: number): void {
//     const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete the Food type?', ' Delete', { duration: 5000 });
    
//     confirmationSnackBar.onAction().subscribe(() => {
//       this.deleteItemFromServer(foodTypeId); // Proceed with deletion if "Cancel Delete" is not clicked
//     });
//   }

//   deleteItemFromServer(foodTypeId: number): void {
//     // Display another confirmation before the actual deletion
//     const confirmDeletionSnackBar = this.snackBar.open('Confirm deletion?', 'Delete', { duration: 5000 });
    
//     confirmDeletionSnackBar.onAction().subscribe(() => {
//       // User confirmed deletion, proceed with the actual deletion
//       this.DeleteFoodType(foodTypeId);
//     });
//   }

    
//   DeleteFoodType(menu_TypeId: number) {
//     this.dataService.DeleteFoodType(menu_TypeId).subscribe(
//       () => {
//         // Deletion was successful
//         this.deletionSuccess = true;
//         this.snackBar.open('Food Type deleted successfully.', '', { duration: 5000 });
//         window.location.reload();
//       },
//       (error) => {
//         // Deletion failed
//         this.deletionSuccess = false;
//         this.snackBar.open('Cannot delete food type because it is linked to menu items and menu.', '', { duration: 5000 });
//       }
//     );
//   }

//   // search
//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
//     this.filteredFoodTypes = this.filteredFoodTypes.filter(foodType => {
//       const column2Value = foodType.name.toLowerCase() || foodType.name.toUpperCase();
//       const column3Value = foodType.description.toLowerCase();
  
//       return column2Value.includes(filterValue) || column3Value.includes(filterValue);
//     });
//   }

//   openHelpModal(field: string): void {
//     const dialogRef = this.dialog.open(HelpViewfoodtypesComponent, {
//       width: '500px',
//       data: { field } // Pass the field name to the modal
//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       // Handle modal close if needed
//     });
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { FoodType } from 'src/app/shared/food-type';
import { MatDialog } from '@angular/material/dialog';
import { HelpViewfoodtypesComponent } from './help-viewfoodtypes/help-viewfoodtypes.component';

@Component({
  selector: 'app-food-type',
  templateUrl: './food-type.component.html',
  styleUrls: ['./food-type.component.css'],
})
export class FoodTypeComponent implements OnInit {
  foodType: FoodType[] = [];
  filteredFoodTypes: FoodType[] = [];
  deletionSuccess = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllFoodTypes();
  }

  GetAllFoodTypes() {
    this.dataService.GetAllFoodTypes().subscribe((result) => {
      this.foodType = result as FoodType[];
      this.filteredFoodTypes = this.foodType; // Initialize the filtered list
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredFoodTypes = this.foodType.filter((foodType) => {
      const column2Value = foodType.name.toLowerCase();
      const column3Value = foodType.description.toLowerCase();

      return column2Value.includes(filterValue) || column3Value.includes(filterValue);
    });
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpViewfoodtypesComponent, {
      width: '500px',
      data: { field },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle modal close if needed
    });
  }

  deleteItem(foodTypeId: number): void {
    const confirmationSnackBar = this.snackBar.open(
      'Are you sure you want to delete the Food type?',
      ' Delete',
      { duration: 5000 }
    );

    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer(foodTypeId); // Proceed with deletion if "Cancel Delete" is not clicked
    });
  }

  deleteItemFromServer(foodTypeId: number): void {
    // Display another confirmation before the actual deletion
    const confirmDeletionSnackBar = this.snackBar.open(
      'Confirm deletion?',
      'Delete',
      { duration: 5000 }
    );

    confirmDeletionSnackBar.onAction().subscribe(() => {
      // User confirmed deletion, proceed with the actual deletion
      this.DeleteFoodType(foodTypeId);
    });
  }

  DeleteFoodType(foodTypeId: number) {
    this.dataService.DeleteFoodType(foodTypeId).subscribe(
      () => {
        // Deletion was successful
        this.deletionSuccess = true;
        this.snackBar.open('Food Type deleted successfully.', '', {
          duration: 5000,
        });
        window.location.reload();
      },
      (error) => {
        // Deletion failed
        this.deletionSuccess = false;
        this.snackBar.open(
          'Cannot delete food type because it is linked to menu items and menu.',
          '',
          { duration: 5000 }
        );
      }
    );
  }
}
