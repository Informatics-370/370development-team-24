import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Discount } from 'src/app/shared/Discount';


@Component({
  selector: 'app-view-discounts',
  templateUrl: './view-discounts.component.html',
  styleUrls: ['./view-discounts.component.css']
})
export class ViewDiscountsComponent implements OnInit {

  constructor(private dataService:DataService ,private snackBar: MatSnackBar, private httpClient: HttpClient, 
    private router: Router,  private dialog: MatDialog){}

  ngOnInit(): void {
    this.GetAllDiscountPercentages()
    console.log(this.discounts)
    
    this.filteredTypes =this.discounts;
  }

  discounts: Discount[] =[]
  filteredTypes : Discount[] =[]

    GetAllDiscountPercentages()
    {
      this.dataService.GetAllDiscountPercentages().subscribe(result => {
        let discountList:any[] = result
        discountList.forEach((element) => {
          this.discounts.push(element)
          
        });
      })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
      this.filteredTypes = this.discounts.filter(discount => {
        const column2Value = discount.name.toLowerCase() || discount.name.toUpperCase();
        const column3Value = discount.description.toLowerCase();
    
        return column2Value.includes(filterValue) || 
        column3Value.includes(filterValue)
      });
    }


    deleteItemFromServer(): void{
      this.DeleteADiscountPercentage;
    }

    deleteItem(): void {
      const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this Discount Percentage?', 'Delete, Cancel',{
        duration: 5000, // Display duration in milliseconds
  
      });
      confirmationSnackBar.onAction().subscribe(() => {
        this.deleteItemFromServer();
       window.location.reload();
      })
    }

    DeleteADiscountPercentage(discountId: Number){
      this.dataService.DeleteADiscountPercentage(discountId).subscribe(result => {
        this.deleteItem();
        });
    }

    // openHelpModal(field: string): void {
    //   const dialogRef = this.dialog.open(HelpViewentertainmentComponent, {
    //     width: '500px',
    //     data: { field } // Pass the field name to the modal
    //   });
    
    //   dialogRef.afterClosed().subscribe(result => {
    //     // Handle modal close if needed
    //   });
    // }
}
