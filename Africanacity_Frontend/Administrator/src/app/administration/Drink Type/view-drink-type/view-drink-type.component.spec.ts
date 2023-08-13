import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDrinkTypeComponent } from './view-drink-type.component';

describe('ViewDrinkTypeComponent', () => {
  let component: ViewDrinkTypeComponent;
  let fixture: ComponentFixture<ViewDrinkTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDrinkTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDrinkTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
