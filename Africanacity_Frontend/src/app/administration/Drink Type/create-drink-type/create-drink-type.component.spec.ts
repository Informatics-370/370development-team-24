import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDrinkTypeComponent } from './create-drink-type.component';

describe('CreateDrinkTypeComponent', () => {
  let component: CreateDrinkTypeComponent;
  let fixture: ComponentFixture<CreateDrinkTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDrinkTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDrinkTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
