import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDrinkTypeComponent } from './edit-drink-type.component';

describe('EditDrinkTypeComponent', () => {
  let component: EditDrinkTypeComponent;
  let fixture: ComponentFixture<EditDrinkTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDrinkTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDrinkTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
