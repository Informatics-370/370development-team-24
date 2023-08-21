import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { DrinkType } from 'src/app/shared/Drink_Type';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

@Component({
  selector: 'app-view-drink-type',
  templateUrl: './view-drink-type.component.html',
  styleUrls: ['./view-drink-type.component.css']
})

export class DrinkTypeComponent {
  drinkType: DrinkType[] = []
  filteredDrinkTypes: DrinkType[] = [];

  constructor(private dataService: DataService, 
    private router: Router, 
    private httpClient: HttpClient, 
    private snackbar: MatSnackBar) {}

  deleteItem(): void {
    const confirmationSnackBar = this.snackbar.open('Are you sure you want to delete this item?', 'Cancel Delete', {duration: 5000,})
    
    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer();
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.GetAllDrinkTypes();
    this.filteredDrinkTypes = this.drinkType
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

}

