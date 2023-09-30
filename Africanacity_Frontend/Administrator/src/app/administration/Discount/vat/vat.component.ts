import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { VAT } from 'src/app/shared/Vat';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.css']
})
export class VatComponent implements OnInit{

  constructor(private dataService:DataService ,private snackBar: MatSnackBar, private httpClient: HttpClient, 
    private router: Router,  private dialog: MatDialog){}

  ngOnInit(): void {
    this.GetAllVatPercentages()
    console.log(this.vatAmount)
    
    this.filteredTypes =this.vatAmount;
  }

  vatAmount: VAT[] =[]
  filteredTypes : VAT[] =[]

    GetAllVatPercentages()
    {
      this.dataService.GetAllVatPercentages().subscribe(result => {
        let vatList:any[] = result
        vatList.forEach((element) => {
          this.vatAmount.push(element)
          
        });
      })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
      this.filteredTypes = this.vatAmount.filter(vat => {
        const column3Value = vat.description.toLowerCase();
    
        return column3Value.includes(filterValue)
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
