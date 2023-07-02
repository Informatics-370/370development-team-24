import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuppliertypeComponent } from './add-suppliertype.component';

describe('AddSuppliertypeComponent', () => {
  let component: AddSuppliertypeComponent;
  let fixture: ComponentFixture<AddSuppliertypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSuppliertypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSuppliertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
