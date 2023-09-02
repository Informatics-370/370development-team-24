import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Entertainment_Type } from 'src/app/shared/entertainmentType';
import { DataService } from 'src/app/service/data.Service';
import { MatDialog } from '@angular/material/dialog';
import { HelpViewentertainmentComponent } from './help-viewentertainment/help-viewentertainment.component';

@Component({
  selector: 'app-entertainment-types',
  templateUrl: './entertainment-types.component.html',
  styleUrls: ['./entertainment-types.component.css']
})
export class EntertainmentTypesComponent implements OnInit{

  constructor(private dataService:DataService ,private snackBar: MatSnackBar, private httpClient: HttpClient, 
    private router: Router,  private dialog: MatDialog){}

  ngOnInit(): void {
    this.GetEntertainmentTypes()
    console.log(this.entertainments)
    
    this.filteredTypes =this.entertainments;
  }

  entertainments: Entertainment_Type[] =[]
  filteredTypes : Entertainment_Type[] =[]

    GetEntertainmentTypes()
    {
      this.dataService.GetEntertainmentTypes().subscribe(result => {
        let entertainmentList:any[] = result
        entertainmentList.forEach((element) => {
          this.entertainments.push(element)
          
        });
      })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
      this.filteredTypes = this.entertainments.filter(entertainmentType => {
        const column2Value = entertainmentType.name.toLowerCase() || entertainmentType.name.toUpperCase();
        const column3Value = entertainmentType.description.toLowerCase();
    
        return column2Value.includes(filterValue) || 
        column3Value.includes(filterValue)
      });
    }


    deleteItemFromServer(): void{
      this.DeleteEntertainmentType;
    }

    deleteItem(): void {
      const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this type of entertainment?', 'Delete, Cancel',{
        duration: 5000, // Display duration in milliseconds
  
      });
      confirmationSnackBar.onAction().subscribe(() => {
        this.deleteItemFromServer();
       window.location.reload();
      })
    }

    DeleteEntertainmentType(entertainment_TypeId: Number){
      this.dataService.DeleteEntertainmentType(entertainment_TypeId).subscribe(result => {
        this.deleteItem();
        });
    }

    openHelpModal(field: string): void {
      const dialogRef = this.dialog.open(HelpViewentertainmentComponent, {
        width: '500px',
        data: { field } // Pass the field name to the modal
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Handle modal close if needed
      });
    }

}
