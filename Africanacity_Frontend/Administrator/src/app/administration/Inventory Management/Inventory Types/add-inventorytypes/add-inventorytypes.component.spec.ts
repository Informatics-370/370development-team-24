import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventorytypesComponent } from './add-inventorytypes.component';

describe('AddInventorytypesComponent', () => {
  let component: AddInventorytypesComponent;
  let fixture: ComponentFixture<AddInventorytypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInventorytypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInventorytypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
