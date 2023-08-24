import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuppliertypeComponent } from './edit-suppliertype.component';

describe('EditSuppliertypeComponent', () => {
  let component: EditSuppliertypeComponent;
  let fixture: ComponentFixture<EditSuppliertypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSuppliertypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSuppliertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
