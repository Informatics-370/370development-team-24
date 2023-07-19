import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { InventoryType } from 'src/app/shared/inventorytype';

@Component({
  selector: 'app-selected-inventorytype',
  templateUrl: './selected-inventorytype.component.html',
  styleUrls: ['./selected-inventorytype.component.css']
})
export class SelectedInventorytypeComponent {
  inventoryTypes: InventoryType[] = [];
  selectedType: InventoryType | null = null;

  constructor(
    private router: Router,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.GetAllInventoryTypes();
  }

  GetAllInventoryTypes(): void {
    this.inventoryService.GetAllInventoryTypes().subscribe(
      (types) => {
        this.inventoryTypes = types;
      },
      (error) => {
        console.error('Failed to fetch inventory types:', error);
      }
    );
  }

  onViewItemsClick(type: InventoryType): void {
    this.selectedType = type;
    this.router.navigate(['/view-inventoryitems', type.inventory_TypeId]);
  }
}
