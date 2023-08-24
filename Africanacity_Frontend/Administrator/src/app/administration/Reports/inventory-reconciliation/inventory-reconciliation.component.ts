import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InventoryService } from 'src/app/service/inventory.service';
import { StockTakeRecon } from 'src/app/shared/stocktake';
import { StockTake, StockTakeItem } from 'src/app/shared/stocktakeitem';
import { Chart, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver'; // Import file-saver for saving the PDF
import { InventoryItem } from 'src/app/shared/inventoryitem';

@Component({
  selector: 'app-inventory-reconciliation',
  templateUrl: './inventory-reconciliation.component.html',
  styleUrls: ['./inventory-reconciliation.component.css']
})
export class InventoryReconciliationComponent implements OnInit{
  reconItems: StockTakeRecon[] = [];
  stockTakeItems: StockTakeItem [] = [];
  inventoryItems: InventoryItem [] = [];

  // Line chart
  lineChartData: ChartDataset[] = [];
  lineChartLabels: string[] = [];
  lineChartOptions: ChartOptions = { responsive: true,};
 // public lineChartColors: Color[] = [];
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartPlugins = [];

  constructor(private inventoryService: InventoryService, private snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router){}

  ngOnInit(): void {
    //this.loadChartData();
    this.GetAllReconItems()
    console.log('data', this.reconItems)
  }

  loadChartData() {
    this.lineChartData = [
      {
        data: this.reconItems.map(item => item.quantityDifference),
        label: 'Quantity Difference',
        fill: false,
      },
    ];
  
    this.lineChartLabels = this.reconItems.map(item => item.inventoryItemName);
  }
  
  GetAllReconItems()
  {
    this.inventoryService.GetAllReconItems().subscribe(result => {
      let reconList:any[] = result;
      this.reconItems = reconList;
        
      this.loadChartData();
    });
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Stock Reconciliation Listing', 105, 25, { align: 'center' });
    
    // Add logo to the top left corner of the first page
    const logoImageUrl = 'assets/Pictures/Logo Black.png'; // Replace with the actual path to your logo image
    const logoWidth = 10; // Adjust the width of the logo as needed
    const logoHeight = 10; // Adjust the height of the logo as needed
    doc.addImage(logoImageUrl, 'PNG', 100, 5, logoWidth, logoHeight);
  
    const headers = [['ID', 'Inventory Name', 'Inventory Qty', 'Stock Take Qty', 'Quantity Difference']];
    
    let itemsToDisplay = this.reconItems; // Default: Display all suppliers
  
    /*if (this.isFilterActive) {
      suppliersToDisplay = this.filteredSuppliers; // Display filtered suppliers
    }*/

    const data = itemsToDisplay.map(reconItem => [
      reconItem.stockTakeItemId, 
      reconItem.inventoryItemName, 
      reconItem.inventoryQuantity, 
      reconItem.quantity, 
      reconItem.quantityDifference
    ]);
  
    doc.setFontSize(12);
  
    let startY = 40; // Adjust the Y position to leave space below the logo
  
    // Generate headers
    doc.autoTable({
      head: headers,
      body: data,
      startY,
    });

    /*startY += 10; // Increment Y position for the next row

    // Generate rows
    data.forEach((row) => {
      // Check if the page height will be exceeded
      if (startY + 10 > doc.internal.pageSize.height) {
        // Add a new page
        doc.addPage();
        startY = 20; // Reset Y position
      }

      // Generate the table row
      doc.autoTable({
        body: [row], // Use 'row' for the current iteration
        startY,
      });
        
      startY += 10; // Increment Y position for the next row
    });*/
  
    // Convert the PDF blob to a Base64 string
    const pdfBlob = doc.output('blob');
  
    // Create a file-saver Blob object
    const file = new Blob([pdfBlob], { type: 'application/pdf' });
  
    // Save the Blob to a file
    saveAs(file, 'InventoryRecon_report.pdf');
  }
}
