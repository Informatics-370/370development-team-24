import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { ActivatedRoute} from '@angular/router';
import { DrinkType } from 'src/app/shared/Drink_Type';
import { HelpAdddrinktypeComponent } from './help-adddrinktype/help-adddrinktype.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-drink-type',
  templateUrl: './edit-drink-type.component.html',
  styleUrls: ['./edit-drink-type.component.css']
})
export class EditDrinkTypeComponent {
  editDrinkType: DrinkType = new DrinkType();
  

  updateDrinkTypeForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
  })

  constructor(
    private dataService: DataService, 
    private router: Router, 
    private http: HttpClient, 
    private activated:ActivatedRoute, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {}

  ngOnInit(): void {

    this.activated.params.subscribe(params => { 
      this.dataService.GetDrinkType(params['id']).subscribe(res => { 
        this.editDrinkType = res as DrinkType;

        this.updateDrinkTypeForm.controls['name'].setValue(this.editDrinkType.name);
      })
 
    })
  }

  cancel(){
    this.router.navigate(['/view-drink-type'])
  }

  UpdateDrinkType() {
    if (this.editDrinkType?.drink_TypeId !== undefined) { // Check if menu_TypeId is defined
      const drinkType = new DrinkType();
      drinkType.name = this.updateDrinkTypeForm.value.name;
  
      this.dataService.EditDrinkType(this.editDrinkType.drink_TypeId, drinkType).subscribe(
        (edit: any) => {
          this.router.navigate(['/view-drink-type']);
        },
        (error) => {
          // Handle error
        }
      )
      
  
      this.showSuccessMessage('Drink Type edited successfully!');
    } else {
      // Handle the case where menu_TypeId is undefined
      // You may want to display an error message or take appropriate action
    }
  }

  showSuccessMessage(message: string): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
  
  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpAdddrinktypeComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
}
