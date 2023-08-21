import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/data.Service';
import { Chart, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Drink } from 'src/app/shared/Drink';
import { DrinkType } from 'src/app/shared/Drink_Type';
import { MenuItem } from 'src/app/shared/menu-item';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import { MenuTypes } from 'src/app/shared/menu-types';
import { FoodType } from 'src/app/shared/food-type';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuReportComponent implements OnInit{
  menuItems: MenuItem [] =[];
  menuTypes: MenuTypes [] =[];
  menuItemCategory: MenuItemCategory [] = [];
  drinks: Drink [] =[];
  drinksTypes: DrinkType [] =[];
  foodTypes: FoodType [] =[];
  filteredMenuItems: MenuItem [] =[];
  filteredDrinks: Drink [] =[];
  menuItemsPrices: { [menuItem_Id: number]: number } = {};
  isFilterActive = false;

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.fetchData();
    console.log('Menu Items', this.fetchData)
  }

  /*fetchData()
  {
    this.dataService.GetAllDrinks().subscribe(result => {
      let drinksList:any[] = result
      drinksList.forEach((element) => {
        this.drinks.push(element);
        this.GetAllMenuItems();
      });
    })
  }*/

  fetchData() 
  {
    this.dataService.GetAllMenuTypes().subscribe(result => {
      let menuTypesList: any[] = result;
      this.menuTypes = menuTypesList; // Assuming you want to replace the array with the new data
      this.GetAllMenuItems(); // Call GetAllInventoryItems after fetching types
    });
  }

  GetAllMenuItems() 
  {
    this.dataService.GetAllMenuItems().subscribe(result => {
      let menuItemsList: any[] = result;
      this.menuItems = menuItemsList; 

      this.menuItems.forEach(item => {
        this.dataService.GetMenuItemPrice(item.menuItem_Id).subscribe(priceResult => 
          {
            this.menuItemsPrices[item.menuItem_Id] = priceResult.price;
          });
        });
    });
  }

  /*GetAllMenuItems() 
  {
    this.dataService.GetAllMenuItems().subscribe(result => {
      let menuItemList: any[] = result;
      this.menuItems = menuItemList; // Replace the array with new data

      // Fetch inventory prices for each inventory item
      this.menuItems.forEach(item => {
      this.dataService.GetMenuItemPrice(item.menuItem_Id).subscribe(priceResult => 
        {
          this.menuItemsPrices[item.menuItem_Id] = priceResult.price;
        });
      });
      //console.log('prices',this.menuItemsPrices)
      
    });
  } */

  

  getItemsByType(typeName: string): MenuItem[] 
  {
    return this.menuItems.filter(item => item.menuTypeName === typeName);
  } 
  
  getMenuItemPrice(itemId: number): any {
    return this.menuItemsPrices[itemId]?.toString() || ''; // Use the inventoryPrices map to get the price
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Menu', 105, 25, { align: 'center' });
  
    // Add logo to the top left corner of the first page
    const logoImageUrl = 'assets/Pictures/Logo Black.png'; // Replace with the actual path to your logo image
    const logoWidth = 10; // Adjust the width of the logo as needed
    const logoHeight = 10; // Adjust the height of the logo as needed
    doc.addImage(logoImageUrl, 'PNG', 100, 5, logoWidth, logoHeight);
  
    doc.setFontSize(12);
  
    let startY = 40; // Adjust the Y position to leave space below the logo
  
    // Iterate over each inventory type name and filter data using getItemsByType
    this.menuTypes.forEach((type) => {
      const typeName = type.name;
      const itemsToDisplay = this.getItemsByType(typeName);
  
      if (itemsToDisplay.length > 0) {
        doc.text(`Menu Type: ${typeName}`, 15, startY);
        startY += 10;
  
        // Generate the table for the current inventory type
        const headers = ['ID', 'Name', 'Description', 'Food Type', 'Menu Type', 'Menu Category'];
        
        const data = itemsToDisplay.map(item => [
    
          item.menuItem_Id,
          item.name,
          item.description,
          item.foodTypeName,
          item.menuTypeName,
          item.menuCategoryName
        ]);

        // Generate headers
        /*doc.autoTable({
          head: headers,
          startY,
        });*/

        startY += 10; // Increment Y position for the next row

        
        // Generate the table row
        doc.autoTable({
          
          body: data,
          startY,
        });       
  
        startY += (data.length * 10) + 10; // Increment Y position for the next table
        
      }
    });

    // Add grand total at the end of the PDF
  
    // Convert the PDF blob to a Base64 string
    const pdfBlob = doc.output('blob');
  
    // Create a file-saver Blob object
    const file = new Blob([pdfBlob], { type: 'application/pdf' });
  
    // Save the Blob to a file
    saveAs(file, 'menu.pdf');
  }  

}
