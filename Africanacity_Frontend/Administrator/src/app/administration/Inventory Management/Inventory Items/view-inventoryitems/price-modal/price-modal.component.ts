import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Inventory_Prices } from 'src/app/shared/inventoryPrices';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-price-modal',
  templateUrl: './price-modal.component.html',
  styleUrls: ['./price-modal.component.css'],
})
export class PriceModalComponent {
  @Input() prices: Inventory_Prices[] = [];
  @Input() inventoryItem: InventoryItem | undefined;
  itemprice: Inventory_Prices[] = [];
  isEditClicked: boolean = false;

  constructor(public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private router: Router) {}

  onEditClick(inventoryPrice_Id: number): void {
    // Close the modal when the edit icon is clicked
    this.activeModal.dismiss();

    this.router.navigate(['/edit-itemprice', inventoryPrice_Id]);
    // You can also handle the edit action here
  }

}
