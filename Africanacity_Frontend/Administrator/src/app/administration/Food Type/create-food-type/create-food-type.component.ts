import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { FoodType } from 'src/app/shared/food-type';
import { ActivatedRoute} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/administration/menu-types/add-menu-type/confirmation-dialog/confirmation-dialog.component'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'

@Component({
  selector: 'app-create-food-type',
  templateUrl: './create-food-type.component.html',
  styleUrls: ['./create-food-type.component.css']
})
export class CreateFoodTypeComponent {
  @ViewChild('toastContainer', { read: ViewContainerRef })
  toastContainer!: ViewContainerRef;
  FoodTypeId!: number;
  AddFoodTypeForm!: FormGroup;

  constructor(private dataService: DataService, 
    private route: ActivatedRoute, 
    private router: Router,
    private dialog: MatDialog, 
    private snackBar: MatSnackBar, 
    private fb: FormBuilder) 
  {

    //creating a form
    {
        this.AddFoodTypeForm = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]] 
      })
    }
  }
    //confirmation dialog method
    openDialog():void{
      const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
        width: '250px',
        data: 'Add New Food Type?'
      });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Yes'){
        this.AddFoodType();
        
      }
    })
  }

  ngOnInit(): void {}

  cancel()
  {
    this.router.navigate(['/food-type'])
  }

  AddFoodType()
  {
    let foodType = new FoodType();
    foodType.name = this.AddFoodTypeForm.value.name;
    foodType.description = this.AddFoodTypeForm.value.description;

    this.dataService.AddFoodType(foodType).subscribe((add:any) => {
      this.router.navigate(['/food-type'])
    });
    this.showSuccessMessage('Food Type added successfully!');
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