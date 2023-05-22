import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';

@Component({
  selector: 'app-menu-item-category',
  templateUrl: './menu-item-category.component.html',
  styleUrls: ['./menu-item-category.component.css']
})
export class MenuItemCategoryComponent {
  menuItemCategories: MenuItemCategory[] = [];

  constructor(private dataService: DataService, 
    private router: Router, 
    private httpClient: HttpClient, 
    private snackbar: MatSnackBar) {}

    deleteItem(): void {
    const confirmationSnackBar = this.snackbar.open('Are you sure you want to delete this item?', 'Cancel Delete', {duration: 5000,})
  }

  ngOnInit(): void {
    this.GetAllMenuItemCategories();
  }

  deleteItemFromServer(): void {
    this.DeleteMenuItemCategory;
  }

  GetAllMenuItemCategories()
  {
    this.dataService.GetAllMenuItemCategories().subscribe(result => {
      let MenuItemCategoryList: any[] = result
      MenuItemCategoryList.forEach((element) => {
        this.menuItemCategories.push(element)
      });
    })
  
  }

  DeleteMenuItemCategory(MenuItemCategoryId: number)
  {
    this.dataService.DeleteFoodType(MenuItemCategoryId).subscribe(result => {
        this.deleteItem();
      });
  }
}
