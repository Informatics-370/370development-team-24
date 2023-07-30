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
  filteredMenuItemCategories: MenuItemCategory[] = [];

  constructor(private dataService: DataService, 
    private router: Router, 
    private httpClient: HttpClient, 
    private snackbar: MatSnackBar) {}

    deleteItem(): void {
    const confirmationSnackBar = this.snackbar.open('Are you sure you want to delete this item?', 'Cancel Delete', {duration: 5000,});
    confirmationSnackBar.onAction().subscribe(() => {
      // Perform the deletion action here
      this.deleteItemFromServer();
      window.location.reload();
    });
  }

  deleteItemFromServer(): void {
    this.DeleteMenuItemCategory;
  }

  ngOnInit(): void {
    this.GetAllMenuItemCategories();
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

  DeleteMenuItemCategory(menu_CategoryId: number)
  {
    this.dataService.DeleteMenuItemCategory(menu_CategoryId).subscribe(result => {
        this.deleteItem();
      });
  }

  // search
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredMenuItemCategories = this.filteredMenuItemCategories.filter(menuItemCategories => {
      const column2Value = menuItemCategories.name.toLowerCase() || menuItemCategories.name.toUpperCase();
      const column3Value = menuItemCategories.description.toLowerCase();
  
      return column2Value.includes(filterValue) || column3Value.includes(filterValue);
    });
  }
}
