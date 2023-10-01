
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { DrinkType } from 'src/app/shared/drink-type';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { HelpViewDrinktypeComponent } from './help-view-drinktype/help-view-drinktype.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-drink-type',
  templateUrl: './view-drink-type.component.html',
  styleUrls: ['./view-drink-type.component.css']
})

export class DrinkTypeComponent implements OnInit {
  drinkType: DrinkType[] = [];
  filteredDrinkTypes: DrinkType[] = [];
  deletionSuccess = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private httpClient: HttpClient,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllDrinkTypes();
    console.log(this.drinkType)

    this.filteredDrinkTypes = this.drinkType
    console.log(this.filteredDrinkTypes)
  }

  GetAllDrinkTypes()
  {
    this.dataService.GetAllDrinkTypes().subscribe(result => {
      let drinkTypesList: any[] = result
      drinkTypesList.forEach((element) => {
        this.drinkType.push(element)
      });
    })
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredDrinkTypes = this.drinkType.filter((drinkType) => {
      const column2Value = drinkType.name.toLowerCase();

      return column2Value.includes(filterValue);
    });
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpViewDrinktypeComponent, {
      width: '500px',
      data: { field }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle modal close if needed
    });
  }

  deleteItem(drinkTypeId: number): void {
    const confirmationSnackBar = this.snackbar.open(
      'Are you sure you want to delete the Drink type?',
      'Cancel Delete',
      { duration: 5000 }
    );

    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer(drinkTypeId); // Proceed with deletion if "Cancel Delete" is not clicked
    });
  }

  deleteItemFromServer(drinkTypeId: number): void {
    // Display another confirmation before the actual deletion
    const confirmDeletionSnackBar = this.snackbar.open(
      'Confirm deletion?',
      'Delete',
      { duration: 5000 }
    );

    confirmDeletionSnackBar.onAction().subscribe(() => {
      // User confirmed deletion, proceed with the actual deletion
      this.DeleteDrinkType(drinkTypeId);
    });
  }

  DeleteDrinkType(drinkTypeId: number) {
    this.dataService.DeleteDrinkType(drinkTypeId).subscribe(
      () => {
        // Deletion was successful
        this.deletionSuccess = true;
        this.snackbar.open('Drink type deleted successfully.', '', {
          duration: 5000,
        });
        window.location.reload();
      },
      (error) => {
        // Deletion failed
        this.deletionSuccess = false;
        this.snackbar.open(
          'Cannot delete drink type because it is linked to drinks.',
          '',
          { duration: 5000 }
        );
      }
    );
  }
}
