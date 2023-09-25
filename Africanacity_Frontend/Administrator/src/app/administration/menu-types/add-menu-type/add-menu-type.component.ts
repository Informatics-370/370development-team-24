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
import { MenuTypeWithAssociations } from 'src/app/shared/menuTypeWithAssociations';

@Component({
  selector: 'app-add-menu-type',
  templateUrl: './add-menu-type.component.html',
  styleUrls: ['./add-menu-type.component.css']
})

export class AddMenuTypeComponent {
  formData = new FormData();
  menu_typeId: number = 0;
  
  @ViewChild('toastContainer', { read: ViewContainerRef })
  toastContainer!: ViewContainerRef;

  //For the tree diagram concept//
  menuCategories: string[] = [];
  foodTypes: string [] = [];
    // Properties to store available menu categories and food types
    allMenuCategories: MenuItemCategory[] = []; // Initialize with your data
    allFoodTypes: FoodType[] = []; // Initialize with your data
 

    addMenuTypeForm: FormGroup= this.fb.group({
      name: ['', Validators.required],
      menu_CategoryId: [null, Validators.required],
      foodTypeId: [null, Validators.required]
      
    })

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
      const menuTypeModel = {
        name: this.addMenuTypeForm.get('name')!.value,
        menu_CategoryId: this.addMenuTypeForm.get('menu_CategoryId')!.value,
        foodTypeId: this.addMenuTypeForm.get('foodTypeId')!.value
      };
  
      this.dataService.AddMenuType(menuTypeModel).subscribe(() => {
        this.router.navigateByUrl('menu-types').then((navigated: boolean) => {
          if (navigated) {
            this.snackBar.open(this.addMenuTypeForm.get('name')!.value + ` created successfully`, 'X', { duration: 5000 });
          }
        });
      });
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