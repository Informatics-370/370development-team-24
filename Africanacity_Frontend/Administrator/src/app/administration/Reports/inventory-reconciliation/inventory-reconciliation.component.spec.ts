import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryReconciliationComponent } from './inventory-reconciliation.component';

describe('InventoryReconciliationComponent', () => {
  let component: InventoryReconciliationComponent;
  let fixture: ComponentFixture<InventoryReconciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryReconciliationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
