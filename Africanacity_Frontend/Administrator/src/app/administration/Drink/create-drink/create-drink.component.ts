import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { Drink } from 'src/app/shared/Drink';
import { ActivatedRoute} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/administration/menu-types/add-menu-type/confirmation-dialog/confirmation-dialog.component'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'
import { DrinkType } from 'src/app/shared/Drink_Type';

@Component({
  selector: 'app-create-drink',
  templateUrl: './create-drink.component.html',
  styleUrls: ['./create-drink.component.css']
})
export class CreateDrinkComponent implements OnInit {
  @ViewChild('toastContainer', { read: ViewContainerRef })
  toastContainer!: ViewContainerRef;
  DrinkId: number = 0;
  //AddDrinkForm!: FormGroup;
  formData = new FormData();
  drinkTypesData : DrinkType[]=[]
  
  //drinks :Drink[]=[];

  // CREATING A FORM
  AddDrinkForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    drinkType: ['', Validators.required],
    amount: [null, Validators.required]
    
  })

  constructor(private dataService: DataService, 
    private route: ActivatedRoute, 
    private router: Router,
    private dialog: MatDialog, 
    private snackBar: MatSnackBar, 
    private fb: FormBuilder) 
  {

  }
    //confirmation dialog method
    openDialog():void{
      const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
        width: '250px',
        data: 'Add New Drink?'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result == 'Yes'){
          this.AddDrink();
        
        }
      })
    }

  ngOnInit(): void 
  {
    
    this.GetAllDrinkTypes();
    
    
  }

  cancel()
  {
    this.router.navigate(['/drink'])
  }

  GetAllDrinkTypes() {
    this.dataService.GetAllDrinkTypes().subscribe(
      (result: DrinkType[]) => {
        this.drinkTypesData = result;
        console.log(this.drinkTypesData); // Moved inside the subscribe block
      },
      (error: any) => {
        console.error('Error fetching drink types:', error);
      }
    );
  }

  /*AddDrink()
  {
    if (this.AddDrinkForm.invalid) {
      return;
    }
    let drink = new Drink();
    drink.name = this.AddDrinkForm.value.name;
    drink.drinkTypeId = this.AddDrinkForm.value.drinkType;

    this.dataService.AddDrink(drink).subscribe(result => {
      this.router.navigate(['/view-drink'])
      console.log("drink", drink)
    });
    this.showSuccessMessage('Drink added successfully!');
  }*/

  AddDrink() {
    if(this.AddDrinkForm.valid)
    {
       // Log the drinkType value before sending the request
       console.log("drinkType value:", this.AddDrinkForm.get('drinkType')!.value);
      this.formData.append('name', this.AddDrinkForm.get('name')!.value);
      this.formData.append('drinkType', this.AddDrinkForm.get('drinkType')!.value);
      
      
          // Add the price as well
          const amount = this.AddDrinkForm.get('amount')!.value;
          this.formData.append('amount', amount.toString());
  
      this.dataService.AddDrink(this.formData, amount).subscribe(() => {
        this.clearData()
        this.router.navigateByUrl('./view-drink').then((navigated: boolean) => {
          if(navigated) {
            this.snackBar.open(this.AddDrinkForm.get('name')!.value + ` created successfully`, 'X', {duration: 5000});
          }
       });
      });
    }
  }

  /*onSubmit() {
    if(this.drinkForm.valid)
    {
      this.formData.append('name', this.drinkForm.get('name')!.value);
      this.formData.append('drinkType', this.drinkForm.get('drinkType')!.value);
    
      this.dataService.AddDrink(this.formData).subscribe(() =>  {
        this.clearData()
        this.router.navigateByUrl('drinks').then((navigated: boolean) => {
          if(navigated) {
            this.snackBar.open(this.drinkForm.get('name')!.value + `created successfully`, 'X', {duration: 5000})
          }
        })
      })
    }
  }*/

  clearData()
  {
    this.formData.delete("name");
    this.formData.delete("drinkType");
  }

  // success message
  showSuccessMessage(message: string): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  
  
    snackBarRef.afterDismissed().subscribe(() => {
      this.toastContainer.clear();
    });
  }
}
