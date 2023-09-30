import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MenuTypes } from 'src/app/shared/menu-types';
import { FoodType } from 'src/app/shared/food-type';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import { MenuItem } from 'src/app/shared/menu-item';
import { MenuitemsComponent } from '../menuitems.component';
import { MenuItemPrice } from 'src/app/shared/MenuItemPrice';
import { PriceService } from 'src/app/service/menuprice';
import { MatDialog } from '@angular/material/dialog';
import { HelpEditmenuitemComponent } from './help-editmenuitem/help-editmenuitem.component';

// @Component({
//   selector: 'app-edit-menu-item',
//   templateUrl: './edit-menu-item.component.html',
//   styleUrls: ['./edit-menu-item.component.css']
// })
// export class EditMenuItemComponent implements OnInit {
 
//   menuItemId!: number;
//   menuItem: MenuItem = {} as MenuItem;
//   menuTypes!: MenuTypes[];
//   foodTypes!: FoodType[];
//   menuCategory!: MenuItemCategory[];
//   menuItemPrices!: number;
//   updatedMenuItem: any = {};
//   formData = new FormData();
//   editMenuItemForm!: FormGroup; 
//   //intialize form 



//   constructor(private route: ActivatedRoute, private dataService: DataService,private router: Router,
//     private formBuilder: FormBuilder,
//     private snackBar: MatSnackBar){}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       const id = params.get('id');
//       if (id!==null){
//         this.menuItemId = +id;
//         this.loadMenuItem();
//       }
//     });

//     this.getMenuTypes();
//     this.getFoodTypes();
//     this.getMenuCategories();

//      // Initialize the form group and controls
//      this.editMenuItemForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       description: [''],
//       menuTypeName: [''],
//       foodTypeName: [''],
//       menuCategoryName: [''],
//       amount: ['', Validators.required]
//     });








//   }


//   //get a menu item
//   getAMenuItem() {
//     this.dataService.GetMenuItemById(this.menuItemId).subscribe(
//       response => {
//         this.menuItem = response;
//         this.menuItemPrices = response.amount
//       },
//       error => {
//         console.log(error);
//       }
//     );
//   }

//   loadMenuItem() {
//     this.dataService.GetMenuItemById(this.menuItemId).subscribe(
//       (response: any) => {
//         this.menuItem =response;
//         this.menuItemPrices = response.amount;
//         console.log('Retreived menu item', this.menuItem); //check if it is retrieved from api
        
       
//         this.editMenuItemForm.setValue({
//           name: this.menuItem.name,
//           description: this.menuItem.description,
//           menuTypeName: this.menuItem.menuTypeName, // Assuming this is the foreign key ID
//           foodTypeName: this.menuItem.foodTypeName, // Assuming this is the foreign key ID
//           menuCategoryName: this.menuItem.menuCategoryName, // Assuming this is the foreign key ID
//           amount: this.menuItem.price
//         });
//       },
//       error => {
//         console.error('Error loading menu item:', error);
//       }
//     );
//   }



//   //get the menu types
//   getMenuTypes() {
//     this.dataService.GetAllMenuTypes().subscribe(
//       response => {
//         this.menuTypes = response;
//       },
//       error => {
//         console.log(error);
//       }
//     );
//   }

//   //get the foodtypes

//   getFoodTypes() {
//     this.dataService.GetAllFoodTypes().subscribe(
//       response => {
//         this.foodTypes = response;
//       },
//       error => {
//         console.log(error);
//       }
//     );
//   }

//   //get the food categories
//   getMenuCategories() {
//     this.dataService.GetAllMenuItemCategories().subscribe(
//       response => {
//         this.menuCategory = response;
//       },
//       error => {
//         console.log(error);
//       }
//     );
//   }

//   //save the changes 
//   saveMenuItem() {
//     this.dataService.editMenuItem(this.menuItemId, this.menuItem).subscribe(
//       response => {
//         console.log('Menu item updated successfully.');
//         this.showSnackBar('Menu item updated successfully.');
//       },
//       error => {
//         console.log(error);
//         this.showSnackBar('Error updating menu item. Please try again.');
//       }
//     );
//   }


//   //new edit method
//   editMenuItem() {
   
//     let menuItem = new MenuItem();
//     menuItem.name = this.editMenuItemForm.value.name;
//     menuItem.description = this.editMenuItemForm.value.description;
//     menuItem.menuTypeName = this.editMenuItemForm.value.menuTypeName;
//     menuItem.foodTypeName = this.editMenuItemForm.value.foodTypeName;
//     menuItem.menuCategoryName = this.editMenuItemForm.value.menuCategoryName;
//     // menuItem.price = this.editMenuItemForm.value.price;

//     const amount = this.editMenuItemForm.get('price')!.value;
//     this.formData.append('price', amount.toString());
  
