import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { ActivatedRoute} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/administration/menu-types/add-menu-type/confirmation-dialog/confirmation-dialog.component'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'
import { DrinkType } from 'src/app/shared/Drink_Type';

@Component({
  selector: 'app-create-drink-type',
  templateUrl: './create-drink-type.component.html',
  styleUrls: ['./create-drink-type.component.css']
})
export class CreateDrinkTypeComponent {
  @ViewChild('toastContainer', { read: ViewContainerRef })
  toastContainer!: ViewContainerRef;
  DrinkTypeId: number = 0;
  AddDrinkTypeForm!: FormGroup;

  constructor(private dataService: DataService, 
    private route: ActivatedRoute, 
    private router: Router,
    private dialog: MatDialog, 
    private snackBar: MatSnackBar, 
    private fb: FormBuilder) 
  {

    //creating a form
    {
        this.AddDrinkTypeForm = this.fb.group({
        DrinkTypeId: [0, [Validators.required]],
        name: ['', [Validators.required]],
      })
    }
  }
    //confirmation dialog method
    openDialog():void{
      const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
        width: '250px',
        data: 'Add New Drink Type?'
      });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Yes'){
        this.AddDrinkType();
        
      }
    })
  }

  ngOnInit(): void {}

  cancel()
  {
    this.router.navigate(['/drink-type'])
  }

  AddDrinkType()
  {
    let drinkType = new DrinkType();
    drinkType.name = this.AddDrinkTypeForm.value.name;

    this.dataService.AddDrinkType(drinkType).subscribe((add:any) => {
      this.router.navigate(['/drink-type'])
    });
    this.showSuccessMessage('Drink Type added successfully!');
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
