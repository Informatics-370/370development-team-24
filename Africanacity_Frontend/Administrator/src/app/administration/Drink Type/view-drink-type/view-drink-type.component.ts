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

export class DrinkTypeComponent implements OnInit{
  drinkType: DrinkType[] = []
  filteredDrinkTypes: DrinkType[] = [];

  constructor(private dataService: DataService, 
    private router: Router, 
    private httpClient: HttpClient, 
    private snackbar: MatSnackBar,
    private dialog: MatDialog) {}

  deleteItem(): void {
    const confirmationSnackBar = this.snackbar.open('Are you sure you want to delete this item?', 'Cancel Delete', {duration: 5000,})
    
    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer();
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.GetAllDrinkTypes();
    console.log(this.drinkType)

    this.filteredDrinkTypes = this.drinkType
    console.log(this.filteredDrinkTypes)
  }

  deleteItemFromServer(): void {
    this.DeleteDrinkType;
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

  DeleteDrinkType(drinkTypeId: number)
  {
    this.dataService.DeleteDrinkType(drinkTypeId).subscribe(result => {
        this.deleteItem();
      });
  }

  // search function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredDrinkTypes = this.drinkType.filter(drinkType => {
      const column2Value = drinkType.name.toLowerCase() || drinkType.name.toUpperCase();

      return column2Value.includes(filterValue);
    });
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpViewDrinktypeComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }

}

