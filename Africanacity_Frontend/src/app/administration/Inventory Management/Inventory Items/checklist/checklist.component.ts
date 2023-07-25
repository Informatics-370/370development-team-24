import { Component } from '@angular/core';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent {
  checklistItems: InventoryItem[] = [];
  predefinedLevel: number = 5; // Predefined level for the quantity

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.checkInventory();
  }

  checkInventory() {
    this.inventoryService.GetAllInventoryItems().subscribe((inventoryItems: InventoryItem[]) => {
      for (let item of inventoryItems) {
        if (item.quantity < this.predefinedLevel) {
          this.addToChecklist(item);
        }
      }
    });
  }

  addToChecklist(item: InventoryItem) {
    item.isChecked = false; 
    this.checklistItems.push(item);
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.checklistItems = this.checklistItems.filter(item => {
      const column2Value = item.itemName.toLowerCase() || item.itemName.toUpperCase();
  
      return column2Value.includes(filterValue);
    });
  }
  

  downloadItem(item: InventoryItem) {
    // Implement the logic to download the item
  }
  
  orderItem(item: InventoryItem) {
    // Implement the logic to order the item
  }
  
  queryItem(item: InventoryItem) {
    // Implement the logic to query the item
  }
  
  receiveItem(item: InventoryItem) {
    // Implement the logic to mark the item as received
  }

    
  deleteItem(item: InventoryItem) {
    // Implement the logic to mark the item as received
  }

  onCheckboxChange(item: InventoryItem) {
    if (item.isChecked) {
      // Perform any action you want when the checkbox is checked
      console.log(`Item ${item.itemName} is checked.`);
    } else {
      // Perform any action you want when the checkbox is unchecked
      console.log(`Item ${item.itemName} is unchecked.`);
    }
  }
  

}


