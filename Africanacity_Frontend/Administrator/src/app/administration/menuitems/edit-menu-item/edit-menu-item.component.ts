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
  menuItem: MenuItem = {} as MenuItem;
  menuTypes!: MenuTypes[];
  foodTypes!: FoodType[];
  menuCategory!: MenuItemCategory[];
  menuItemPrices!: number;
  updatedMenuItem: any = {};

  editMenuItemForm!: FormGroup; 
  //intialize form 



  constructor(private route: ActivatedRoute, private dataService: DataService,private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id!==null){
        this.menuItemId = +id;
        this.loadMenuItem();
      }
    });

    this.getMenuTypes();
    this.getFoodTypes();
    this.getMenuCategories();

     // Initialize the form group and controls
     this.editMenuItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      menuTypeName: [''],
      foodTypeName: [''],
      menuCategoryName: [''],
      amount: ['', Validators.required]
    });


    /*this.editMenuItemForm.valueChanges.subscribe(data => {
      this.editMenuItemForm.patchValue({
        name: this.menuItem.name,
        description: this.menuItem.description,
        menuTypeName: this.menuItem.menuTypeName,
        foodTypeName: this.menuItem.foodTypeName,
        menuCategoryName: this.menuItem.menuCategoryName,
        amount: this.menuItem.menuItemsPrices
      }, { emitEvent: false }); // Prevent infinite loop
    });*/





  }


  //get a menu item
  getAMenuItem() {
    this.dataService.GetMenuItemById(this.menuItemId).subscribe(
      response => {
        this.menuItem = response;
        this.menuItemPrices = response.amount
      },
      error => {
        console.log(error);
      }
    );
  }

  loadMenuItem() {
    this.dataService.GetMenuItemById(this.menuItemId).subscribe(
      (response: any) => {
        this.menuItem =response;
        this.menuItemPrices = response.amount;
        console.log('Retreived menu item', this.menuItem); //check if it is retrieved from api
        
          // Map related data
      /*this.menuItem.menuTypeName = response.menu_Type?.name || '';
      this.menuItem.menuCategoryName = response.menuItem_Category?.name || '';
      this.menuItem.foodTypeName = response.food_Type?.name || '';
      this.menuItem.menuItemsPrices = response.menuItem_Prices || {};
      if (response.menuItem_Prices) {
        for (const price of response.menuItem_Prices) {
          this.menuItem.menuItemsPrices[price.menuItem_Id] = price.amount;
        }
      }*/
        //this.menuItemPrices= menuItemPrice ? menuItemPrice : 0;

        // Populate form controls with retrieved data
        this.editMenuItemForm.setValue({
          name: this.menuItem.name,
          description: this.menuItem.description,
          menuTypeName: this.menuItem.menuTypeName, // Assuming this is the foreign key ID
          foodTypeName: this.menuItem.foodTypeName, // Assuming this is the foreign key ID
          menuCategoryName: this.menuItem.menuCategoryName, // Assuming this is the foreign key ID
          amount: this.menuItem.menuItemsPrices || 0
        });
      },
      error => {
        console.error('Error loading menu item:', error);
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


  //new edit method
  editMenuItem() {
   
    const menuItemWithUpdates: MenuItem = {
      menuItem_Id: this.menuItem.menuItem_Id,
      name: this.menuItem.name,
      description: this.menuItem.description,
      menuTypeName: this.menuItem.menuTypeName,
      foodTypeName: this.menuItem.foodTypeName,
      menuCategoryName: this.menuItem.menuCategoryName,
      menuItemsPrices: {
        [this.menuItemId]: this.menuItemPrices
      }
    };

  
    this.dataService.editMenuItemWithPrice(this.menuItemId, menuItemWithUpdates).subscribe(
      response => {
        console.log('Menu item edited successfully:', response);
        // Optionally, navigate to a different page or update the UI
        this.router.navigate(['/menu-items']); // Redirect to menu items list
      },
      error => {
        console.error('Error editing menu item:', error);
        // Handle the error (e.g., show an error message)
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

