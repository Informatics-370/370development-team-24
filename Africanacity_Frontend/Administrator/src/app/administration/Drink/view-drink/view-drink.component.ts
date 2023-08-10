import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { Drink } from 'src/app/shared/Drink';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-drink',
  templateUrl: './view-drink.component.html',
  styleUrls: ['./view-drink.component.css']
})
export class ViewDrinkComponent implements OnInit{
  displayedColumns: string[] = ['id','name', 'drinkTypeName', 'delete', 'edit' ];
  drink: Drink[] = [];
  filteredDrinks: Drink[] = [];

  dataSource = new MatTableDataSource <Drink>();
  snackbar: any;
  httpClient: any;

  constructor(private dataService: DataService, 
    private router: Router, 
    //private httpClient: HttpClient, 
    //private snackbar: MatSnackBar,
    ) {}

  deleteItem(): void {
    const confirmationSnackBar = this.snackbar.open('Are you sure you want to delete this item?', 'Cancel Delete', {duration: 5000,})
    
    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer();
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.GetAllDrinks();
    this.filteredDrinks = this.drink
  }

  deleteItemFromServer(): void {
    this.DeleteDrink;
  }

  GetAllDrinks()
  {
    this.dataService.GetAllDrinks().subscribe(result => {
      let drinksList: any[] = result
      drinksList.forEach((element) => {
        this.drink.push(element)
      });
    })
  }

  DeleteDrink(drinkId: number)
  {
    this.dataService.DeleteDrink(drinkId).subscribe(result => {
        this.deleteItem();
      });
  }

  // search function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredDrinks = this.drink.filter(drink => {
      const column2Value = drink.name.toLowerCase() || drink.name.toUpperCase();

      return column2Value.includes(filterValue);
    });
  }
}
