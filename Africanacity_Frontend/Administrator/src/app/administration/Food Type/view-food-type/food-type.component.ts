import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { FoodType } from 'src/app/shared/food-type';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

@Component({
  selector: 'app-food-type',
  templateUrl: './food-type.component.html',
  styleUrls: ['./food-type.component.css']
})

export class FoodTypeComponent {
  foodType: FoodType[] = []
  filteredFoodTypes: FoodType[] = [];

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

  // search
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredFoodTypes = this.filteredFoodTypes.filter(foodType => {
      const column2Value = foodType.name.toLowerCase() || foodType.name.toUpperCase();
      const column3Value = foodType.description.toLowerCase();
  
      return column2Value.includes(filterValue) || column3Value.includes(filterValue);
    });
  }

}

