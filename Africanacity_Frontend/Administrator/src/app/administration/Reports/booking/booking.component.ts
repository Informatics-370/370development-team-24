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
import { AuthService } from 'src/app/UserService/auth.service';
import { UserStoreService } from 'src/app/UserService/user-store.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  inventoryItems: InventoryItem[] = [];
  inventoryTypes: InventoryType[] = [];
  inventoryPrices: { [inventoryItemId: number]: number } = {};
  userName: string ="";

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

  constructor(private http: HttpClient, 
    private inventoryService: InventoryService, 
    private auth: AuthService, 
    private userService: UserStoreService) { }

  ngOnInit() 
  {
    this.GetAllInventoryItems()
    console.log("prices", this.inventoryPrices)
  }

  // method to get all the data
  /*fetchData() 
  {
    this.inventoryService.GetAllInventoryTypes().subscribe(result => {
      this.inventoryTypes = result; // Assuming you want to replace the array with the new data
      this.GetAllInventoryItems(); // Call GetAllInventoryItems after fetching types
    });
  }
  
  GetAllInventoryItems() 
  {
    this.inventoryService.GetAllInventoryItems().subscribe(result => {
      this.inventoryItems = result; 
      // Fetch inventory prices for each inventory item
      this.inventoryItems.forEach(item => {
      this.inventoryService.GetInventoryItemPrice(item.inventory_ItemId).subscribe(priceResult => 
        {
          this.inventoryPrices[item.inventory_ItemId] = priceResult.price;
        });
      });

      this.generateBarChart();
    });
  }  */

  /*fetchData() {
    this.inventoryService.GetAllInventoryTypes().subscribe(result => {
      this.inventoryTypes = result;
      this.GetAllInventoryItems();
    });
  }*/
  
  GetAllInventoryItems() {
    this.inventoryService.GetAllInventoryItems().subscribe(result => {
      this.inventoryItems = result;
  
      // Fetch inventory prices for each inventory item
      this.inventoryItems.forEach(item => {
        this.inventoryService.GetInventoryItemPrice(item.inventory_ItemId).subscribe(priceResult => {
          this.inventoryPrices[item.inventory_ItemId] = priceResult.price;
        });
      });
  
      // Generate data for the bar chart
      const itemNames = this.inventoryItems.map(item => item.itemName);
      const itemPrices = this.inventoryItems.map(item => this.inventoryPrices[item.inventory_ItemId]);
  
      // Update the chart data and labels for the bar chart
      this.barChartLabels = itemNames;
      this.barChartData[0].data = itemPrices;
  
      // Generate the bar chart
      this.generateBarChart();
    });
  }

  generateBarChart() 
  {
    // Create a mapping object to store the count for each type
    //const typeCountMap: { [typeName: string]: number } = {};
    
    // Count the items for each type in the filtered list
    /*this.inventoryItems.forEach(item => {
      const typeName = item.inventoryTypeName;
      if (typeName) {
        if (!typeCountMap.hasOwnProperty(typeName)) {
          typeCountMap[typeName] = 1;
        } else {
          typeCountMap[typeName]++;
        }
      }
    });*/
  
    // Use the inventoryTypes array to get the type names for the chart labels
    //const typeLabels = this.inventoryTypes.map(type => type.name);
    
    // Map the counts to the corresponding types for the chart data
    //const inventoryItemCountData = typeLabels.map(typeName => typeCountMap[typeName] || 0);
    
    // Update the chart data and labels for both BAR and PIE graphs
    this.barChartLabels = this.inventoryItems.map(item => item.itemName);
    this.barChartData[0].data = this.inventoryItems.map(item => this.inventoryPrices[item.inventory_ItemId]);
  
    this.pieChartLabels = this.inventoryItems.map(item => item.itemName);
    this.pieChartData[0].data = this.inventoryItems.map(item => this.inventoryPrices[item.inventory_ItemId]);
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Inventory Report', 105, 25, { align: 'center' });
  
    // Add logo to the top left corner of the first page
    const logoImageUrl = 'assets/Pictures/Logo Black.png'; 
    const logoWidth = 10; 
    const logoHeight = 10; 
    doc.addImage(logoImageUrl, 'PNG', 100, 5, logoWidth, logoHeight);

    // Get the current date
    const currentDate = this.formatDate(new Date());
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(10);
    doc.text(`Downloaded on: ${currentDate}`, pageWidth - 70, 10);

    // Add user name to report
    this.userService.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.userName = val || fullNameFromToken
    });

    doc.setFontSize(10);
    doc.text(`Generated by: ${this.userName}`, pageWidth - 70, 15 )
  
    doc.setFontSize(12);
  
    // Adjust the Y position to leave space below the logo
    let startY = 40; 
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

        // Increment Y position for the next row
        startY += 10; 
        
        // Generate the table row
        doc.autoTable({
          body: data,
          startY,
        });
  
        // Increment Y position for the next table
        startY += (data.length * 10) + 10; 
      
        const subtotal = this.calculateSubtotal(typeName);

        // Format subtotal in the same way as the HTML
        const formattedSubtotal = `Subtotal: R ${subtotal.toFixed(2)}`;

        doc.text(formattedSubtotal, 15, startY - 10);
        // Increment Y position for the subtotal row
        startY += 10; 

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
    return this.inventoryPrices[itemId]?.toString() || ''; 
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
  
  // Formatting the date for the report
  formatDate(date: Date): string
  {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long'});
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } 
}
