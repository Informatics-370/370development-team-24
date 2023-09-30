import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuTypes } from 'src/app/shared/menu-types';
import { FoodType } from 'src/app/shared/food-type';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import { MatDialog } from '@angular/material/dialog';
import { HelpAddmenuitemComponent } from './help-addmenuitem/help-addmenuitem.component';
import { MenuCategoryFoodType } from 'src/app/shared/menuCategoryFoodType';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.css']
})
export class AddMenuItemComponent implements OnInit {

  formData = new FormData();
  menuTypesData:MenuTypes[]=[];
  foodTypesData:FoodType[]=[];
  menuItemCategoryData:MenuItemCategory[]=[];
  filteredMenuCategories: MenuItemCategory[] = [];
  filteredFoodTypes: FoodType[] = [];

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    menu_TypeId: ['', Validators.required],
    menu_CategoryId: [null, Validators.required],
    foodTypeId: [null, Validators.required],
    
    amount: [null, Validators.required]
    
  })

  constructor(private dataService: DataService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.GetAllMenuTypes()
    this.GetAllMenuItemCategories()
    this.GetAllFoodTypes()
   
  }


//get menutypes options
GetAllMenuTypes(){
  this.dataService.GetAllMenuTypes().subscribe(result => {
    let menuTypesList:any[] = result
    menuTypesList.forEach((element) => {
      this.menuTypesData.push(element)
    });
  });
}

GetAllMenuItemCategories(){
  this.dataService.GetAllMenuItemCategories().subscribe(result => {
    let menuItemCategoryList:any[] = result
    menuItemCategoryList.forEach((element) => {
      this.menuItemCategoryData.push(element)
    });
  });
}

GetAllFoodTypes(){
  this.dataService.GetAllFoodTypes().subscribe(result => {
    let foodTypeList:any[] = result
    foodTypeList.forEach((element) => {
      this.foodTypesData.push(element)
    });
  });
}

//filter menu categories on selected menu type
onMenuTypeChange() {
  const menu_TypeId = this.productForm.get('menu_TypeId')?.value;

  if (menu_TypeId) {
    // Call the API to get filtered menu categories
    this.dataService.getCategoriesByMenuType(menu_TypeId).subscribe(result => {
      this.filteredMenuCategories = result;
    });
  } else {
    // If no menu type is selected, clear the filtered menu categories
    this.filteredMenuCategories = [];
  }

  // Reset the selected menu category and food type
  this.productForm.get('menu_CategoryId')?.setValue(null);
  this.filteredFoodTypes = [];
}



//filter food types on selected menu categories
onMenuCategoryChange() {
  const menu_CategoryId = this.productForm.get('menu_CategoryId')?.value;

  if (menu_CategoryId) {
    // Call the API to get filtered food types
    this.dataService.getFoodTypesByMenuCategories(menu_CategoryId).subscribe(result => {
      this.filteredFoodTypes = result;
    });
  } else {
    // If no menu category is selected, clear the filtered food types
    this.filteredFoodTypes = [];
  }
}



//submit form function
onSubmit() {
  if (this.productForm.valid) {
    const menuItemData = {
      name: this.productForm.get('name')!.value,
      description: this.productForm.get('description')!.value,
      menu_TypeId: this.productForm.get('menu_TypeId')!.value,
      menu_CategoryId: this.productForm.get('menu_CategoryId')!.value,
      foodTypeId: this.productForm.get('foodTypeId')!.value,
      amount: this.productForm.get('amount')!.value,
    };

    this.dataService.addMenuItem(menuItemData).subscribe(
      () => {
        this.clearData();
        this.router.navigateByUrl('menuitems').then((navigated: boolean) => {
          if (navigated) {
            this.snackBar.open(this.productForm.get('name')!.value + ` created successfully`, 'X', { duration: 5000 });
          }
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
}


clearData(){
  this.formData.delete("name");
  this.formData.delete("description");
  this.formData.delete("menuType");
  this.formData.delete("foodType");
  this.formData.delete("menuCategory");
}

cancel() {
  this.router.navigate(['/menuitems']);
}
openHelpModal(field: string): void {
  const dialogRef = this.dialog.open(HelpAddmenuitemComponent, {
    width: '500px',
    data: { field } // Pass the field name to the modal
  });

  dialogRef.afterClosed().subscribe(result => {
    // Handle modal close if needed
  });
}




}