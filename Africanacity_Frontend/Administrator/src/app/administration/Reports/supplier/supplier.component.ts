import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupplierService } from 'src/app/service/supplier.service';
import { Chart, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Supplier } from 'src/app/shared/supplier';
import { Supplier_Inventory } from 'src/app/shared/supplieritem';
import { SupplierType } from 'src/app/shared/SupplierTypes'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplier: Supplier[] = [];
  supplierType: SupplierType[] = [];
  filteredSuppliers: Supplier[] = [];

  isFilterActive = false;

  constructor(private http: HttpClient, private supplierService: SupplierService) { }

  ngOnInit() 
  {
    this.fetchData()
  }

  fetchData() 
  {
    this.supplierService.GetAllSupplierTypes().subscribe(result => {
      let esupplierTypeList: any[] = result;
      this.supplierType = esupplierTypeList; // Assuming you want to replace the array with the new data
      this.GetAllSuppliers(); // Call GetAllInventoryItems after fetching types
    });
  }

  GetAllSuppliers() 
  {
    this.supplierService.GetAllSuppliers().subscribe(result => {
      let supplierList: any[] = result;
      this.supplier = supplierList; // Replace the array with new data
    });
  }  

  filterBySupplierType(type: string) 
  {
    if (type === 'all') {
      this.isFilterActive = false;
    } else {
      this.filteredSuppliers = this.supplier.filter(item => item.supplierTypeName === type);
      this.isFilterActive = true;
    }
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Supplier Report', 105, 25, { align: 'center' });
  
    // Add logo to the top left corner of the first page
    const logoImageUrl = 'assets/Pictures/Logo Black.png'; // Replace with the actual path to your logo image
    const logoWidth = 10; // Adjust the width of the logo as needed
    const logoHeight = 10; // Adjust the height of the logo as needed
    doc.addImage(logoImageUrl, 'PNG', 100, 5, logoWidth, logoHeight);
  
    const headers = [['ID', 'Name', 'Type', 'Email Address', 'Physical Address', 'Phone Number']];
    
    let suppliersToDisplay = this.supplier; // Default: Display all suppliers
  
    if (this.isFilterActive) {
      suppliersToDisplay = this.filteredSuppliers; // Display filtered suppliers
    }

    const data = suppliersToDisplay.map(supplier => [
      supplier.supplierId, 
      supplier.supplierName, 
      supplier.supplierTypeName, 
      supplier.email_Address, 
      supplier.physical_Address, 
      supplier.phoneNumber
    ]);
  
    doc.setFontSize(12);
  
    let startY = 40; // Adjust the Y position to leave space below the logo
  
    // Generate headers
    doc.autoTable({
      head: [headers],
      startY,
    });

    startY += 10; // Increment Y position for the next row

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
    });
  
    // Convert the PDF blob to a Base64 string
    const pdfBlob = doc.output('blob');
  
    // Create a file-saver Blob object
    const file = new Blob([pdfBlob], { type: 'application/pdf' });
  
    // Save the Blob to a file
    saveAs(file, 'supplier_report.pdf');
  }
}
