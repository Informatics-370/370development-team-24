import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { MenuTypes } from 'src/app/shared/menu-types';
import {Router} from '@angular/router';


import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MenuItem } from 'src/app/shared/menu-item';
import { FoodType } from 'src/app/shared/food-type';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import {take } from 'rxjs/operators';


@Component({
  selector: 'app-menuitems',
  templateUrl: './menuitems.component.html',
  styleUrls: ['./menuitems.component.css']
})
export class MenuitemsComponent {

  menuItems: MenuItem[] = []
  foodTypes: FoodType[] = []
  menuCategories: MenuItemCategory [] = []
  menuTypes:MenuTypes[] = []

  constructor(private dataService: DataService, 
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar){}

    ngOnInit(): void{
   
      this.GetAllMenuItems()
      console.log(this.menuItems)
    }

  /*************************** MENU ITEM ************/
/**Get all menu items** */
/*GetAllMenuItems() {
  this.dataService.GetAllMenuItems().subscribe(
    (menuItems) => {
      this.menuItems = menuItems;
      this.populateColumnNames();
    },
    (error) => {
      console.error(error);
    }
  );
}*/

GetAllMenuItems() {
  this.dataService.GetAllMenuItems().subscribe(result => {
    let menuItemList:any[] = result
    menuItemList.forEach((element) => {
      this.menuItems.push(element)
    });
  })
}



// ...

/*populateColumnNames() {
  for (const menuItem of this.menuItems) {
    this.dataService.GetFoodTypeById(menuItem.foodType_Id)
      .pipe(take(1))
      .subscribe({
        next: (foodTypeName) => {
          menuItem.foodTypeName = foodTypeName;
        },
        error: (error) => {
          console.error(error);
        }
      });

    this.dataService.GetMenuItemCategoryById(menuItem.menuCategory_Id)
      .pipe(take(1))
      .subscribe({
        next: (menuCategoryName) => {
          menuItem.menuCategoryName = menuCategoryName;
        },
        error: (error) => {
          console.error(error);
        }
      });

    this.dataService.GetMenuTypeById(menuItem.menu_TypeId)
      .pipe(take(1))
      .subscribe({
        next: (menuTypeName) => {
          menuItem.menuTypeName = menuTypeName;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}*/

/*populateColumnNames() {
  for (const menuItem of this.menuItems) {
    if (menuItem.foodType && menuItem.foodType.name) {
      menuItem.foodType.name = menuItem.foodType.name;
    }

    if (menuItem.category && menuItem.category.name) {
      menuItem.category.name = menuItem.category.name;
    }
  }
}*/





}
