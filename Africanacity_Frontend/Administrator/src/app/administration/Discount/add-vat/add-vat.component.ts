import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { VAT } from 'src/app/shared/Vat';

@Component({
  selector: 'app-add-vat',
  templateUrl: './add-vat.component.html',
  styleUrls: ['./add-vat.component.css']
})
export class AddVatComponent implements OnInit{

  constructor(private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar, private dataService: DataService){}

  ngOnInit(): void {
    
  }

  vatform : FormGroup = new FormGroup({
    description: new FormControl('',[Validators.required]),
    amount: new FormControl('',[Validators.required]),
    
  });

  cancel(){
    this.router.navigate(['/vat'])
  }

  onSubmit() {
    if (this.vatform.invalid) {
      return;
    }
  
    let vatAmounts = new VAT();
    vatAmounts.description = this.vatform.value.description;
    vatAmounts.amount = this.vatform.value.amount;

  
  
    this.dataService.AddAVatPercentage(vatAmounts).subscribe(result => {
      this.router.navigate(['/vat'])
    });

    this.snackBar.open(
      this.vatform.get('name')!.value + ` created successfully`,
      'X',
      { duration: 5000 }
    );
  }

       // Custom validator to check for spaces
       noSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value && control.value.trim().length === 0) {
          return { 'noSpaces': true };
        }
        return null;
      }

    //  openHelpModal(field: string): void {
    //      const dialogRef = this.dialog.open(HelpAddDiscountComponent, {
    //        width: '500px',
    //        data: { field } // Pass the field name to the modal
    //      });
      
    //      dialogRef.afterClosed().subscribe(result => {
    //       // Handle modal close if needed
    //     });
    //  }
}
