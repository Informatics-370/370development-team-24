import { Component, OnInit } from '@angular/core';
import { Discount } from 'src/app/shared/Discount';
import { DataService } from 'src/app/service/data.Service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HelpEditdiscountComponent } from './help-editdiscount/help-editdiscount.component';


@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})

export class EditDiscountComponent implements OnInit{
  ngOnInit(): void {
    this.activated.params.subscribe(params =>{
      this.dataService.GetADiscountPercentage(params['id']).subscribe(result =>{
        this.editDiscount = result as Discount;
        this.updateDiscountForm.controls['name'].setValue(this.editDiscount.name);
        this.updateDiscountForm.controls['description'].setValue(this.editDiscount.description);
        this.updateDiscountForm.controls['amount'].setValue(this.editDiscount.amount);
        //this.updateDiscountForm.controls['start_date'].setValue(this.editDiscount.start_date);
        //this.updateDiscountForm.controls['end_date'].setValue(this.editDiscount.end_date);

      })
    })
  }

  constructor( private dataService: DataService, 
    private router: Router, 
    private activated:ActivatedRoute,
    private snackBar: MatSnackBar,  private dialog: MatDialog,){}


    editDiscount: Discount = new Discount();

   updateDiscountForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,this.noSpacesValidator]),
    description: new FormControl('',[Validators.required,this.noSpacesValidator]),
    amount: new FormControl('',[Validators.required]),
    //start_date: new FormControl('',[Validators.required]),
    //end_date: new FormControl('',[Validators.required])

   })

   cancel(){
    this.router.navigate(['/view-discounts'])
  }
   
  updateDiscount(){
    let discountType = new Discount();
      discountType.name = this.updateDiscountForm.value.name;
      discountType.description= this.updateDiscountForm.value.description;
      discountType.amount = this.updateDiscountForm.value.amount;

      this.dataService.EditADiscountPercentage(this.editDiscount.discountId,discountType).subscribe((response:any)=>{
        if (response) {
          this.router.navigate(['/view-discounts']);
          this.showSuccessMessage('Discount percentage updated successfully!');
        } else {
          // Handle error if needed
          this.showSuccessMessage( discountType.name + 'Information cannot be updated!');
        }
      },
      (error) => {
        // Handle error if needed
        this.showSuccessMessage( discountType.name +'s' +'' + 'Information cannot be updated!');
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

   openHelpModal(field: string): void {
     const dialogRef = this.dialog.open(HelpEditdiscountComponent, {
       width: '500px',
       data: { field } // Pass the field name to the modal
     });
  
     dialogRef.afterClosed().subscribe(result => {
       // Handle modal close if needed
     });
   }

  
     // Custom validator to check for spaces
     noSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null {
      if (control.value && control.value.trim().length === 0) {
        return { 'noSpaces': true };
      }
      return null;
     }

}
