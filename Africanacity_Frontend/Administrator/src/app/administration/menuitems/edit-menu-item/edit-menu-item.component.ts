import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuTypes } from 'src/app/shared/menu-types';
import { FoodType } from 'src/app/shared/food-type';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import { MenuItem } from 'src/app/shared/menu-item';
import { MenuitemsComponent } from '../menuitems.component';

@Component({
  selector: 'app-edit-menu-item',
  templateUrl: './edit-menu-item.component.html',
  styleUrls: ['./edit-menu-item.component.css']
})
export class EditMenuItemComponent implements OnInit {
 
  menuItemId!: number;
  menuItem: MenuItem = new MenuItem();
  menuTypes!: MenuTypes[];
  foodTypes!: FoodType[];
  menuCategory!: MenuItemCategory[];


  constructor(private route: ActivatedRoute, private dataService: DataService,private router: Router,
    private snackBar: MatSnackBar){}

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
  getAMenuItem() {
    this.dataService.GetMenuItemById(this.menuItemId).subscribe(
      response => {
        this.menuItem = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  //get the menu types
  getMenuTypes() {
    this.dataService.GetAllMenuTypes().subscribe(
      response => {
        this.menuTypes = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  //get the foodtypes

  getFoodTypes() {
    this.dataService.GetAllFoodTypes().subscribe(
      response => {
        this.foodTypes = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  //get the food categories
  getMenuCategories() {
    this.dataService.GetAllMenuItemCategories().subscribe(
      response => {
        this.menuCategory = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  //save the changes 
  saveMenuItem() {
    this.dataService.editMenuItem(this.menuItemId, this.menuItem).subscribe(
      response => {
        console.log('Menu item updated successfully.');
        this.showSnackBar('Menu item updated successfully.');
      },
      error => {
        console.log(error);
        this.showSnackBar('Error updating menu item. Please try again.');
      }
    );
  }

 

//pop up message
showSnackBar(message: string){
  const snackBarRef = this.snackBar.open(message, 'Close', {
    duration: 3000, // Duration in milliseconds
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  });

  snackBarRef.onAction().subscribe(() => {
    // Navigate to the  menu item page
    this.router.navigate(['/menuitems']);
  });
}

  

}

