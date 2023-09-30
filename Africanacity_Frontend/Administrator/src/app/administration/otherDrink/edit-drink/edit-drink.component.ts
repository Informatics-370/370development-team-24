import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Drink } from 'src/app/shared/Drink';
import { OtherDrink } from 'src/app/shared/other-drink';
import { DrinkType } from 'src/app/shared/Drink_Type';
import { OtherDrinkPrice } from 'src/app/shared/otherDrinkPrice';
import { PriceService } from 'src/app/service/menuprice';
import { MatDialog } from '@angular/material/dialog';
import { HelpEditdrinkComponent } from './help-editdrink/help-editdrink.component';

@Component({
  selector: 'app-edit-drink',
  templateUrl: './edit-drink.component.html',
  styleUrls: ['./edit-drink.component.css']
})
export class EditDrinkComponent {
  editDrink: OtherDrink = {} as OtherDrink;
  otherDrinkId!: number;
  drinkTypes!: DrinkType [];
  drinkItemPrices!: number;
  updatedDrinkItem: any = {};
  formData = new FormData ();
  editDrinkForm!: FormGroup;
  drinkItemPrice!: OtherDrinkPrice;



  constructor(    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private price: PriceService,
    private dialog: MatDialog) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.otherDrinkId= +id;
        this.loadDrinkItem();
      }
    });

    this.getAllDrinkTypes();
   

    this.editDrinkForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      drinkTypeName: [''],
    
      amount: [0] // Provide a default value (e.g., 0)
    });
  }

  cancel(){
    this.router.navigate(['/view-other-drink'])
  }


  loadDrinkItem() {
    this.dataService.GetDrinkItemById(this.otherDrinkId).subscribe(
      (response: any) => {
        this.editDrink = response;
        this.drinkItemPrices = response.amount;

        // Load the price from MenuItemPrice
        this.loadDrinkItemPrice();

        this.editDrinkForm.setValue({
          name: this.editDrink.name,
          description: this.editDrink.description,
          drinkTypeName: this.editDrink.drinkTypeName,
         
          
          amount: this.editDrink.amount,
        });
      },
      error => {
        console.error('Error loading menu item:', error);
      }
    );
  }

  getAllDrinkTypes() {
    this.dataService.GetAllDrinkTypes().subscribe(
      response => {
        this.drinkTypes = response;
      },
      error => {
        console.log(error);
      }
    );
  }


  editDrinkItem() {
    const updatedPrice = this.editDrinkForm.get('amount')!.value;

   

    // Continue with saving the menu item
    let drinkItem = new OtherDrink();
    drinkItem.name = this.editDrinkForm.value.name;
    drinkItem.description = this.editDrinkForm.value.description;
    drinkItem.drinkTypeName = this.editDrinkForm.value.drinkTypeName;
    
    drinkItem.amount = updatedPrice;
 

    this.dataService.editDrinkItem(this.otherDrinkId, drinkItem).subscribe(
      (response: any) => {
        if (response) {
          this.router.navigate(['/view-other-drink']);
         
          this.showSuccessMessage( drinkItem.name + 'Information updated successfully!');
        } else {
          this.showSuccessMessage( drinkItem.name + 'Information cannot be updated!');
        }
      },
      
      (error) => {
        this.showSuccessMessage( drinkItem.name +'s' +'' + 'Information cannot be updated!');
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

  updateDrinkItemPrice(price: number) {
    if (this.drinkItemPrice) {
      this.drinkItemPrice.amount = price;
  
      // Pass both MenuItem_PriceId and menuItemPriceViewModel
      this.price.editDrinkItemPrice(this.drinkItemPrice.otherDrinkPriceId, this.drinkItemPrice).subscribe(
        response => {
          console.log('Drink item price updated successfully:', response);
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




  loadDrinkItemPrice() {
    this.price.getADrinkItemPrice(this.otherDrinkId).subscribe(
      (response: any) => {
        this.drinkItemPrice = response;
        console.log('Response:', response); // Add this line to inspect the response
        if (this.drinkItemPrice) {
          this.editDrinkForm.get('amount')!.setValue(this.drinkItemPrice.amount);
        }
      },
      error => {
        console.error('Error loading menu item price:', error);
      }
    );
  

}

openHelpModal(field: string): void {
  const dialogRef = this.dialog.open(HelpEditdrinkComponent, {
    width: '500px',
    data: { field } // Pass the field name to the modal
  });

  dialogRef.afterClosed().subscribe(result => {
    // Handle modal close if needed
  });
}

}

  /*UpdateDrinkType()
  {
    let drink = new Drink();
    drink.name = this.updateDrinkForm.value.name;   

    this.dataService.EditDrink(this.editDrink.drinkId,drink).subscribe((response:any) => {

      if(response.statusCode == 200)
      {
        this.router.navigate(['/drink'])
        window.location.reload();
      }
      else
      {
        alert(response.message);
      }
    });
  }*/


