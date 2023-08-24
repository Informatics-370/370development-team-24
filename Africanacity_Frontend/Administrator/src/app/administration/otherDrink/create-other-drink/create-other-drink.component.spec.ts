import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtherDrinkComponent } from './create-other-drink.component';

describe('CreateOtherDrinkComponent', () => {
  let component: CreateOtherDrinkComponent;
  let fixture: ComponentFixture<CreateOtherDrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOtherDrinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOtherDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
