import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/service/inventory.service';
import { InventoryType } from 'src/app/shared/inventorytype';

@Component({
  selector: 'app-inventory-stocktype',
  templateUrl: './inventory-stocktype.component.html',
  styleUrls: ['./inventory-stocktype.component.css']
})
export class InventoryStocktypeComponent {

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
    this.router.navigate(['/stocktake', type.inventory_TypeId]);
  }
}
