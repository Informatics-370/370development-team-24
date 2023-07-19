import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/service/supplier.service';
import { SupplierType } from 'src/app/shared/SupplierTypes';

@Component({
  selector: 'app-add-suppliertype',
  templateUrl: './add-suppliertype.component.html',
  styleUrls: ['./add-suppliertype.component.css']
})
export class AddSuppliertypeComponent {
  suppliertypes :SupplierType[] = []

  constructor(private supplierservice: SupplierService, private router: Router, 
    private activated: ActivatedRoute,
    private snackBar: MatSnackBar) {}

    supplierTypeForm: FormGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required])
     })

     ngOnInit(): void {
    }
  
    cancel(){
      this.router.navigate(['/view-suppliertypes'])
    }
  
    onSubmit(){

      let suppliertype = new SupplierType();
      suppliertype.name = this.supplierTypeForm.value.name;
      suppliertype.description = this.supplierTypeForm.value.description;
     
       this.supplierservice.AddSupplierType(suppliertype).subscribe(result => {
        this.router.navigate(['/view-suppliertypes'])
       });

       this.showSuccessMessage('Supplier Type Added successfully');

    }
    // Success notification
    showSuccessMessage(message:string) : void {
      const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  


    

}
