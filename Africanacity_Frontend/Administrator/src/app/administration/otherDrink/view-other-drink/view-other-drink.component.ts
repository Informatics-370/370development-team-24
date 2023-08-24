import { AfterViewInit, Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { DrinkType } from 'src/app/shared/Drink_Type';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OtherDrink } from 'src/app/shared/other-drink';

import {map, take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-other-drink',
  templateUrl: './view-other-drink.component.html',
  styleUrls: ['./view-other-drink.component.css']
})
export class ViewOtherDrinkComponent implements OnInit{

  displayedColumns: string[] = ['name', 'description','edit', 'delete'];
  drinks: OtherDrink[] = [];
  filteredDrinks: OtherDrink [] = [];
  dataSource = new MatTableDataSource <OtherDrink>();
  snackBar: any;

  constructor(private dataService: DataService, private router: Router) { }
  httpClient: any;
  apiUrl: any;



ngOnInit(): void {
  
  this.dataService.GetAllDrinks().subscribe((drinks:any) => {this.dataSource.data = drinks})
}

 // search function
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

  this.filteredDrinks = this.drinks.filter(drink => {
    const column2Value = drink.name.toLowerCase() || drink.name.toUpperCase();

    return column2Value.includes(filterValue);
  });
}



















}
