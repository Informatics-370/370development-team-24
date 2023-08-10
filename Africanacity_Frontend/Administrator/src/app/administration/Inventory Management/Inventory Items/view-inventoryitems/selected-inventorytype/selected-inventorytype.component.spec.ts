import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedInventorytypeComponent } from './selected-inventorytype.component';

describe('SelectedInventorytypeComponent', () => {
  let component: SelectedInventorytypeComponent;
  let fixture: ComponentFixture<SelectedInventorytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedInventorytypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedInventorytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