//     this.dataService.editMenuItemWithPrice(this.menuItemId, menuItem).subscribe(
//       response => {
//         console.log('Menu item edited successfully:', response);
//         // Optionally, navigate to a different page or update the UI
//         this.router.navigate(['/menuitems']); // Redirect to menu items list
//       },
//       error => {
//         console.error('Error editing menu item:', error);
//         // Handle the error (e.g., show an error message)
//       }
//     );
//   }

 

// //pop up message
// showSnackBar(message: string){
//   const snackBarRef = this.snackBar.open(message, 'Close', {
//     duration: 3000, // Duration in milliseconds
//     horizontalPosition: 'center',
//     verticalPosition: 'bottom'
//   });

//   snackBarRef.onAction().subscribe(() => {
//     // Navigate to the  menu item page
//     this.router.navigate(['/menuitems']);
//   });
// }

  

// }

function salaryNonNegativeValidator(control: FormControl): { [key: string]: any } | null {
  const salary = control.value;
  
  if (salary !== null && (isNaN(salary) || salary <= 0)) {
    return { 'invalidSalary': true };
  }
  
  return null;
}

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
  formData = new FormData();
  editMenuItemForm!: FormGroup;
  menuItemPrice!: MenuItemPrice; // Add a property for MenuItemPrice

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private price: PriceService,
    private dialog: MatDialog
  ) {}

  cancel(){
    this.router.navigate(['/menuitems'])
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.menuItemId = +id;
        this.loadMenuItem();
      }
    });

    this.getMenuTypes();
    this.getFoodTypes();
    this.getMenuCategories();

    this.editMenuItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      menuTypeName: [''],
      foodTypeName: [''],
      menuCategoryName: [''],
      amount: [0, salaryNonNegativeValidator] // Provide a default value (e.g., 0)
    });
    
  }

  loadMenuItem() {
    this.dataService.GetMenuItemById(this.menuItemId).subscribe(
      (response: any) => {
        this.menuItem = response;
        this.menuItemPrices = response.amount;

        // Load the price from MenuItemPrice
        this.loadMenuItemPrice();

        this.editMenuItemForm.setValue({
          name: this.menuItem.name,
          description: this.menuItem.description,
          menuTypeName: this.menuItem.menuTypeName,
          foodTypeName: this.menuItem.foodTypeName,
          menuCategoryName: this.menuItem.menuCategoryName,
          amount: this.menuItem.price,
        });
      },
      error => {
        console.error('Error loading menu item:', error);
      }
    );
  }

  loadMenuItemPrice() {
    this.price.getAMenuItemPrice(this.menuItemId).subscribe(
      (response: any) => {
        this.menuItemPrice = response;
        console.log('Response:', response); // Add this line to inspect the response
        if (this.menuItemPrice) {
          this.editMenuItemForm.get('amount')!.setValue(this.menuItemPrice.amount);
        }
      },
      error => {
        console.error('Error loading menu item price:', error);
      }
    );
  }
  

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

  editMenuItem() {
    const updatedPrice = this.editMenuItemForm.get('amount')!.value;

   

    // Continue with saving the menu item
    let menuItem = new MenuItem();
    menuItem.name = this.editMenuItemForm.value.name;
    menuItem.description = this.editMenuItemForm.value.description;
    menuItem.menuTypeName = this.editMenuItemForm.value.menuTypeName;
    menuItem.foodTypeName = this.editMenuItemForm.value.foodTypeName;
    menuItem.menuCategoryName = this.editMenuItemForm.value.menuCategoryName;
    menuItem.price = updatedPrice;
    this.updateMenuItemPrice(updatedPrice);

    this.dataService.editMenuItem(this.menuItemId, menuItem).subscribe(
      (response: any) => {
        if (response) {
          this.router.navigate(['/menuitems']);
         
          this.showSuccessMessage( menuItem.name + 'Information updated successfully!');
        } else {
          this.showSuccessMessage( menuItem.name + 'Information cannot be updated!');
        }
      },
      
      (error) => {
        this.showSuccessMessage( menuItem.name +'s' +'' + 'Information cannot be updated!');
      }
    );
  }

  showSuccessMessage(message: string): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  updateMenuItemPrice(price: number) {
    if (this.menuItemPrice) {
      this.menuItemPrice.amount = price;
  
      // Pass both MenuItem_PriceId and menuItemPriceViewModel
      this.price.editMenuItemPrice(this.menuItemPrice.menuItem_PriceId, this.menuItemPrice).subscribe(
        response => {
          console.log('Menu item price updated successfully:', response);
        },
        error => {
          console.error('Error updating menu item price:', error);
        }
      );
    }
  }
  
  

  

  showSnackBar(message: string) {
    const snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/menuitems']);
    });
  }
  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpEditmenuitemComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
}
