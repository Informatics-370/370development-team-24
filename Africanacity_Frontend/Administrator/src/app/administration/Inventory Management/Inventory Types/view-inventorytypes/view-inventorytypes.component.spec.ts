import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInventorytypesComponent } from './view-inventorytypes.component';

describe('ViewInventorytypesComponent', () => {
  let component: ViewInventorytypesComponent;
  let fixture: ComponentFixture<ViewInventorytypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInventorytypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInventorytypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
