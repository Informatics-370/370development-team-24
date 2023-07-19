import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SupplierService } from 'src/app/service/supplier.service';
import { SupplierType } from 'src/app/shared/SupplierTypes';
import { Supplier } from 'src/app/shared/supplier';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {

  selectedSupplierType: SupplierType | null = null;
  supplierTypesData: SupplierType[] = [];
  editSupplier: Supplier = new Supplier();

  updateSupplierForm: FormGroup = new FormGroup({
    supplierName: new FormControl('', [Validators.required]),
    supplierType: new FormControl('', [Validators.required]),
    email_Address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    physical_Address: new FormControl('', [Validators.required])
  });

  constructor(
    private supplierservice: SupplierService,
    private router: Router,
    private activated: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activated.params.subscribe(params => {
      this.supplierservice.GetSupplier(params['id']).subscribe(res => {
        this.editSupplier = res as Supplier;

        this.updateSupplierForm.controls['supplierName'].setValue(this.editSupplier.supplierName);
        this.updateSupplierForm.controls['email_Address'].setValue(this.editSupplier.email_Address);
        this.updateSupplierForm.controls['phoneNumber'].setValue(this.editSupplier.phoneNumber);
        this.updateSupplierForm.controls['physical_Address'].setValue(this.editSupplier.physical_Address);

        // Find the selected Supplier Type in the supplierTypesData array
        const selectedType = this.supplierTypesData.find(type => type.name === this.editSupplier.supplierTypeName);
        if (selectedType) {
          this.updateSupplierForm.controls['supplierType'].patchValue(selectedType.supplier_TypeId);
        }
      });
    });

    this.GetAllSupplierTypes(); // Call this method to populate the supplierTypesData array
  }

  cancel() {
    this.router.navigate(['/view-suppliers']);
  }

  GetAllSupplierTypes() {
    this.supplierservice.GetAllSupplierTypes().subscribe(result => {
      let supplierTypeList: any[] = result;
      supplierTypeList.forEach((element) => {
        this.supplierTypesData.push(element);
      });
    });
  }

  updateSupplier() {
    let supplier = new Supplier();
    supplier.supplierName = this.updateSupplierForm.value.supplierName;
    supplier.supplierType = this.updateSupplierForm.value.supplierType; // Assign the selected supplier type ID
    supplier.email_Address = this.updateSupplierForm.value.email_Address;
    supplier.phoneNumber = this.updateSupplierForm.value.phoneNumber;
    supplier.physical_Address = this.updateSupplierForm.value.physical_Address;

    this.supplierservice.EditSupplier(this.editSupplier.supplierId, supplier).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.router.navigate(['./view-suppliers']);
          window.location.reload();
          this.showSuccessMessage('Supplier Information updated successfully!');
        } else {
          // Handle error if needed
        }
      },
      (error) => {
        // Handle error if needed
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
}


