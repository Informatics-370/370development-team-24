import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from 'src/app/service/inventory.service';
import { Chart, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { InventoryType } from 'src/app/shared/inventorytype';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventoryItems: InventoryItem[] = [];
  inventoryTypes: InventoryType[] = [];
  inventoryPrices: { [inventoryItemId: number]: number } = {};

  isFilterActive = false;

  // Bar chart
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [
    {
      data: [], // Array of inventory types
      label: 'Inventory Items',
    },
  ];
  barChartLegend = true;
  barChartType: ChartType = 'bar';

  // Pie Chart
  pieChartOptions: ChartOptions = {
    responsive: true,
  }
  pieChartLabels: string[] = [];
  pieChartData: ChartDataset[] = [
    {
      data: [], // Array of employee counts
      label: 'Number of Employees'
    }
  ];
  pieChartType: ChartType = 'pie';

  constructor(private http: HttpClient, private inventoryService: InventoryService) { }

  ngOnInit() 
  {
    this.fetchData()
  }

  fetchData() 
  {
    this.inventoryService.GetAllInventoryTypes().subscribe(result => {
      let inventoryList: any[] = result;
      this.inventoryTypes = inventoryList; // Assuming you want to replace the array with the new data
      this.GetAllInventoryItems(); // Call GetAllInventoryItems after fetching types
    });
  }
  
  GetAllInventoryItems() 
  {
    this.inventoryService.GetAllInventoryItems().subscribe(result => {
      let inventoryItemList: any[] = result;
      this.inventoryItems = inventoryItemList; // Replace the array with new data

      // Fetch inventory prices for each inventory item
      this.inventoryItems.forEach(item => {
      this.inventoryService.GetInventoryItemPrice(item.inventory_ItemId).subscribe(priceResult => 
        {
          this.inventoryPrices[item.inventory_ItemId] = priceResult.price;
        });
      });

      this.generateBarChart();
    });
  }  

  generateBarChart() 
  {
    // Create a mapping object to store the count for each type
    const typeCountMap: { [typeName: string]: number } = {};
    
    // Count the items for each type in the filtered list
    this.inventoryItems.forEach(item => {
      const typeName = item.inventoryTypeName;
      if (typeName) {
        if (!typeCountMap.hasOwnProperty(typeName)) {
          typeCountMap[typeName] = 1;
        } else {
          typeCountMap[typeName]++;
        }
      }
    });
  
    // Use the inventoryTypes array to get the type names for the chart labels
    const typeLabels = this.inventoryTypes.map(type => type.name);
    
    // Map the counts to the corresponding types for the chart data
    const inventoryItemCountData = typeLabels.map(typeName => typeCountMap[typeName] || 0);
    
    // Update the chart data and labels for both BAR and PIE graphs
    this.barChartLabels = typeLabels;
    this.barChartData[0].data = inventoryItemCountData;
  
    this.pieChartLabels = typeLabels;
    this.pieChartData[0].data = inventoryItemCountData;
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Inventory Report', 105, 25, { align: 'center' });
  
    // Add logo to the top left corner of the first page
    const logoImageUrl = 'assets/Pictures/Logo Black.png'; // Replace with the actual path to your logo image
    const logoWidth = 10; // Adjust the width of the logo as needed
    const logoHeight = 10; // Adjust the height of the logo as needed
    doc.addImage(logoImageUrl, 'PNG', 100, 5, logoWidth, logoHeight);
  
    doc.setFontSize(12);
  
    let startY = 40; // Adjust the Y position to leave space below the logo
    let grandTotal = 0;
  
    // Iterate over each inventory type name and filter data using getItemsByType
    this.inventoryTypes.forEach((type) => {
      const typeName = type.name;
      const itemsToDisplay = this.getItemsByType(typeName);
  
      if (itemsToDisplay.length > 0) {
        doc.text(`Inventory Type: ${typeName}`, 15, startY);
        startY += 10;
  
        // Generate the table for the current inventory type
        const headers = ['ID', 'Item Name', 'Description', 'Type', 'Quantity', 'Unit Price', 'Total Product Price'];
        
        const data = itemsToDisplay.map(item => {
          const totalPrice = this.calculateTotalPrice(item.quantity, this.getInventoryPrice(item.inventory_ItemId));
    
          return [
          item.inventory_ItemId,
          item.itemName,
          item.description,
          item.inventoryTypeName,
          item.quantity,
          this.getInventoryPrice(item.inventory_ItemId),
          totalPrice
          ]
          
        });

        // Generate headers
        doc.autoTable({
          head: [headers],
          startY,
        });

        startY += 10; // Increment Y position for the next row

        
        // Generate the table row
        doc.autoTable({
          body: data,
          startY,
        });


        // TO FIX HEADERS
        /* // Generate headers
        doc.autoTable({
          head: [headers],
          startY,
        });

        startY += 10; // Increment Y position for the next row

        // Generate rows
        data.forEach((data) => {
          // Check if the page height will be exceeded
          if (startY + 10 > doc.internal.pageSize.height) {
            // Add a new page
            doc.addPage();
            startY = 20; // Reset Y position
          }

          // Generate the table row
          doc.autoTable({
            body: [data], // Use 'row' for the current iteration
            startY,
          });
            
          startY += 10; // Increment Y position for the next row
        });
  
        //startY += (data.length * 10) + 10; // Increment Y position for the next table
        */
  
        startY += (data.length * 10) + 10; // Increment Y position for the next table
      
        const subtotal = this.calculateSubtotal(typeName);

        // Format subtotal in the same way as the HTML
        const formattedSubtotal = `Subtotal: R ${subtotal.toFixed(2)}`;

        doc.text(formattedSubtotal, 15, startY - 10);
        startY += 10; // Increment Y position for the subtotal row

        grandTotal += subtotal;
      }
    });

    // Add grand total at the end of the PDF
    doc.text(`Grand Total: R ${grandTotal}`, 15, startY);
  
    // Convert the PDF blob to a Base64 string
    const pdfBlob = doc.output('blob');
  
    // Create a file-saver Blob object
    const file = new Blob([pdfBlob], { type: 'application/pdf' });
  
    // Save the Blob to a file
    saveAs(file, 'inventory_report.pdf');
  }  
  
  //get inventory prices
  getInventoryPrice(itemId: number): any {
    return this.inventoryPrices[itemId]?.toString() || ''; // Use the inventoryPrices map to get the price
  }
  

  
  getItemsByType(typeName: string): InventoryItem[] 
  {
    return this.inventoryItems.filter(item => item.inventoryTypeName === typeName);
  }  

  //totals per product 
  calculateTotalPrice(quantity: number, unitPrice: number): number 
  {
    return quantity * unitPrice;
  }

  //subtotal amounts per type
  calculateSubtotal(typeName: string): number 
  {
    const itemsOfType = this.getItemsByType(typeName);
    let subtotal = 0;
  
    itemsOfType.forEach(item => {
      subtotal += (this.inventoryPrices[item.inventory_ItemId] * item.quantity);
    });
  
    return subtotal;
  }

  //FINAL TOTAL
  calculateGrandTotal(): number 
  {
    return this.inventoryTypes.reduce((acc, type) => {
      return acc + this.calculateSubtotal(type.name);
    }, 0);
  }
  
  
  
}
