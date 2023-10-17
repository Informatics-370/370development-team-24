import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { FoodType } from 'src/app/shared/food-type';
import { ActivatedRoute} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/administration/menu-types/add-menu-type/confirmation-dialog/confirmation-dialog.component'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'
import { HelpAddfoodtypeComponent } from './help-addfoodtype/help-addfoodtype.component';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';

@Component({
  selector: 'app-create-food-type',
  templateUrl: './create-food-type.component.html',
  styleUrls: ['./create-food-type.component.css']
})
export class CreateFoodTypeComponent {
  @ViewChild('toastContainer', { read: ViewContainerRef })
  toastContainer!: ViewContainerRef;
  FoodTypeId!: number;
  AddFoodTypeForm!: FormGroup;
  menuCategories: MenuItemCategory[] = [];
  menuCategoryFoodTypeItems!: FormArray;

  constructor(private dataService: DataService, 
    private route: ActivatedRoute, 
    private router: Router,
    private dialog: MatDialog, 
    private snackBar: MatSnackBar, 
    private fb: FormBuilder) 
  {

    //creating a form {
        this.AddFoodTypeForm = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        menuCategoryFoodTypeItems: this.fb.array([]),
        //selectedMenuCategories: ['', [Validators.required]]
      });
      this.menuCategoryFoodTypeItems = this.AddFoodTypeForm.get('menuCategoryFoodTypeItems') as FormArray;
    }
  
    //confirmation dialog method
    openDialog():void{
      const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
        width: '250px',
        data: 'Add New Food Type?'
      });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Yes'){
        this.AddFoodType();
        
      }
    })
  }

  ngOnInit(): void {
    // Fetch the list of MenuCategories when the component initializes
    this.dataService.GetAllMenuItemCategories().subscribe((categories) => {
      this.menuCategories = categories;
    });
  }

  cancel()
  {
    this.router.navigate(['/food-type'])
  }

  AddFoodType()
  {
    if (this.AddFoodTypeForm.invalid){
      return;
    }
  
    // Construct the foodTypeData object with the selected menu categories
    const foodTypeData = {
      name: this.AddFoodTypeForm.value.name,
      description: this.AddFoodTypeForm.value.description,
      menuCategoryFoodTypeItems: this.AddFoodTypeForm.value.menuCategoryFoodTypeItems.map((item: any) => ({
        menu_CategoryId: item.menu_CategoryId,
        
      }))
    };
    console.log ('Food Type data sent to API:', foodTypeData);

    this.dataService.AddFoodType(foodTypeData).subscribe((add:any) => {
      this.router.navigate(['/food-type'])
    });
    this.showSuccessMessage('Food Type added successfully!');
  }

  //add another
  addItem(): void {
    const itemControl = this.fb.group({
      menu_CategoryId: ['', Validators.required],
      
    });

    this.menuCategoryFoodTypeItems.push(itemControl);
  }

  // success message
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
    const dialogRef = this.dialog.open(HelpAddfoodtypeComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }

}