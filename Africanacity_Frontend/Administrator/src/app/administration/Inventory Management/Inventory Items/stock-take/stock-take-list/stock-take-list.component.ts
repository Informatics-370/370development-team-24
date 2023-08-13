import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InventoryService } from 'src/app/service/inventory.service';
import { StockTakeRecon } from 'src/app/shared/stocktake';
import { StockTake } from 'src/app/shared/stocktakeitem';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver'; // Import file-saver for saving the PDF

@Component({
  selector: 'app-stock-take-list',
  templateUrl: './stock-take-list.component.html',
  styleUrls: ['./stock-take-list.component.css']
})
export class StockTakeListComponent implements OnInit {
  reconItems: StockTakeRecon[] = []
  filteredreconItems: StockTakeRecon[] = [];

  constructor(private inventoryservice: InventoryService, private snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.GetAllReconItems()
    console.log(this.reconItems)

    this.filteredreconItems= this.reconItems
    console.log(this.filteredreconItems)
  }
  GetAllReconItems()
  {
    this.inventoryservice.GetAllReconItems().subscribe(result => {
      let reconList:any[] = result
      reconList.forEach((element) => {
        this.reconItems.push(element)
        
      });
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredreconItems = this.reconItems.filter(reconItems => {
      const column2Value = reconItems.inventoryItemName.toLowerCase()
    
      return column2Value.includes(filterValue)
    });
  }
  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Stock Reconciliation Listing', 105, 15, { align: 'center' });
    const headers = [['ID', 'Inventory Name', 'Inventory Qty', 'Stock Take Qty', 'Quantity Difference']];
    
    // Map the checklistItems to generate the data array
    const data = this.reconItems.map(reconItems => [reconItems.stockTakeItemId, reconItems.inventoryItemName, reconItems.inventoryQuantity, reconItems.quantity, reconItems.quantityDifference]);
  
    doc.setFontSize(12);
  
    // Generate the table using autoTable
    // startY is the initial position for the table
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20,
      // Other options for styling the table if needed
    });
    
    // Convert the PDF blob to a Base64 string
    const pdfBlob = doc.output('blob');
  
    // Create a file-saver Blob object
    const file = new Blob([pdfBlob], { type: 'application/pdf' });
  
    // Save the Blob to a file
    saveAs(file, 'Stock_listing.pdf');
  }


}
