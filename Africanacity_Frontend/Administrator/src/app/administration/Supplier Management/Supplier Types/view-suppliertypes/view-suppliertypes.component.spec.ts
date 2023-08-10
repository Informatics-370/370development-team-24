import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSuppliertypesComponent } from './view-suppliertypes.component';

describe('ViewSuppliertypesComponent', () => {
  let component: ViewSuppliertypesComponent;
  let fixture: ComponentFixture<ViewSuppliertypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSuppliertypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSuppliertypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
