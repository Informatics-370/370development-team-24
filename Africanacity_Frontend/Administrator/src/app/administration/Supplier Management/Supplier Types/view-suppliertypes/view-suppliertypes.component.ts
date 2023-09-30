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
})
export class ViewSuppliertypesComponent implements OnInit {
  suppliertypes: SupplierType[] = [];
  filteredSupplierTypes: SupplierType[] = [];
  deletionSuccess = false;

  constructor(
    private supplierservice: SupplierService,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllSuppliers();
  }

  GetAllSuppliers() {
    this.supplierservice.GetAllSupplierTypes().subscribe((result) => {
      this.suppliertypes = result as SupplierType[];
      this.filteredSupplierTypes = this.suppliertypes; // Initialize the filtered list
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredSupplierTypes = this.suppliertypes.filter((suppliertype) => {
      const column2Value = suppliertype.name.toLowerCase();
      const column3Value = suppliertype.description.toLowerCase();

      return column2Value.includes(filterValue) || column3Value.includes(filterValue);
    });
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpViewsuppliertypesComponent, {
      width: '500px',
      data: { field },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle modal close if needed
    });
  }

  deleteItem(supplier_TypeId: number): void {
    const confirmationSnackBar = this.snackBar.open(
      'Are you sure you want to delete the Supplier type?',
      'Delete',
      { duration: 5000 }
    );

    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer(supplier_TypeId);
    });
  }

  deleteItemFromServer(supplier_TypeId: number): void {
    // Display another confirmation before the actual deletion
    const confirmDeletionSnackBar = this.snackBar.open(
      'Confirm deletion?',
      'Delete',
      { duration: 5000 }
    );

    confirmDeletionSnackBar.onAction().subscribe(() => {
      this.DeleteSupplierType(supplier_TypeId);
    });
  }

  DeleteSupplierType(supplier_TypeId: number) {
    this.supplierservice.DeleteSupplierType(supplier_TypeId).subscribe(
      () => {
        // Deletion was successful
        this.deletionSuccess = true;
        this.snackBar.open('Supplier type deleted successfully.', '', {
          duration: 5000,
        });
        window.location.reload();
      },
      (error) => {
        // Deletion failed
        this.deletionSuccess = false;
        this.snackBar.open(
          'Cannot delete supplier type because it is linked to a supplier.',
          '',
          { duration: 5000 }
        );
      }
    );
  }
}
