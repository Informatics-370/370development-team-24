import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/service/supplier.service';
import { SupplierType } from 'src/app/shared/SupplierTypes';

@Component({
  selector: 'app-edit-suppliertype',
  templateUrl: './edit-suppliertype.component.html',
  styleUrls: ['./edit-suppliertype.component.css']
})
export class EditSuppliertypeComponent implements OnInit {

  constructor(private supplierservice: SupplierService, 
    private router: Router, 
    private activated:ActivatedRoute) { }
  
    editSupplierType: SupplierType = new SupplierType();
  
    editSupplierTypeForm: FormGroup = new FormGroup({
       name: new FormControl('',[Validators.required]),
       description: new FormControl('',[Validators.required])
    })
  
    ngOnInit(): void {
      this.activated.params.subscribe(params =>{
      this.supplierservice.GetSupplierType(params['id']).subscribe(result =>{
        this.editSupplierType = result as SupplierType;
        this.editSupplierTypeForm.controls['name'].setValue(this.editSupplierType.name);
        this.editSupplierTypeForm.controls['description'].setValue(this.editSupplierType.description);
      })
      })
  
    }
  
    cancel(){
      this.router.navigate(['/view-suppliertypes'])
    }
  
    onSubmit(){
      let suppliertype = new SupplierType();
      suppliertype.name = this.editSupplierTypeForm.value.name;
      suppliertype.description = this.editSupplierTypeForm.value.description;
  
      this.supplierservice.EditSupplierType(this.editSupplierType.supplier_TypeId, suppliertype).subscribe((result:any) => {
  
      this.router.navigate(['view-suppliertypes'])
      });
    }

}
