import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryStocktypeComponent } from './inventory-stocktype.component';

describe('InventoryStocktypeComponent', () => {
  let component: InventoryStocktypeComponent;
  let fixture: ComponentFixture<InventoryStocktypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryStocktypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryStocktypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
