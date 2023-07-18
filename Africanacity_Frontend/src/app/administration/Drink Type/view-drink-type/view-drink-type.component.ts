import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { DrinkType } from 'src/app/shared/drink-type';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

@Component({
  selector: 'app-view-drink-type',
  templateUrl: './view-drink-type.component.html',
  styleUrls: ['./view-drink-type.component.css']
})

export class DrinkTypeComponent {
  drinkType: DrinkType[] = []
  searchQuery!: string;

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

  /*searchQuery: string;

  search(searchQuery: string)
  {
      this.dataService.search(this.searchQuery).subscribe(
        (results) => {
          this.foodType = results;
        },
        (error) => {
          console.log(error);
        }
      )
  }*/

}

