import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/service/supplier.service';
import { SupplierType } from 'src/app/shared/SupplierTypes';
import { Supplier } from 'src/app/shared/supplier';
import { AbstractControl } from '@angular/forms';
import { HelpAddsupplierComponent } from './help-addsupplier/help-addsupplier.component';

function phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
  const phoneNumber = control.value;
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  if (digitsOnly.length !== 10 || !phoneNumber.startsWith('0')) {
    return { 'invalidPhoneNumber': true };
  }

  return null;
}

function emailFormatValidator(control: AbstractControl): { [key: string]: any } | null {
  const email = control.value;
  const emailPattern = /^[a-zA-Z0-9]+@gmail\.com$/;

  if (!emailPattern.test(email)) {
    return { 'invalidEmailFormat': true };
  }

  return null;
}

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit{

   supplierTypesData:SupplierType[]=[]
   toastContainer: any;

   constructor(private  supplierservice: SupplierService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

   supplierForm: FormGroup = new FormGroup({
     supplierName: new FormControl('',[Validators.required]),
     supplierType: new FormControl([Validators.required]),
     email_Address: new FormControl('', [Validators.required, emailFormatValidator]),
     physical_Address: new FormControl('',[Validators.required]),
     phoneNumber: new FormControl('', [Validators.required, phoneNumberValidator]),

   })

   ngOnInit(): void {
     this.GetAllSupplierTypes()
   }

   cancel(){
     this.router.navigate(['/view-suppliers'])
   }

   GetAllSupplierTypes(){
     this.supplierservice.GetAllSupplierTypes().subscribe(result => {
       let supplierTypeList:any[] = result
       supplierTypeList.forEach((element) => {
         this.supplierTypesData.push(element)
      });
     });
   }

   onSubmit() {
    if (this.supplierForm.invalid) {
      this.showErrorMessage('Please fill in all required fields.');
      // Highlight invalid controls
      Object.keys(this.supplierForm.controls).forEach(controlName => {
        if (this.supplierForm.controls[controlName].invalid) {
          this.supplierForm.controls[controlName].markAsTouched();
        }
      });
      return;
    }
    let supplier = new Supplier();
    supplier.supplierName = this.supplierForm.value.supplierName;
    supplier.supplierType = this.supplierForm.value.supplierType;
    supplier.email_Address = this.supplierForm.value.email_Address;
    supplier.physical_Address = this.supplierForm.value.physical_Address;
    supplier.phoneNumber = this.supplierForm.value.phoneNumber;
  
    this.supplierservice.AddSupplier(supplier).subscribe(result => {
      this.router.navigate(['/view-suppliers'])
});
  
    this.snackBar.open(
      this.supplierForm.get('name')!.value + ` created successfully`,
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
openHelpModal(field: string): void {
  const dialogRef = this.dialog.open(HelpAddsupplierComponent, {
    width: '500px',
    data: { field } // Pass the field name to the modal
  });

  dialogRef.afterClosed().subscribe(result => {
    // Handle modal close if needed
  });
}



}
