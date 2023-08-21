import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuTypes } from 'src/app/shared/menu-types';
import { FoodType } from 'src/app/shared/food-type';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.css']
})
export class AddMenuItemComponent implements OnInit {

  formData = new FormData();
  menuTypesData:MenuTypes[]=[]
  foodTypesData:FoodType[]=[]
  menuItemCategoryData:MenuItemCategory[]=[]

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    menuType: ['', Validators.required],
    foodType: [null, Validators.required],
    menuCategory: [null, Validators.required],
    amount: [null, Validators.required]
    
  })

  constructor(private dataService: DataService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.GetAllMenuTypes()
    this.GetAllFoodTypes()
    this.GetAllMenuItemCategories()
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

//get foodtypes options
GetAllFoodTypes(){
  this.dataService.GetAllFoodTypes().subscribe(result => {
    let foodTypesList:any[] = result
    foodTypesList.forEach((element) => {
      this.foodTypesData.push(element)
    });
  });
}

//get menu category options
GetAllMenuItemCategories(){
  this.dataService.GetAllMenuItemCategories().subscribe(result => {
    let menuCategoryList:any[] = result
    menuCategoryList.forEach((element) => {
      this.menuItemCategoryData.push(element)
    });
  });
}


//submit form function
onSubmit() {
  if(this.productForm.valid)
  {
    this.formData.append('name', this.productForm.get('name')!.value);
    this.formData.append('description', this.productForm.get('description')!.value);
    this.formData.append('menuType', this.productForm.get('menuType')!.value);
    this.formData.append('foodType', this.productForm.get('foodType')!.value);
    this.formData.append('menuCategory', this.productForm.get('menuCategory')!.value);
    
        // Add the price as well
        const amount = this.productForm.get('amount')!.value;
        this.formData.append('amount', amount.toString());

    this.dataService.addMenuItem(this.formData, amount).subscribe(() => {
      this.clearData()
      this.router.navigateByUrl('menuitems').then((navigated: boolean) => {
        if(navigated) {
          this.snackBar.open(this.productForm.get('name')!.value + ` created successfully`, 'X', {duration: 5000});
        }
     });
    });
  }
}

clearData(){
  this.formData.delete("name");
  this.formData.delete("description");
  this.formData.delete("menuType");
  this.formData.delete("foodType");
  this.formData.delete("menuCategory");
}




}