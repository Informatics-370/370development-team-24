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
  menuCategories: string[] = [];
  foodTypes: string [] = [];
    // Properties to store available menu categories and food types
    allMenuCategories: MenuItemCategory[] = []; // Initialize with your data
    allFoodTypes: FoodType[] = []; // Initialize with your data
 


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
      menuCategories: [[]], // Initialize as an empty array
      foodTypes: [[]], // Initialize as an empty array
    });

  this.dataService.GetAllMenuItemCategories().subscribe((menuCategories) => {
    this.allMenuCategories = menuCategories;
  });

  this.dataService.GetAllFoodTypes().subscribe((foodTypes) => {
    this.allFoodTypes = foodTypes;
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
      // Populate selected menu categories and food types
      const selectedMenuCategories = this.menuCategories;
      const selectedFoodTypes = this.foodTypes;
  
      const menuType: MenuTypes = {
        name: this.addMenuTypeForm.value.name,
        menuCategories: selectedMenuCategories || [],
        foodTypes: selectedFoodTypes || [],
      };
  
      this.dataService.AddMenuType(menuType).subscribe(
        (response) => {
          console.log('Menu Type added successfully', response);
          // Reset form and arrays after successful submission if needed
          this.addMenuTypeForm.reset();
          this.menuCategories = [];
          this.foodTypes = [];
        },
        (error) => {
          console.error('Error adding Menu Type', error);
        }
      );
    }
  }
  

 // Function to handle selection of Menu Categories
 selectMenuCategory(categoryName: string): void {
  // Check if the category is already selected, and if not, add it to the array
  if (!this.menuCategories.includes(categoryName)) {
    this.menuCategories.push(categoryName);
  }
  console.log('Selected Menu Categories:', this.menuCategories);
}

// Function to handle deselection of Menu Categories
deselectMenuCategory(categoryName:string): void {
  // Remove the category from the array
  const index = this.menuCategories.indexOf(categoryName);
  if (index !== -1) {
    this.menuCategories.splice(index, 1);
  }

}

  // Function to handle selection of Food Types
  selectFoodType(typeName: string): void {
    // Check if the type is already selected, and if not, add it to the array
    if (!this.foodTypes.includes(typeName)) {
      this.foodTypes.push(typeName);
    }
    console.log('Selected Food Types:', this.foodTypes);

  }

  // Function to handle deselection of Food Types
  deselectFoodType(typeName: string): void {
    // Remove the type from the array
    const index = this.foodTypes.indexOf(typeName);
    if (index !== -1) {
      this.foodTypes.splice(index, 1);
    }
  }

  // Function to toggle selection of Menu Categories
toggleMenuCategory(categoryName: string): void {
  if (this.menuCategories.includes(categoryName)) {
    this.deselectMenuCategory(categoryName);
  } else {
    this.selectMenuCategory(categoryName);
  }
}

// Function to toggle selection of Food Types
toggleFoodType(typeName: string): void {
  if (this.foodTypes.includes(typeName)) {
    this.deselectFoodType(typeName);
  } else {
    this.selectFoodType(typeName);
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