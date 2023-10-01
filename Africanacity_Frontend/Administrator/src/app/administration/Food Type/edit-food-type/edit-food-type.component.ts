import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { FoodType } from 'src/app/shared/food-type';
import { ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HelpEditfoodtypeComponent } from './help-editfoodtype/help-editfoodtype.component';
import { FoodTypeViewModel } from 'src/app/shared/foodTypeViewModel';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';

@Component({
  selector: 'app-edit-food-type',
  templateUrl: './edit-food-type.component.html',
  styleUrls: ['./edit-food-type.component.css']
})

export class EditFoodTypeComponent {

  editFoodType: FoodType = new FoodType();

  updateFoodTypeForm!: FormGroup;
  menuCategories: MenuItemCategory [] = [];

   // Define menuCategoryFoodTypeItems as a FormArray
   get menuCategoryFoodTypeItems(): FormArray {
    return this.updateFoodTypeForm.get('menuCategoryFoodTypeItems') as FormArray;
  }

  constructor(private dataService: DataService, private router: Router, private http: HttpClient, private activated:ActivatedRoute, private dialog: MatDialog) {
    this.updateFoodTypeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      // Define menuCategoryFoodTypeItems as a FormArray
      menuCategoryFoodTypeItems: new FormArray([]),
    });
  }
  ngOnInit(): void {
    this.activated.params.subscribe(params => { 
      this.dataService.GetFoodType(params['id']).subscribe(res => { 
        this.editFoodType = res as FoodType;
  
        this.updateFoodTypeForm.controls['name'].setValue(this.editFoodType.name);
        this.updateFoodTypeForm.controls['description'].setValue(this.editFoodType.description);
  
        // Clear existing menuCategoryFoodTypeItems
        while (this.menuCategoryFoodTypeItems.length !== 0) {
          this.menuCategoryFoodTypeItems.removeAt(0);
        }
  
        // Populate menuCategoryFoodTypeItems FormArray
        this.editFoodType.menuCategoryFoodTypeItems.forEach(item => {
          this.menuCategoryFoodTypeItems.push(new FormGroup({
            menu_CategoryId: new FormControl(item.menu_CategoryId, [Validators.required]),
          }));
        });

        console.log('menuCategories:', this.menuCategories);
  
        // Set the initial values for the dropdowns
        this.menuCategoryFoodTypeItems.controls.forEach((control, index) => {
          const associatedMenuCategoryId = this.editFoodType.menuCategoryFoodTypeItems[index].menu_CategoryId;
          control.get('menu_CategoryId')?.setValue(associatedMenuCategoryId);
        });
      });
    });
  
    this.GetAllMenuCategories();
  }
  

  cancel(){
    this.router.navigate(['/food-type'])
  }

  GetAllMenuCategories(){
    this.dataService.GetAllMenuItemCategories().subscribe(result => {
    let menuCategoryList:any[] = result
    menuCategoryList.forEach((element) => {
    this.menuCategories.push(element)
  });
});
}

getMenuCategoryName(menu_CategoryId: number): string {
  const menuCategory = this.menuCategories.find(category => category.menu_CategoryId === menu_CategoryId);
  return menuCategory ? menuCategory.name : '';
}

  UpdateFoodType() {
    if (this.updateFoodTypeForm.valid) {
      // Construct the foodTypeData object with the selected menu categories
      const foodTypeData: FoodType = {
        foodTypeId: this.editFoodType.foodTypeId,
        name: this.updateFoodTypeForm.value.name,
        description: this.updateFoodTypeForm.value.description,
        menuCategoryFoodTypeItems: this.updateFoodTypeForm.value.menuCategoryFoodTypeItems.map((item: any) => ({
          menu_CategoryId: item.menu_CategoryId,
        }))
      };
  
      this.dataService.EditFoodType(this.editFoodType.foodTypeId, foodTypeData).subscribe(
        (response: any) => {
          if (response) {
            this.router.navigate(['/food-type']);
            window.location.reload();
          } else {
            alert(response.message);
          }
        },
        (error) => {
          console.error('Error updating food type:', error);
          // Handle error appropriately, show a toast, etc.
        }
      );
    }
  }
  
  
  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpEditfoodtypeComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
}
