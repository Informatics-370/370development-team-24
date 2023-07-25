import { AfterViewInit, Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { MenuTypes } from 'src/app/shared/menu-types';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuItem } from 'src/app/shared/menu-item';
import { FoodType } from 'src/app/shared/food-type';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import {map, take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-menuitems',
  templateUrl: './menuitems.component.html',
  styleUrls: ['./menuitems.component.css']
})
export class MenuitemsComponent implements OnInit{

  displayedColumns: string[] = ['name', 'description', 'menuTypeName','foodTypeName', 'menuCategoryName', 'actions', 'edit'];
  menuItems:MenuItem[] = [];
  
  dataSource = new MatTableDataSource <MenuItem>();
  snackBar: any;
  constructor(private dataService: DataService, private router: Router) { }
  httpClient: any;
  apiUrl: any;


    ngOnInit(): void{
  
      this.dataService.GetAllMenuItems().subscribe((menuItems:any) => {this.dataSource.data = menuItems})
    }


deleteItem(): void{
 
  const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete the menu item?','Delete',{
      duration: 5000,
    });

    confirmationSnackBar.onAction().subscribe(() => {
      this.deleteItemFromServer();
      window.location.reload();
    })

  }

  deleteItemFromServer(): void{
    this.deleteItem();
    
    
  }


deleteMenuItem(menuItemId: number){
  this.dataService.deleteMenuItem(menuItemId).subscribe(result => {
    this.deleteItem();
  },
  error =>{
    console.error('Error deleting menu items', error);
  }
  );
}

//edit menu item html link
editMenuItem(menuItemId: number): void {
  this.router.navigate(['/edit-menu-item', menuItemId]);
}

 






}
