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

  displayedColumns: string[] = ['name', 'description','drinkTypeName','edit', 'delete'];
  drinks: OtherDrink[] = [];
  filteredDrinks: OtherDrink [] = [];
  dataSource = new MatTableDataSource <OtherDrink>();
  snackBar: any;

  constructor(
    private dataService: DataService, 
    private router: Router) { }
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


deleteItem(): void {
  const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this item?', 'Cancel Delete', {duration: 5000,})
  
  confirmationSnackBar.onAction().subscribe(() => {
    this.deleteItemFromServer();
    window.location.reload();
  });
}

deleteItemFromServer(): void {
  this.DeleteDrink;
}

// GetAllDrinks()
// {
//   this.dataService.GetAllDrinks().subscribe(result => {
//     let drinksList: any[] = result
//     drinksList.forEach((element) => {
//       this.drink.push(element)
//     });
//   })
// }

DeleteDrink(drinkId: number)
{
  this.dataService.DeleteDrink(drinkId).subscribe(result => {
      this.deleteItem();
    });
  }

editDrinkItem(otherDrinkId: number): void {
  
  this.router.navigate(['/edit-drink', otherDrinkId]);
}


}
