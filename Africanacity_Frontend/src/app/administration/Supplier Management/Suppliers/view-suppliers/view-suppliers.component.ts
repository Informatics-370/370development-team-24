import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierService } from 'src/app/service/supplier.service';
import { Supplier } from 'src/app/shared/supplier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-suppliers',
  templateUrl: './view-suppliers.component.html',
  template: `
  <button (click)="deleteItem()">Delete</button>
  <button (click)="cancel()">Cancel</button>
`,
  styleUrls: ['./view-suppliers.component.css']
})
export class ViewSuppliersComponent {
  
  suppliers: Supplier[] = []
  filteredsuppliers: Supplier[] = [];
  
  constructor(private supplierservice: SupplierService, private snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router){}

  deleteItem(): void {
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this supplier?', 'Delete, Cancel',{
      duration: 5000, // Display duration in milliseconds

    });

    
    //  cancel(){
    //    this.router.navigate(['/home'])
    //  }
  

    confirmationSnackBar.onAction().subscribe(() => {
      // Perform the deletion action here
      this.deleteItemFromServer();
      window.location.reload();
    });
  }

deleteItemFromServer(): void {
  this.DeleteSupplier;
}

  ngOnInit(): void {
    this.GetAllSuppliers()
    console.log(this.suppliers)

    this.filteredsuppliers = this.suppliers
    console.log(this.filteredsuppliers)

  }

  GetAllSuppliers()
  {
    this.supplierservice.GetAllSuppliers().subscribe(result => {
      let supplierList:any[] = result
      supplierList.forEach((element) => {
        this.suppliers.push(element)
        
      });
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredsuppliers = this.suppliers.filter(supplier => {
      const column2Value = supplier.supplierName.toLowerCase();
      const column3Value = supplier.supplierTypeName.toLowerCase();
  
      return column2Value.includes(filterValue) || column3Value.includes(filterValue);
    });
  }


  DeleteSupplier(supplierId: Number){
    this.supplierservice.DeleteSupplier(supplierId).subscribe(result => {
      this.deleteItem();
      });
    }

}
