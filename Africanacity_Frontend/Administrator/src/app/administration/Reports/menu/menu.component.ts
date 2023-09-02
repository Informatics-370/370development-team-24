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
import { UserStoreService } from 'src/app/UserService/user-store.service';
import { AuthService } from 'src/app/UserService/auth.service';

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
  selectedFilter: string = 'menuType';
  selectedFoodType: string | undefined ;
  selectedMenuCategory: string | undefined;
  userName: string = "";

  isFilterActive = false;

  constructor(private http: HttpClient, 
    private dataService: DataService,
    private userService: UserStoreService,
    private auth: AuthService) { }

  ngOnInit() {
    this.fetchData();
    console.log('Menu Items', this.fetchData)
    console.log("price", this.getMenuItemPrice(1))
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
  
  // Get drinks and menu items
  fetchData(){
    this.GetAllDrinkTypes();
    this.GetAllMenuTypes();
  }
  // Get drinks and drink types
  GetAllDrinkTypes()
  {
    this.dataService.GetAllDrinkTypes().subscribe(result => {
      this.drinksTypes = result;
      this.GetAllDrinks();
    });
  }

  GetAllDrinks()
  {
    this.dataService.GetAllDrinks().subscribe(result => {
      this.drinks = result;
    });
  }

  filterByDrinkType(type: string) 
  {
    if (type === 'all') {
      this.isFilterActive = false;
    } else {
      this.filteredDrinks = this.drinks.filter(item => item.drinkTypeName === type);
      this.isFilterActive = true;
    }
  }

  GetAllMenuTypes() 
  {
    this.dataService.GetAllMenuTypes().subscribe(result => {
      this.menuTypes = result; 
      this.GetAllMenuItems(); 
    });
  }

  GetAllMenuItems() 
  {
    this.dataService.GetAllMenuItems().subscribe(result => {
      this.menuItems = result; 

      this.menuItems.forEach(item => {
        this.dataService.GetMenuItemPrice(item.menuItem_Id).subscribe(priceResult => {
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

  getItemsByType(typeName: string, foodType?: string, menuCategory?: string): MenuItem[] 
  {
    this.filteredMenuItems = this.menuItems.filter(item => item.menuTypeName === typeName);

    if (foodType)
    {
      this.filteredMenuItems = this.menuItems.filter(item => item.foodTypeName === foodType);
    }

    if (menuCategory)
    {
      this.filteredMenuItems = this.menuItems.filter(item => item.menuCategoryName === menuCategory);
    }

    return this.filteredMenuItems;
  } 

  changeFilter(filter: string) {
    this.selectedFilter = filter;
    this.selectedFoodType = undefined;
    this.selectedMenuCategory = undefined;
  }

  filterByFoodType(foodType: string) {
    this.selectedFoodType = foodType;
  }

  filterByMenuCategory(menuCategory: string) {
    this.selectedMenuCategory = menuCategory;
  }
  
  getMenuItemPrice(itemId: number): any {
    return this.menuItemsPrices[itemId]?.toString() || ''; // Use the inventoryPrices map to get the price
  }  

  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Menu', 105, 25, { align: 'center' });
  
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
  
    let startY = 40; 
  
    // Iterate over each inventory type name and filter data using getItemsByType
    this.menuTypes.forEach((type) => {
      const typeName = type.name;
      const itemsToDisplay = this.getItemsByType(typeName);
  
      if (itemsToDisplay.length > 0) {
        doc.text(`Menu Type: ${typeName}`, 15, startY);
        startY += 10;
  
        // Generate the table for the current inventory type
        const headers = ['Name', 'Description', 'Food Type', 'Menu Type', 'Menu Category'];
        
        const data = itemsToDisplay.map(item => [
          item.name,
          item.description,
          item.foodTypeName,
          item.menuTypeName,
          item.menuCategoryName
        ]);

        // Generate headers
        /*doc.autoTable({
          head: [headers],
          startY,
        });*/

        // Increment Y position for the next row
        startY += 10; 
        
        // Generate the table row
        doc.autoTable({
          headers: [headers],
          body: data,
          startY,
        });       
  
        // Increment Y position for the next table
        startY += (data.length * 10) + 10; 
        
      }
    });
  
    // Convert the PDF blob to a Base64 string
    const pdfBlob = doc.output('blob');
  
    // Create a file-saver Blob object
    const file = new Blob([pdfBlob], { type: 'application/pdf' });
  
    // Save the Blob to a file
    saveAs(file, 'menu.pdf');
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
