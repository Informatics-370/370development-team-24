import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SupplierService } from 'src/app/service/supplier.service';
import { Supplier } from 'src/app/shared/supplier';
import { SupplierType } from 'src/app/shared/SupplierTypes';



@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent {
  supplierTypesData:SupplierType[]=[]
  
  constructor(
    private supplierservice:SupplierService, 
    private router : Router , 
    private activated:ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

    editSupplier: Supplier = new Supplier();

    updateSupplierForm: FormGroup = new FormGroup({
      supplierName: new FormControl('',[Validators.required]),
      supplierTypeName: new FormControl('',[Validators.required]),
      supplierEmail: new FormControl('',[Validators.required]),
      supplierNumber: new FormControl('',[Validators.required]),
      supplierAddress: new FormControl('',[Validators.required])
    })

    ngOnInit(): void {

      this.activated.params.subscribe(params => { 
        this.supplierservice.GetSupplier(params['id']).subscribe(res => { 
        this.editSupplier = res as Supplier;
  
        this.updateSupplierForm.controls['supplierName'].setValue(this.editSupplier.supplierName);
        this.updateSupplierForm.controls['supplierTypeName'].setValue(this.editSupplier.supplierTypeName);
        this.updateSupplierForm.controls['supplierEmail'].setValue(this.editSupplier.supplierEmail);
        this.updateSupplierForm.controls['supplierNumber'].setValue(this.editSupplier.supplierNumber);
        this.updateSupplierForm.controls['supplierAddress'].setValue(this.editSupplier.supplierAddress);
        })
   
       })
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
  
    updateSupplier()
    {
      let supplier = new Supplier();
      supplier.supplierName = this.updateSupplierForm.value.supplierName;
      supplier.supplierTypeName = this.updateSupplierForm.value.supplierTypeName;
      supplier.supplierEmail = this.updateSupplierForm.value.supplierEmail;
      supplier.supplierNumber = this.updateSupplierForm.value.supplierNumber;
      supplier.supplierAddress = this.updateSupplierForm.value.supplierAddress;
  
  
     this.supplierservice.EditSupplier(this.editSupplier.supplierId,supplier).subscribe((response:any) => {
  
      if(response.statusCode == 200)
      {
        this.router.navigate(['/view-suppliers'])
        window.location.reload();
      }
      else
      {
  
      }
     });
  
     this.showSuccessMessage('Supplier Informartion updated successfully!');
  
    }
    showSuccessMessage(message: string): void {
      const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }

}
