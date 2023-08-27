import { Component, ElementRef, ViewChild } from '@angular/core';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { EventEmitter, Output } from '@angular/core';
import { saveAs } from 'file-saver'; // Import file-saver for saving the PDF

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

// Import jsPDF
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import { Supplier } from 'src/app/shared/supplier';



@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent {
  checklistItems: InventoryItem[] = [];
  predefinedLevel: number = 5; // Predefined level for the quantity
  item: InventoryItem = new InventoryItem;
  suppliers: Supplier[] = [];

  constructor(private inventoryservice: InventoryService, private httpClient: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog, private router:Router) {}

 
 
  ngOnInit() {
    console.log('Component initialized. Checking inventory...');
    // Load the data from localStorage on component initialization
    this.inventoryservice.inventoryItemsChanged$.subscribe((inventoryItems: InventoryItem[]) => {
      this.checklistItems = inventoryItems.filter((item) => item.quantity < this.predefinedLevel);
      // Save the updated data to localStorage whenever the inventoryItemsChanged event is triggered
      localStorage.setItem('checklistItems', JSON.stringify(this.checklistItems));
    });
    this.checkInventory();

    this.getSuppliers();
  }

  getSuppliers() {
    this.inventoryservice.GetAllSuppliers().subscribe(
      (suppliers: Supplier[]) => {
        this.suppliers = suppliers;
      },
      (error: any) => {
        console.error('Failed to fetch suppliers:', error);
      }
    );
  }


  addToChecklist(item: InventoryItem) {
    // Check if the item is already in the checklist
    const existingItem = this.checklistItems.find((checklistItem) => checklistItem.inventory_ItemId === item.inventory_ItemId);
    if (existingItem) {
      console.error('Item already exists in the checklist.');
      return;
    }

    // Add the item to the checklist
    this.checklistItems.push(item);
    console.log('Item added to the checklist:', item);

    // Save the updated data to localStorage
    localStorage.setItem('checklistItems', JSON.stringify(this.checklistItems));

    // Emit changes to the checklistItems
    this.emitInventoryItemsChanged(this.checklistItems);
  }


  checkInventory() {
    console.log('Checking inventory items...');
    this.inventoryservice.GetAllInventoryItems().subscribe((inventoryItems: InventoryItem[]) => {
      for (let item of inventoryItems) {
        if (item.quantity < this.predefinedLevel) {
          this.inventoryservice.addToChecklist(item); // Add to checklist if the quantity is below the predefined level
        } else {
          this.removeFromChecklist(item); // Remove from checklist if the quantity is 5 or above 5
        }
      }
    });
  }
  
  removeFromChecklist(item: InventoryItem) {
    // Remove the item from the checklist
    this.checklistItems = this.checklistItems.filter(
      (checklistItem) => checklistItem.inventory_ItemId !== item.inventory_ItemId
    );
    console.log('Item removed from the checklist:', item);

    // Save the updated data to localStorage
    localStorage.setItem('checklistItems', JSON.stringify(this.checklistItems));

    // Emit changes to the checklistItems
    this.emitInventoryItemsChanged(this.checklistItems);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.checklistItems = this.checklistItems.filter(item => {
      const column2Value = item.itemName.toLowerCase() || item.itemName.toUpperCase();
  
      return column2Value.includes(filterValue);
    });
  }
  
 
  // orderItem(item: InventoryItem) {
  //   item.ordered = !item.ordered;
  //   this.showNotification(`Item ${item.itemName} is ${item.ordered ? 'ordered' : 'not ordered'}.`);
    
  //   // Save the updated state of checklistItems to local storage
  //   localStorage.setItem('checklistItems', JSON.stringify(this.checklistItems));
  // }
  
  queryItem(item: InventoryItem) {
    this.router.navigate(['/view-suppliers']);
  }
  
  receiveItem(item: InventoryItem) {
    // Navigate to the "Receive Order" screen and pass the selected inventory item
    this.router.navigate(['/receive-order'], { queryParams: { inventory_ItemId: item.inventory_ItemId } });
  }


  showNotification(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right',
    });
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

  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Inventory Item CheckList', 105, 15, { align: 'center' });
    const headers = [['ID', 'Name']];
    
    // Map the checklistItems to generate the data array
    const data = this.checklistItems.map(item => [item.inventory_ItemId, item.itemName]);
  
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
    saveAs(file, 'inventory_checklist.pdf');
  }

  updateChecklist() {
    // Remove items from the checklist that no longer meet the predefined level criteria
    this.checklistItems = this.checklistItems.filter(item => item.quantity < this.predefinedLevel);
  }

 emitInventoryItemsChanged(items: InventoryItem[]) {
  console.log('Emitting inventory items changes:', items);
    this.inventoryservice.emitInventoryItemsChanged(items);
  }

  }
 


