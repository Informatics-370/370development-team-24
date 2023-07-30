import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInventoryitemsComponent } from './view-inventoryitems.component';

describe('ViewInventoryitemsComponent', () => {
  let component: ViewInventoryitemsComponent;
  let fixture: ComponentFixture<ViewInventoryitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInventoryitemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInventoryitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
