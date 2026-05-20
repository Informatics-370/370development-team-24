import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFoodTypeComponent } from './create-food-type.component';

describe('CreateFoodTypeComponent', () => {
  let component: CreateFoodTypeComponent;
  let fixture: ComponentFixture<CreateFoodTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFoodTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFoodTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
