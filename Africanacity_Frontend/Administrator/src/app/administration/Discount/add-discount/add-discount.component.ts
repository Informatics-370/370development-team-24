import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { Discount } from 'src/app/shared/Discount';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelpAddDiscountComponent } from './help-add-discount/help-add-discount.component';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit{

  constructor(private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar, private dataService: DataService){}

  ngOnInit(): void {
    
  }

  discountform : FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    amount: new FormControl('',[Validators.required]),
    start_date: new FormControl([new Date().toISOString().slice(0, 10)]),
    end_date: new FormControl('',[Validators.required])
    
  });

  cancel(){
    this.router.navigate(['/view-discounts'])
  }

  // isControlInvalid(controlName: string): boolean {
  //   const control = this.discountform.get(controlName);

  //   if (!control) {
  //     return false;
  //   }
  // }

  onSubmit() {
    if (this.discountform.invalid) {
      this.showErrorMessage('Please fill in all required fields.');
      // Highlight invalid controls
      Object.keys(this.discountform.controls).forEach(controlName => {
        if (this.discountform.controls[controlName].invalid) {
          this.discountform.controls[controlName].markAsTouched();
        }
      });
      return;
    }
    const currentDate = new Date();

  
    let discounts = new Discount();
    discounts.name= this.discountform.value.name;
    discounts.description = this.discountform.value.description;
    discounts.amount = this.discountform.value.amount;
    discounts.start_Date = currentDate as Date; 
    discounts.end_Date = this.discountform.value.end_date;

  
  
    this.dataService.AddADiscountPercentage(discounts).subscribe(result => {
      this.router.navigate(['/view-discounts'])
    });

    this.snackBar.open(
      this.discountform.get('name')!.value + ` created successfully`,
      'X',
      { duration: 5000 }
    );
  }

  showErrorMessage(message: string): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

       // Custom validator to check for spaces
       noSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value && control.value.trim().length === 0) {
          return { 'noSpaces': true };
        }
        return null;
      }

     openHelpModal(field: string): void {
         const dialogRef = this.dialog.open(HelpAddDiscountComponent, {
           width: '500px',
           data: { field } // Pass the field name to the modal
         });
      
         dialogRef.afterClosed().subscribe(result => {
          // Handle modal close if needed
          });
       }
}
