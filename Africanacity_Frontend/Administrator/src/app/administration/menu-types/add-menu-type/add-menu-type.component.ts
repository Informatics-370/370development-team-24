import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuTypes } from 'src/app/shared/menu-types';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { HelpAddmenutypeComponent } from './help-addmenutype/help-addmenutype.component';
//tree diagram
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import { FoodType } from 'src/app/shared/food-type';

@Component({
  selector: 'app-add-menu-type',
  templateUrl: './add-menu-type.component.html',
  styleUrls: ['./add-menu-type.component.css']
})

export class AddMenuTypeComponent {
  formData = new FormData();
  menu_typeId: number = 0;
  addMenuTypeForm!: FormGroup;
  @ViewChild('toastContainer', { read: ViewContainerRef })
  toastContainer!: ViewContainerRef;

  //For the tree diagram concept//
  selectedMenuCategories: MenuItemCategory[] = [];
  selectedFoodTypes: FoodType [] = [];
    // Properties to store available menu categories and food types
    menuCategories: MenuItemCategory[] = []; // Initialize with your data
    foodTypes: FoodType[] = []; // Initialize with your data
 


  constructor(private dataService:DataService,
    private route : ActivatedRoute,
     private router : Router,
      private fb: FormBuilder,
      private dialog: MatDialog,
      private snackBar: MatSnackBar,
      
      ) {


 }


//confirmation dialog method
 openDialog():void{
  const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
    width: '250px',
    data: 'Add New Menu Type?'
  });


  dialogRef.afterClosed().subscribe(result => {
    if(result == 'Yes'){
      this.onSubmit();
      
    }
  })

 }

cancel(){
  this.router.navigate(['/menu-types'])
}
 
 ngOnInit(): void {
    // Initialize the form controls
    this.addMenuTypeForm = this.fb.group({
      name: ['', [Validators.required]],
      selectedMenuCategories: [[]], // Initialize as an empty array
      selectedFoodTypes: [[]], // Initialize as an empty array
    });

  this.dataService.GetAllMenuItemCategories().subscribe((menuCategories) => {
    this.menuCategories = menuCategories;
  });

  this.dataService.GetAllFoodTypes().subscribe((foodTypes) => {
    this.foodTypes = foodTypes;
  });
 }

 //code to add a new menu type
 /*addNewMenuType(){
  let menuType = new MenuTypes();
  menuType.name = this.addMenuTypeForm.value.name;

  this.dataService.AddMenuType(menuType).subscribe((add:any) =>{
    this.router.navigate(['/menu-types'])
    
  });
  this.showSuccessMessage('Menu Type added successfully!');
}*/

//TREE DIAGRAM//
  // Function to handle form submission
  onSubmit(): void {
    if (this.addMenuTypeForm.valid) {
      const menuType: MenuTypes = {
        name: this.addMenuTypeForm.value.name,
        selectedMenuCategories: this.selectedMenuCategories || [], // Include selected Menu Categories
        selectedFoodTypes: this.selectedFoodTypes || [], // Include selected Food Types
      };

      this.dataService.AddMenuType(menuType).subscribe(
        (response) => {
          console.log('Menu Type added successfully', response);
          // Reset form and arrays after successful submission if needed
          this.addMenuTypeForm.reset();
          this.selectedMenuCategories = [];
          this.selectedFoodTypes = [];
        },
        (error) => {
          console.error('Error adding Menu Type', error);
        }
      );
    }
  }

 // Function to handle selection of Menu Categories
 selectMenuCategory(menuCategory: MenuItemCategory): void {
  // Check if the category is already selected, and if not, add it to the array
  if (!this.selectedMenuCategories.includes(menuCategory)) {
    this.selectedMenuCategories.push(menuCategory);
  }
  console.log('Selected Menu Categories:', this.selectedMenuCategories);
}

// Function to handle deselection of Menu Categories
deselectMenuCategory(menuCategory: MenuItemCategory): void {
  // Remove the category from the array
  const index = this.selectedMenuCategories.indexOf(menuCategory);
  if (index !== -1) {
    this.selectedMenuCategories.splice(index, 1);
  }

}

  // Function to handle selection of Food Types
  selectFoodType(foodType: FoodType): void {
    // Check if the type is already selected, and if not, add it to the array
    if (!this.selectedFoodTypes.includes(foodType)) {
      this.selectedFoodTypes.push(foodType);
    }
    console.log('Selected Food Types:', this.selectedFoodTypes);

  }

  // Function to handle deselection of Food Types
  deselectFoodType(foodType: FoodType): void {
    // Remove the type from the array
    const index = this.selectedFoodTypes.indexOf(foodType);
    if (index !== -1) {
      this.selectedFoodTypes.splice(index, 1);
    }
  }



//success message
showSuccessMessage(message: string): void {
  const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
    duration: 3000, // Duration in milliseconds
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  });

    snackBarRef.afterDismissed().subscribe(() => {
    this.toastContainer.clear();
  });

 
}
openHelpModal(field: string): void {
  const dialogRef = this.dialog.open(HelpAddmenutypeComponent, {
    width: '500px',
    data: { field } // Pass the field name to the modal
  });

  dialogRef.afterClosed().subscribe(result => {
    // Handle modal close if needed
  });
}








}