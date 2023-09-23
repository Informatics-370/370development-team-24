import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { MenuTypes } from 'src/app/shared/menu-types';
import {Router} from '@angular/router';
import { EditMenuTypeComponent } from './edit-menu-type/edit-menu-type.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './add-menu-type/confirmation-dialog/confirmation-dialog.component';
import { MenuItem } from 'src/app/shared/menu-item';
import { FoodType } from 'src/app/shared/food-type';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import { MatDialog } from '@angular/material/dialog';
import { HelpViewmenutypeComponent } from './help-viewmenutype/help-viewmenutype.component';

@Component({
  selector: 'app-menu-types',
  templateUrl: './menu-types.component.html',
  /*template: `<button (click)="deleteItem()">Delete</button>`,*/
  
  styleUrls: ['./menu-types.component.css']
})
export class MenuTypesComponent implements OnInit{
  menuTypes:MenuTypes[] = []
  filteredMenuTypes: MenuTypes[] = []



  constructor(private dataService: DataService, 
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ){}
    deleteItem(): void{
 
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete the menu type?','Delete',{
        duration: 5000,
      });

      confirmationSnackBar.onAction().subscribe(() => {
        this.deleteItemFromServer();
        window.location.reload();
      })

    }

    deleteItemFromServer(): void{
      this.deleteMenuType;
    }

   
  ngOnInit(): void{
    this.GetAllMenuTypes()
    
    console.log(this.menuTypes)
    this.filteredMenuTypes = this.menuTypes
    console.log(this.filteredMenuTypes)
  }


  //get all the menu types
  GetAllMenuTypes()
  {
    this.dataService.GetAllMenuTypes().subscribe(result => {
      let typesList:any[] = result
      typesList.forEach((element) => {
        this.menuTypes.push(element)
      });
    })
  }

  //Delete menu type
  deleteMenuType(menu_TypeId: number | undefined) {
    if (menu_TypeId !== undefined) {
      this.dataService.deleteMenuType(menu_TypeId).subscribe(result => {
        this.deleteItem();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredMenuTypes = this.menuTypes.filter(menutype => {
      const column2Value = menutype.name.toLowerCase() || menutype.name.toUpperCase();
     
  
      return column2Value.includes(filterValue);
    });
  }
  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpViewmenutypeComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }







}
