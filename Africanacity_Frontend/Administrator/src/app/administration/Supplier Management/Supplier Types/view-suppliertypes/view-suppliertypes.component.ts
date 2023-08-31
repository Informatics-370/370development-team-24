import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupplierService } from 'src/app/service/supplier.service';
import { Router } from '@angular/router';
import { SupplierType } from 'src/app/shared/SupplierTypes';
import { HelpViewsuppliertypesComponent } from './help-viewsuppliertypes/help-viewsuppliertypes.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-suppliertypes',
  templateUrl: './view-suppliertypes.component.html',
  styleUrls: ['./view-suppliertypes.component.css'],
  template: '<button (click)="deleteItem()">Delete</button>'
})
export class ViewSuppliertypesComponent implements OnInit {

  suppliertypes: SupplierType[] = []
  filteredSupplierTypes: SupplierType[] = [];
  
  constructor(private supplierservice: SupplierService, private snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router, private dialog: MatDialog){}

  deleteItem(): void {
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this supplier Type?', 'Delete, Cancel',{
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
  this.DeleteSupplierType;
}

  ngOnInit(): void {
    this.GetAllSuppliers()
    console.log(this.suppliertypes)

    this.filteredSupplierTypes = this.suppliertypes
    console.log(this.filteredSupplierTypes)

  }

  GetAllSuppliers()
  {
    this.supplierservice.GetAllSupplierTypes().subscribe(result => {
      let supplierTypeList:any[] = result
      supplierTypeList.forEach((element) => {
        this.suppliertypes.push(element)
        
      });
    })
  }

  DeleteSupplierType(supplier_TypeId: Number){
    this.supplierservice.DeleteSupplierType(supplier_TypeId).subscribe(result => {
      this.deleteItem();
      });
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredSupplierTypes = this.suppliertypes.filter(suppliertype => {
      const column2Value = suppliertype.name.toLowerCase() || suppliertype.name.toUpperCase();
      const column3Value = suppliertype.description.toLowerCase();
  
      return column2Value.includes(filterValue) || column3Value.includes(filterValue);
    });
  }
  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpViewsuppliertypesComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }

}

