import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOtherDrinkComponent } from './view-other-drink.component';

describe('ViewOtherDrinkComponent', () => {
  let component: ViewOtherDrinkComponent;
  let fixture: ComponentFixture<ViewOtherDrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOtherDrinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOtherDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
