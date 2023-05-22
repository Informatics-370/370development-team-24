import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { MenuTypes } from 'src/app/shared/menu-types';
import {Router} from '@angular/router';


import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MenuItem } from 'src/app/shared/menu-item';
import { FoodType } from 'src/app/shared/food-type';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import {map, take } from 'rxjs/operators';


@Component({
  selector: 'app-menuitems',
  templateUrl: './menuitems.component.html',
  styleUrls: ['./menuitems.component.css']
})
export class MenuitemsComponent {

  menuItems: MenuItem[]=[]
  foodTypes: FoodType[] = []
  menuCategories: MenuItemCategory [] = []
  menuTypes:MenuTypes[] = []
  httpClient: any;
  apiUrl: any;

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
GetAllMenuItems() {
  this.dataService.GetAllMenuItems().subscribe(
    (menuItems) => {
      this.menuItems = menuItems;
      this.loadAssociatedNames();
    },
    (error) => {
      console.error(error);
    }
  );
}

/*GetAllMenuItems() {
  this.dataService.GetAllMenuItems().subscribe(result => {
    let menuItemList:any[] = result
    menuItemList.forEach((element) => {
      this.menuItems.push(element);
      
      
    });
  })
}*/

/*GetAllMenuItems(): void {
  this.http.get<MenuItem[]>('/MenuItems/GetAllMenuItems').subscribe(
    (response) => {
      this.menuItems = response;
      this.loadAssociatedNames();
    },
    (error) => {
      console.error('Failed to fetch menu items:', error);
    }
  );
}*/

loadAssociatedNames(): void {
  for (const menuItem of this.menuItems) {
    this.getFoodTypeName(menuItem.foodTypeId);
    this.getMenuItemCategoryName(menuItem.menuItemCategory_Id);
    this.getFoodTypeName(menuItem.menu_TypeId);
  }
}

/*loadMenuTypeName(menuItem: MenuTypes): void {
  this.http.get<any>(`api/MenuType/GetAllMenuTypes${menuItem.name}`).subscribe(
    (response) => {
      menuItem.name = response.name;
    },
    (error) => {
      console.error('Failed to fetch menu type name:', error);
    }
  );
}*/

getFoodTypeName(foodTypeId: number): void {
  this.dataService.GetFoodTypeById(foodTypeId).subscribe(
    (foodType) => {
      const foundFoodType = this.foodTypes.find((ft) => ft.foodTypeId == foodType.foodTypeId);
      if (foundFoodType) {
        foundFoodType.name = foodType.name;
      } else {
        this.foodTypes.push(foodType);
      }
    },
    (error) => {
      console.error('Failed to fetch food type name:', error);
    }
  );
}

getMenuItemCategoryName(categoryId: number): void {
  this.dataService.GetMenuItemCategoryById(categoryId).subscribe(
    (menuItemCategory) => {
      const foundCategory = this.menuCategories.find((mc) => mc.menuItemCategory_Id == menuItemCategory.category_Id);
      if (foundCategory) {
        foundCategory.name = menuItemCategory.name;
      } else {
        this.menuCategories.push(menuItemCategory);
      }
    },
    (error) => {
      console.error('Failed to fetch menu category name:', error);
    }
  );
}

getMenuTypeName(menuTypeId: number): void {
  this.dataService.GetMenuTypeById(menuTypeId).subscribe(
    (menuType) => {
      const foundMenuType = this.menuTypes.find((mt) => mt.menu_TypeId == menuType.menu_TypeId);
      if (foundMenuType) {
        foundMenuType.name = menuType.name;
      } else {
        this.menuTypes.push(menuType);
      }
    },
    (error) => {
      console.error('Failed to fetch menu type name:', error);
    }
  );
}

deleteItem(): void{
 
  const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete the menu type?','Delete',{
      duration: 5000,
    });

    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer();
      window.location.reload();
    })

  }

  deleteItemFromServer(): void{
    this.deleteMenuItem;
  }


deleteMenuItem(menu_ItemId: Number){
  this.dataService.deleteMenuType(menu_ItemId).subscribe(result => {
    this.deleteItem();
  });
}
 

/*loadMenuCategoryName(menuItem: MenuItem): void {
  this.http.get<any>(`api/MenuItem_Category/GetAllMenuItemCategories${menuItem.name}`).subscribe(
    (response) => {
      menuItem.menuCategoryName = response.name;
    },
    (error) => {
      console.error('Failed to fetch menu category name:', error);
    }
  );
}*/


/*loadFoodTypeName(menuItem: MenuItem): void {
  this.http.get<any>(`api/foodTypeController/GetAllFoodTypes${menuItem.name}`).subscribe(
    (response) => {
      menuItem.foodTypeName = response.name;
    },
    (error) => {
      console.error('Failed to fetch food type name:', error);
    }
  );
}
*/

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
