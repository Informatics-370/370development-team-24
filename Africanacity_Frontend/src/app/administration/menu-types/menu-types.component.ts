import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { MenuTypes } from 'src/app/shared/menu-types';
import {Router} from '@angular/router';
import { EditMenuTypeComponent } from './edit-menu-type/edit-menu-type.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './add-menu-type/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-menu-types',
  templateUrl: './menu-types.component.html',
  /*template: `<button (click)="deleteItem()">Delete</button>`,*/
  
  styleUrls: ['./menu-types.component.css']
})
export class MenuTypesComponent implements OnInit{
  menuTypes:MenuTypes[] = []

  constructor(private dataService: DataService, 
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar){}

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
  deleteMenuType(menu_TypeId: Number){
    this.dataService.deleteMenuType(menu_TypeId).subscribe(result => {
      this.deleteItem();
    });
  }

  //Edit menu type
  //  EditMenuType(menu_TypeId:Number)
  //  {
  //    this.router.navigate(['/edit-menu-type',menu_TypeId]);
  //  }

}
