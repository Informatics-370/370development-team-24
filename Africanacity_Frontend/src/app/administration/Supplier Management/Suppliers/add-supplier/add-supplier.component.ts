import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/service/supplier.service';
import { SupplierType } from 'src/app/shared/SupplierTypes';
import { Supplier } from 'src/app/shared/supplier';

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
     email_Address: new FormControl('',[Validators.required]),
     physical_Address: new FormControl('',[Validators.required]),
     phoneNumber: new FormControl('',[Validators.required])

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
  



}
