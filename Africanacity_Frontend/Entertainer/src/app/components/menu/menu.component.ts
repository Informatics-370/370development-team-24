import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/models/menu-item';
import { MenuService } from 'src/app/services/Menu.Service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuData: any; // Replace 'any' with the actual data structure for your menu
  menuItems:MenuItem[] = [];
  menuItemsPrices: { [menuItem_Id: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    // Retrieve menu data from the route parameters
    this.route.params.subscribe((params) => {
      const barcode = params['barcode'];
      // Fetch menu data based on the barcode
      this.menuService.GetMenuByBarcode(barcode).subscribe((data) => {
        this.menuData = data; // Set the menu data to display
      });
    });
    
  }

  GetAllMenuItems() 
  {
    this.menuService.getAllMenuItems().subscribe(result => {
      this.menuItems = result; 

      this.menuItems.forEach(item => {
        this.menuService.GetMenuItemPrice(item.menuItem_Id).subscribe(priceResult => {
          this.menuItemsPrices[item.menuItem_Id] = priceResult.price;
          console.log(this.getMenuItemPrice)
        });
      });
    });
  }


  getMenuItemPrice(itemId: number): any {
    return this.menuItemsPrices[itemId]?.toString() || ''; // Use the inventoryPrices map to get the price
  }  

}
