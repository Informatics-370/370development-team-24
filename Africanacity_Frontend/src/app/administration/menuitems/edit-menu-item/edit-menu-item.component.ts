import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuTypes } from 'src/app/shared/menu-types';
import { FoodType } from 'src/app/shared/food-type';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import { MenuItem } from 'src/app/shared/menu-item';

@Component({
  selector: 'app-edit-menu-item',
  templateUrl: './edit-menu-item.component.html',
  styleUrls: ['./edit-menu-item.component.css']
})
export class EditMenuItemComponent implements OnInit {
 
  menuItemId!: number;
  menuItem!: MenuItem;
  menuTypes!: MenuTypes[];
  foodTypes!: FoodType[];
  menuCategory!: MenuItemCategory[];


  constructor(private route: ActivatedRoute, private dataService: DataService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id!==null){
        this.menuItemId = +id;
        this.getAMenuItem();
      }
    });

    this.getMenuTypes();
    this.getFoodTypes();
    this.getMenuCategories();
  }


  //get a menu item
  getAMenuItem(): void {
    this.dataService.GetMenuItemById(this.menuItemId)
      .subscribe(menuItem => this.menuItem = menuItem);
  }

  //get the menu types
  getMenuTypes(): void {
    this.dataService.GetAllMenuTypes()
      .subscribe(menuTypes => this.menuTypes = menuTypes);
  }

  //get the foodtypes

  getFoodTypes(): void {
    this.dataService.GetAllFoodTypes()
      .subscribe(foodTypes => this.foodTypes = foodTypes);
  }

  //get the food categories
  getMenuCategories(): void {
    this.dataService.GetAllMenuItemCategories()
      .subscribe(menuCategory => this.menuCategory = menuCategory);
  }

  //save the changes 
  saveMenuItem(): void {
    this.dataService.editMenuItem(this.menuItemId, this.menuItem)
      .subscribe(() => {
        // Handle successful edit, such as displaying a success message
      }, error => {
        // Handle error, such as displaying an error message
      });
  }


}
