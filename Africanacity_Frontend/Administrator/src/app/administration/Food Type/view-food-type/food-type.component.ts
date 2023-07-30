import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { FoodType } from 'src/app/shared/food-type';

@Component({
  selector: 'app-food-type',
  templateUrl: './food-type.component.html',
  styleUrls: ['./food-type.component.css']
})

export class FoodTypeComponent {
  foodType: FoodType[] = []
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
    this.GetAllFoodTypes();
  }

  deleteItemFromServer(): void {
    this.DeleteFoodType;
  }

 


  GetAllFoodTypes()
  {
    this.dataService.GetAllFoodTypes().subscribe(result => {
      let foodTypesList: any[] = result
      foodTypesList.forEach((element) => {
        this.foodType.push(element)
      });
    })
  
  }

  DeleteFoodType(foodTypeId: number)
  {
    this.dataService.DeleteFoodType(foodTypeId).subscribe(result => {
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

